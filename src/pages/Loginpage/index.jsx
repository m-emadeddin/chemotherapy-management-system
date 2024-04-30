import React from "react";
import { Helmet } from "react-helmet";
import { Img, Button, Input, Text } from "../../components";
import "./login.css";

export default function LoginpagePage() {
  function handleLogin() {
    window.location.href = "/selectpatient";
  }

  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>

      {/* main content section */}
      <div className="flex h-[1024px] w-full items-start justify-center bg-white-A700 bg-[url(/public/images/img_login_page.png)] bg-cover bg-no-repeat py-[177px] md:h-auto md:py-5">
        {/* login section */}
        <div className="container-xs mb-[97px] mt-[47px] flex justify-center px-[367px] md:p-5 md:px-5">
          {/* logo section */}
          <div className="flex w-full flex-col items-center gap-[130px] md:gap-[97px] sm:gap-[65px]">
            <div className="flex flex-col items-center gap-9 self-stretch">
              <a href="Login" target="_blank" rel="noreferrer">
                <Text size="lg" as="p" className="!font-inter">
                  Login
                </Text>
              </a>
              <div className="flex flex-col items-center self-stretch">
                <Text
                  as="p"
                  className="ml-[18px] self-start !font-inter md:ml-0"
                >
                  username or email
                </Text>
                <Input
                  shape="round"
                  name="input_one"
                  suffix={
                    <Img
                      src="images/img_settings.svg"
                      alt="settings"
                      className="h-[20px] w-[21px]"
                    />
                  }
                  className="email-input mt-1 gap-[35px] border border-solid border-black-900"
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
                  suffix={
                    <Img
                      src="images/img_settings_light_blue_600.svg"
                      alt="settings"
                      className="h-[20px] w-[21px]"
                    />
                  }
                  className="password-input mt-1 gap-[35px] border border-solid border-black-900"
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
