import React from "react";
import "./style.css";
import DropDownMenu from "components/DropDownMenu/DropDownMenu";

export default function OrderchemotherapyPage() {
  return (
    <div className="order-container  mx-auto ">
      <div className="text-wrapper-5">Select regimen</div>
      <DropDownMenu />
    </div>
  );
}
