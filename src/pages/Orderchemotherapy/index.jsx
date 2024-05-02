import Header from "../../components/Header";
import React from "react";
import "./style.css";
import DropDownMenu from "components/DropDownMenu/DropDownMenu";
export default function OrderchemotherapyPage() {
  return (
    <div className="flex w-full flex-col gap-[33px] bg-gray-100 pb-[30px] sm:pb-5">
      {/* header section */}
      <div>
        <Header
          userName="Mizo"
          userPhoto="images/img_hesham_1.png"
          className="flex items-center justify-center border-b border-solid border-gray-400 bg-white-A700 p-2 shadow-xs"
        />
      </div>

      {/* main content */}
      <div className="order-chemotherapy">
        <div className="order-container">
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
      </div>
    </div>
  );
}
