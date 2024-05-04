import React from "react";
import "./style.css";
import DropDownMenu from "components/DropDownMenu/DropDownMenu";
export default function OrderchemotherapyPage() {
  return (
    <div className="order-container  mx-auto ">
      {/* <div className="navigation">
            <div className="text-wrapper-2">Patient List</div>
            <img className="img" alt="Vector" src="vector-2.svg" />
            <div className="text-wrapper-3">Hazem Abdulnasser</div>
            <img className="img" alt="Vector" src="vector-3.svg" />
            <div className="text-wrapper-4">Chemo Orders</div>
          </div> */}
      <div className="text-wrapper-5">Select regimen</div>
      <DropDownMenu />
    </div>
  );
}
