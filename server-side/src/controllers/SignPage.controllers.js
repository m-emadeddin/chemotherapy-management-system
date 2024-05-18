const bcrypt = require("bcrypt");
const Users = require("../models/index.models").User;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = require("../middlewares/auth.middlewares");

exports.UserSignUp = (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // check if user already signed
  Users.findOne({
    where: {
      [Op.or]: [{ Username: username }, { Email: email }],
    },
  })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Username or email already exists" });
      }

      // password encryption
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          Users.create({
            Username: username,
            Email: email,
            Password: hashedPassword,
          })
            .then((newUser) => {
              res.status(200).json({ message: "User signed up successfully" });
            })
            .catch((error) => {
              console.error("Error creating user:", error);
              res.status(500).json({ error: "Internal server error" });
            });
        })
        .catch((error) => {
          console.error("Error hashing password:", error);
          res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((error) => {
      console.error("Error finding existing user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

exports.UserSignIn = (req, res) => {
  const { identifier, password } = req.body;

  Users.findOne({
    where: {
      [Op.or]: [{ Username: identifier }, { Email: identifier }],
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Invalid username/email or password" });
      }

      bcrypt
        .compare(password, user.Password)
        .then((passwordMatch) => {
          if (!passwordMatch) {
            return res
              .status(401)
              .json({ error: "Invalid username/email or password" });
          }
          const userId = user.user_ID;
          console.log(userId);
          // Generate JWT token
          const token = jwt.sign({ userId: userId }, jwtSecret, {
            expiresIn: "2h",
          });

          res.status(200).json({ message: "Login successful", token });
        })
        .catch((error) => {
          console.error("Error comparing passwords:", error);
          res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

exports.GetUserData = (req, res) => {
  const userId = req.userId;

  Users.findByPk(userId, { attributes: ["Username", "Email"] })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ user });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

exports.UserLogout = (req, res) => {
  const token = req.header("Authorization").substring(7);

  // Blacklist the token
  authMiddleware.blacklistToken(token);

  res.status(200).json({ message: "Logout successful" });
};

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
