import {
  useState,
  useEffect
} from "react";
import "./practiceScreen.sass";
import Button from "./buttonComponent";
import IconThemeComponent from "./IconThemeComponent";
import ProgressBar from "./progressBar";
interface PracticeScreenProps {
  isDarkTheme: boolean;
  handleThemeToggle: () => void;
  setIsRankScreen: (value: boolean) => void;
  setRank: (value: number | null) => void;
  setScore: (value: number | null) => void;
}
interface WordObject {
  id: number;
  word: string;
  pos: string;
}

function PracticeScreen({
  isDarkTheme,
  handleThemeToggle,
  setIsRankScreen,
  setRank,
  setScore
}: PracticeScreenProps) {
  const [words, setWords] = useState < WordObject[] > ([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [showWords, setShowWords] = useState(false);
  const [buttonColors, setButtonColors] = useState < {
      [key: string]: string
  } > ({});
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [confirmation, setConfirmation] = useState(false);
  useEffect(() => {
      fetch("http://localhost:3000/words").then((response) => response.json()).then((data: WordObject[]) => {
          const wordsWithPos = data.map((word) => ({
              ...word
          }));
          setWords(wordsWithPos);
      }).catch((error) => console.error(error));
  }, []);
  useEffect(() => {
      const handleBlur = () => {
          if (showWords) {
              alert("Termination : You have clicked outside of the quiz area. Your quiz will be terminated.");
              window.location.reload();
          }
      };
      window.addEventListener("blur", handleBlur);
      return () => {
          window.removeEventListener("blur", handleBlur);
      };
  }, [showWords]);
  const handleClick = () => {
      const confirmed = window.confirm("Warning: Clicking outside the quiz area will lead to the termination of the quiz. Your progress will be lost and you will need to start over. Do you want to start the quiz?");
      if (confirmed) {
          setTimeout(() => {
              setShowWords(true);
              setButtonColors({});
              setConfirmation(true);
          }, 50);
      } else {
          setConfirmation(false);
      }
  };
  const handleButtonClick = (buttonPosition: string) => {
      const currentWord = words[wordIndex];
      const isCorrect = buttonPosition === currentWord.pos;
      const correctPos = currentWord.pos;
      const newButtonColors = {
          [buttonPosition]: isCorrect ? "green" : "red",
          [correctPos]: "green",
      };
      setButtonColors({
          ...buttonColors,
          ...newButtonColors
      });
      setAnswered(true);
      if (isCorrect) {
          setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
      }
  };
  const handleNextClick = () => {
      setWordIndex((prevIndex) => prevIndex + 1);
      setButtonColors({});
      setAnswered(false);
  };
  const handelFinishClick = () => {
      const totalQuestions = words.length;
      const score = (correctAnswers / totalQuestions) * 100;
      fetch("http://localhost:3000/rank", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              finalScore: score
          }),
      }).then((response) => response.json()).then((data) => {
          setRank(data.rank);
          setScore(score);
          setIsRankScreen(true);
      }).catch((error) => console.error(error));
  };
  const renderButton = (buttonPosition: string) => {
      return (<Button
    isDarkTheme={isDarkTheme}
    title={buttonPosition}
    onClick={() => handleButtonClick(buttonPosition)}
    style={{ backgroundColor: buttonColors[buttonPosition] }}
    disabled={answered}
  />);
  };
  const currentWord = words[wordIndex];
  const wordClass = isDarkTheme ? "word-dark" : "word-light";
  const progress = ((wordIndex + 1) / words.length) * 100;
  return (<div>
  <div>
  {!showWords && (
    <Button
      isDarkTheme={isDarkTheme}
      title="Start your practice"
      onClick={handleClick}
      confirmation={confirmation}
    />
  )}
  {showWords && (
    <div className="word-container">
      <ProgressBar progress={progress} />
      <div key={currentWord.id} className={wordClass}>
        {currentWord.word}
      </div>
      <div className="Buttons-Container">
        {renderButton("noun")}
        {renderButton("adverb")}
        {renderButton("adjective")}
        {renderButton("verb")}
      </div>

        <div className="Buttons-Container">
          <Button
            isDarkTheme={isDarkTheme}
            title={wordIndex === 9 ? "Finish" : "Next"}
            onClick={wordIndex === 9 ? handelFinishClick : handleNextClick}
            style={{ backgroundColor: "" }}
            disabled= {!answered}
          />
        </div>
     
    </div>
  )}
  </div>
  <IconThemeComponent isDarkTheme={isDarkTheme} handleThemeToggle={handleThemeToggle} />
</div>);
}
export default PracticeScreen;