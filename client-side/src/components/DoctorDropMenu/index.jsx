import { LogoutSVG } from "assets/images/logout";
import { Img, Text } from "components";
import DropdownItem from "components/DropdownItem";
import "./doctordropmenu.css";

export default function DoctorDropMenu({
  userPhoto,
  userName,
  userEmail,
  handleLogoutOptionClick,
}) {
  return (
    <div className="dropdown-menu">
      <div className="user-details">
        <Img src={userPhoto} alt="User Photo" className="user-photo-dropdown" />
        <div className="user-text">
          <Text size="xs" as="p" className="user-name">
            {userName}
          </Text>
          <Text size="xs" as="p" className="user-email">
            {userEmail}
          </Text>
        </div>
      </div>
      <div className="divider" />
      <DropdownItem
        itemName="Logout"
        iconSVG={<LogoutSVG className="dropdownItem-icon" />}
        onClick={handleLogoutOptionClick}
      />
    </div>
  );
}
