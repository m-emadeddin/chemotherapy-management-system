import React, { useState, useEffect } from "react";
import { Img, Text } from "./..";
import "./Header.css";
import DoctorDropMenu from "components/DoctorDropMenu";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header({
  userPhoto = `${process.env.PUBLIC_URL}/images/img_hesham_1.png`,
  ...props
}) {
  const [newLogo, setNewLogo] = useState(
    `${process.env.PUBLIC_URL}/images/img_icon_1.png`
  );
  const [newSVG, setNewSVG] = useState(
    `${process.env.PUBLIC_URL}/images/img_arrow_down.svg`
  );
  const [isActive, setIsActive] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isDoctorMenuOpen, setIsDoctorMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { token } = useAuth();
  const BASE_URL = "/users/user";
  const LOGOUT_URL = "/users/logout";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      await axios.post(`${LOGOUT_URL}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  function handleDoctorInfoClick() {
    setIsDoctorMenuOpen(!isDoctorMenuOpen);
  }

  function handleLogoClick() {
    if (!isActive) {
      setNewLogo(`${process.env.PUBLIC_URL}/images/img_logo_active.png`);
      setNewSVG(`${process.env.PUBLIC_URL}/images/img_arrow_up.svg`);
      setIsActive(true);
    } else {
      setNewLogo(`${process.env.PUBLIC_URL}/images/img_icon_1.png`);
      setNewSVG(`${process.env.PUBLIC_URL}/images/img_arrow_down.svg`);
      setIsActive(false);
    }
  }

  return (
    <header {...props}>
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-5 self-start ">
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
            <div className="flex items-center justify-center gap-2.5">
              <Img
                src={userPhoto}
                alt="heshamone"
                className="h-[33px] w-[33px] rounded-[50%]"
              />
              <Text size="xs" as="p" className="!font-almarai">
                {userDetails ? `Dr. ${userDetails.Username}` : ""}
              </Text>
            </div>
            <Img
              src={`${process.env.PUBLIC_URL}/images/img_arrowdown_black_900.svg`}
              alt="arrowdown"
              className="mb-3 mr-[7px] h-[8px] self-end"
            />
            {isDoctorMenuOpen && (
              <DoctorDropMenu
                userEmail={userDetails ? userDetails.Email : ""}
                userName={userDetails ? `Dr. ${userDetails.Username}` : ""}
                userPhoto={userPhoto}
              />
            )}
          </div>
          <div
            onClick={handleLogout}
            className="flex items-center justify-center bg-blue-500 text-white-A700 border-2 border-transparent-0 transition-all duration-300  hover:bg-blue-600 h-[36px] text-sm min-w-[89px] gap-2.5 text-center cursor-pointer rounded-[10px] py-[9px] px-[16px]"
          >
            <div>
              <Img
                src={`${process.env.PUBLIC_URL}/images/img_arrowleft_white_a700.svg`}
                alt="arrow_left"
                className="h-[14px] w-[14px]"
              />
            </div>
            Log Out
          </div>
        </div>
      </div>
    </header>
  );
}
