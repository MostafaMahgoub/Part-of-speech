import React, { useState } from "react";

interface ButtonProps {
  isDarkTheme: boolean;
  title: string;
  onClick: () => void;
}

function Button({ isDarkTheme, title, onClick }: ButtonProps) {
  const [fade, setFade] = useState(false);

  const handleClick = () => {
    setFade(true);
    onClick();
  };

  const shouldFade = title === "Start your practice";

  return (
    <div
      className={`button ${isDarkTheme ? "button-dark" : "button-light"} ${
        shouldFade && fade ? "fade-out" : ""
      }`}
      onClick={handleClick}
      id="Main-Button"
    >
      <div id="circle"></div>
      <a
        className={`${isDarkTheme ? "a-dark" : "a-light"}`}
        href="#"
      >
        {title}
      </a>
    </div>
  );
}

export default Button;