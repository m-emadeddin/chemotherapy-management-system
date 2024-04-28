import React from "react";

const sizes = {
  s: "text-lg font-bold",
  md: "text-2xl font-bold md:text-[22px]",
  xs: "text-sm font-bold",
};

const Heading = ({ children, className = "", size = "md", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-black-900 font-lamasans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
