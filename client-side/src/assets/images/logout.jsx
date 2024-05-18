// LogoutSVG.js
import React from "react";

export const LogoutSVG = ({
  fillColor = "#000000",
  className = "",
  ...props
}) => {
  // Logout SVG string
  const logoutSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="${fillColor}">
    <path d="M2.22222 2.22222H10V0H2.22222C1 0 0 1 0 2.22222V17.7778C0 19 1 20 2.22222 20H10V17.7778H2.22222V2.22222ZM20 10L15.5556 5.55556V8.88889H6.66667V11.1111H15.5556V14.4444L20 10Z" />
  </svg>`;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: logoutSvg }}
      {...props}
    />
  );
};
