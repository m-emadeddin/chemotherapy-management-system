import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[10px]",
  circle: "rounded-[50%]",
};
const variants = {
  fill: {
    gray_50_01: "bg-gray-50_01",
    blue_500: "bg-blue-500 text-white-A700",
  },
};
const sizes = {
  md: "h-[40px] px-2.5",
  xl: "h-[55px] px-3.5 text-base",
  sm: "h-[38px] px-[9px] text-lg",
  xs: "h-[36px] px-[9px] text-sm",
  lg: "h-[48px] px-[13px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round", "circle"]),
  size: PropTypes.oneOf(["md", "xl", "sm", "xs", "lg"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["gray_50_01", "blue_500"]),
};

export { Button };
