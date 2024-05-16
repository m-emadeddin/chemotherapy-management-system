import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Img, Button, Input, Text } from "../../components";
import "./login.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (loginAttempted && auth.isLoggedIn) {
      navigate("/select_patient");
    }
  }, [auth.isLoggedIn, loginAttempted, navigate]);

  const handleLogin = async () => {
    try {
      if (identifier.length > 0 && password.length > 0) {
        await auth.login(identifier, password);
        setLoginAttempted(true);
      } else {
        toast.error("Please enter both username and password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>

      <div className="flex h-[1024px] w-full items-start justify-center bg-white-A700 bg-[url(/public/images/img_login_page.png)] bg-cover bg-no-repeat py-[177px] md:h-auto md:py-5">
        <div className="container-xs mb-[97px] mt-[47px] flex justify-center px-[367px] md:p-5 md:px-5">
          <div className="flex w-full flex-col items-center gap-[65px] md:gap-[97px] sm:gap-[65px]">
            <div className="flex flex-col items-center gap-9 self-stretch">
              <Toaster />
              <Text size="lg" as="p" className="!font-inter">
                Login
              </Text>
              <div className="flex flex-col items-center self-stretch">
                <Text
                  as="p"
                  className="ml-[18px] self-start !font-inter md:ml-0"
                >
                  Username or Email
                </Text>
                <Input
                  shape="round"
                  name="input_one"
                  value={identifier}
                  onChange={(e) => setIdentifier(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  suffix={
                    <Img
                      src="images/img_settings.svg"
                      alt="settings"
                      className="h-[20px] w-[21px]"
                    />
                  }
                  className="email-input mt-1 border border-solid border-black-900 p-2"
                />
                <Text
                  as="p"
                  className="ml-[18px] mt-[19px] self-start !font-inter md:ml-0"
                >
                  Password
                </Text>
                <Input
                  shape="round"
                  name="input_three"
                  value={password}
                  onChange={(e) => setPassword(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  suffix={
                    <Img
                      src="images/img_settings_light_blue_600.svg"
                      alt="settings"
                      className="h-[20px] w-[21px]"
                    />
                  }
                  className="password-input mt-1 border border-solid border-black-900 p-2"
                  type="password"
                />
                <Button
                  onClick={handleLogin}
                  size="sm"
                  shape="round"
                  leftIcon={
                    <Img
                      src="images/login_icon.svg"
                      alt="arrow_left"
                      className="h-[14px] w-[14px]"
                    />
                  }
                  className="login-button mt-10 min-w-[93px] gap-2.5 font-bold"
                >
                  Login
                </Button>
              </div>
            </div>
            <Img
              src="images/img_logo.png"
              alt="logo"
              className="h-[62px] w-[32%] object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
