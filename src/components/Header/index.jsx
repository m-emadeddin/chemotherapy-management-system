import React, { useState } from "react";
import { Button, Img, Text } from "./..";
import "./Header.css";
import DoctorDropMenu from "components/DoctorDropMenu";
import { Link } from "react-router-dom";

export default function Header({
  userName = " Haitham",
  userEmail = " Haitham @gmail.com",
  userPhoto = "/images/img_hesham_1.png",
  ...props
}) {


  const [newLogo, setNewLogo] = useState("images/img_icon_1.png");
  const [newSVG, setNewSVG] = useState("images/img_arrow_down.svg");
  const [isActive, setIsActive] = useState(false);

  const [isDoctorMenuOpen, setIsDoctorMenuOpen] = useState(false);

  function handleDoctorInfoClick() {
    setIsDoctorMenuOpen(!isDoctorMenuOpen);
  }

  function handleLogoClick() {
    if (!isActive) {
      setNewLogo("images/img_logo_active.png");
      setNewSVG("images/img_arrow_up.svg");
      setIsActive(true);
    } else {
      setNewLogo("images/img_icon_1.png");
      setNewSVG("images/img_arrow_down.svg");
      setIsActive(false);
    }
  }

  return (
    <header {...props}>
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-5 self-start sm:flex-col">
        <div
          onClick={handleLogoClick}
          className={`logo flex items-center gap-1.5 self-end p-[5px] ${
            isActive ? "active" : ""
          }`}
        >
          <Img
            src={newLogo}
            alt="iconone"
            className="h-[26px] w-[26px] object-cover"
          />
          <Img src={newSVG} alt="arrowdown" className="h-[7px]" />
          {isActive && (
            <div className="dropdown-logo-menu">
              <div className="dropdown-logo-menu-container">
                <ul>
                  <li>Help</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="flex w-[26%] items-center justify-center gap-[13px] pl-[29px] sm:w-full sm:pl-5">
          <div
            className="doctor-info flex flex-1 items-center justify-between gap-5"
            onClick={handleDoctorInfoClick}
          >
            <div className="ml-[7px] flex w-[60%] items-center justify-center gap-2.5">
              <Img
                src={userPhoto}
                alt="heshamone"
                className="h-[33px] w-[33px] rounded-[50%]"
              />
              <Text size="xs" as="p" className="!font-almarai">
                {`Dr.${userName}`}
              </Text>
            </div>
            <Img
              src="images/img_arrowdown_black_900.svg"
              alt="arrowdown"
              className="mb-3 mr-[7px] h-[8px] self-end"
            />
            {isDoctorMenuOpen && (
              <DoctorDropMenu
                userEmail={userEmail}
                userName={userName}
                userPhoto={userPhoto}
              />
            )}
          </div>
          <Link
            className="flex items-center justify-center bg-blue-500 text-white-A700 border-2 border-transparent-0 transition-all duration-300  hover:bg-blue-600 h-[36px] text-sm min-w-[89px] gap-2.5 text-center cursor-pointer rounded-[10px] h-[36px] py-[9px] px-[16px] text-sm "
            to="/login"
          >
            <div>
              <Img
                src="images/img_arrowleft_white_a700.svg"
                alt="arrow_left"
                className="h-[14px] w-[14px]"
              />
            </div>
            Log Out
          </Link>
        </div>
      </div>
    </header>
  );
}
