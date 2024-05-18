import React from "react";

const sizes = {
  xs: "text-sm font-normal",
  lg: "text-2xl font-medium md:text-[22px]",
  s: "text-base font-normal",
  md: "text-lg font-medium",
};

const Text = ({ children, className = "", as, size = "s", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-black-900 font-lamasans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
