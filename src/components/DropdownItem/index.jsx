import { Text } from "components";
import React from "react";
import "components/Header/header.css";
export default function DropdownItem({ onClick, itemName, iconSVG }) {
  return (
    <div className="dropdownItem-container" onClick={onClick}>
      {iconSVG}
      <Text size="xs" as="p" className="dropdownItem-text">
        {itemName}
      </Text>
    </div>
  );
}
