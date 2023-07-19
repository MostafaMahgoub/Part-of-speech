import { useState, useEffect } from "react";
import "./practiceScreen.sass";
import Button from "./buttonComponent";
import IconThemeComponent from "./IconThemeComponent";
import ProgressBar from "./progressBar";
interface PracticeScreenProps {
  isDarkTheme: boolean;
  isRankScreen: boolean;
  handleThemeToggle: () => void;
  setIsRankScreen: (value: boolean) => void;
}

interface WordObject {
  id: number;
  word: string;
  pos: string;
}

function PracticeScreen({ isDarkTheme, handleThemeToggle , setIsRankScreen , isRankScreen }: PracticeScreenProps) {
  const [words, setWords] = useState<WordObject[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [showWords, setShowWords] = useState(false);
  const [buttonColors, setButtonColors] = useState<{ [key: string]: string }>({});
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/words")
      .then((response) => response.json())
      .then((data: WordObject[]) => {
        const wordsWithPos = data.map((word) => ({
          ...word,
          correctPos: word.pos,
        }));
        setWords(wordsWithPos);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleClick = () => {
    setShowWords(true);
    setButtonColors({});
  };

  const handleButtonClick = (buttonPosition: string) => {
    const currentWord = words[wordIndex];
    const isCorrect = buttonPosition === currentWord.pos;
    const correctPos = currentWord.pos;

    const newButtonColors = {
      [buttonPosition]: isCorrect ? "green" : "red",
      [correctPos]: "green",
    };
    setButtonColors({ ...buttonColors, ...newButtonColors });
    setAnswered(true);
  };

  const handleNextClick = () => {
    if (wordIndex === words.length - 1) {
      setCompleted(true);
    } else {
      setWordIndex((prevIndex) => prevIndex + 1);
      setButtonColors({});
      setAnswered(false);
    }
  };

  const handelFinishClick = () => {
    setIsRankScreen(true);
  };

  const renderButton = (buttonPosition: string) => {
    return (
      <Button
        isDarkTheme={isDarkTheme}
        title={buttonPosition}
        onClick={() => handleButtonClick(buttonPosition)}
        style={{ backgroundColor: buttonColors[buttonPosition] }}
        disabled={answered}
      />
    );
  };

  const currentWord = words[wordIndex];
  const wordClass = isDarkTheme ? "word-dark" : "word-light";
  const progress = ((wordIndex + 1) / words.length) * 100;

  return (
    <div>
      {!isRankScreen &&(<div>
      {!showWords && (
        <Button
          isDarkTheme={isDarkTheme}
          title="Start your practice"
          onClick={handleClick}
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
                title={completed ? "Finish" : "Next"}
                onClick={completed ? handelFinishClick : handleNextClick}
                style={{ backgroundColor: "" }}
                disabled= {!answered}
              />
            </div>
         
        </div>
      )}
      </div>)}
      <IconThemeComponent isDarkTheme={isDarkTheme} handleThemeToggle={handleThemeToggle} />
    </div>
  );
}

export default PracticeScreen;