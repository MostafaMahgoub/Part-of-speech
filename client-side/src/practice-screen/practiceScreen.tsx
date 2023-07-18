import "./practiceScreen.sass";
import ButtonComponent from "./buttonComponent"
import IconThemeComponent from "./IconThemeComponent";

interface PracticeScreenProps {
    isDarkTheme: boolean;
    handleThemeToggle: () => void;
}

function PracticeScreen({ isDarkTheme , handleThemeToggle }: PracticeScreenProps) {
    
  return (
    <div>
      <ButtonComponent isDarkTheme={isDarkTheme} title="Start your practice" />
      <IconThemeComponent isDarkTheme={isDarkTheme} handleThemeToggle={handleThemeToggle} />
    </div>
  );
}

export default PracticeScreen;