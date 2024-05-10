import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Img, Button, Input, Text } from "../../components";
import "./login.css";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const BASE_URL = "/users/signin";

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        identifier: identifier,
        password: password,
      });
      const userData = response.data;
      setToken(userData.token);
      navigate("/select_patient");
    } catch (error) {
      console.error("Login error:", error);
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
          <div className="flex w-full flex-col items-center gap-[130px] md:gap-[97px] sm:gap-[65px]">
            <div className="flex flex-col items-center gap-9 self-stretch">
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