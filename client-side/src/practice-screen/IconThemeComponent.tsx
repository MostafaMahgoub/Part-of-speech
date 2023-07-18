
import darkThemeIcon from "./assets/dark-theme.png";
import lightThemeIcon from "./assets/light-theme.png";

interface IconProps {
    isDarkTheme: boolean;
    handleThemeToggle: () => void;
}

function IconTheme({isDarkTheme , handleThemeToggle}: IconProps) {
    const themeIcon = isDarkTheme ? darkThemeIcon : lightThemeIcon;
  return (
      <div
      className={`theme-container themeClass`}
      onClick={handleThemeToggle}
    >
      <img src={themeIcon} alt="Theme" />
    </div>
  );
}

export default IconTheme;