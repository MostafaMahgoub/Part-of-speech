import "./practiceScreen.sass";
import darkThemeIcon from "./assets/dark-theme.png";
import lightThemeIcon from "./assets/light-theme.png";
import ButtonComponent from "./buttonComponent";

interface PracticeScreenProps {
    isDarkTheme: boolean;
    handleThemeToggle: () => void;
}

function PracticeScreen({ isDarkTheme , handleThemeToggle }: PracticeScreenProps) {
  

  const themeIcon = isDarkTheme ? darkThemeIcon : lightThemeIcon;

  

  return (
    <div>
      <ButtonComponent isDarkTheme={isDarkTheme} title="Start your practice" />
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