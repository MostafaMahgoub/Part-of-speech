import { useState } from "react";
import "./practiceScreen.sass";
import darkThemeIcon from "./assets/dark-theme.png";
import lightThemeIcon from "./assets/light-theme.png";

interface PracticeScreenProps {
    isDarkTheme: boolean;
    handleThemeToggle: () => void;
}

function PracticeScreen({ isDarkTheme , handleThemeToggle }: PracticeScreenProps) {
  

  const themeIcon = isDarkTheme ? darkThemeIcon : lightThemeIcon;

  

  return (
    <div>
      <div className={`${isDarkTheme ? "button-dark" : "button-light"}`} id="Practice-Button">
        <div id="circle"></div>
        <a className={`${isDarkTheme ? "a-dark" : "a-light"}`} href="#">Start your practice</a>
      </div>
      <div
        className={`theme-container themeClass`}
        onClick={handleThemeToggle}
      >
        <img src={themeIcon} alt="Theme" />
      </div>
    </div>
  );
}

export default PracticeScreen;