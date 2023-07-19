import { useState, useEffect } from "react";
import "./practiceScreen.sass";
import Button from "./buttonComponent";
import IconThemeComponent from "./IconThemeComponent";

interface PracticeScreenProps {
  isDarkTheme: boolean;
  handleThemeToggle: () => void;
}

interface WordObject {
  id: number;
  word: string;
  pos: string;
}

function PracticeScreen({ isDarkTheme, handleThemeToggle }: PracticeScreenProps) {
  const [words, setWords] = useState<WordObject[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [showWords, setShowWords] = useState(false);
  const [buttonColors, setButtonColors] = useState<{ [key: string]: string }>({});
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/words")
      .then((response) => response.json())
      .then((data: WordObject[]) => {
        // Add a correctPos property to each WordObject
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

  const handleRightClick = () => {
    setWordIndex((prevIndex) => prevIndex + 1);
    setButtonColors({});
    setAnswered(false);
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
      {!showWords && (
        <Button
          isDarkTheme={isDarkTheme}
          title="Start your practice"
          onClick={handleClick}
        />
      )}
      {showWords && (
        <div className="word-container">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            >
              <div className="progress-text">{`${Math.round(
              progress
            )}%`}</div>
            </div>
            
          </div>
          <div key={currentWord.id} className={wordClass}>
            {currentWord.word}
          </div>
          <div className="Buttons-Container">
            {renderButton("noun")}
            {renderButton("adverb")}
            {renderButton("adjective")}
            {renderButton("verb")}
          </div>
          {answered && (
            <div className="Buttons-Container">
              <Button
                isDarkTheme={isDarkTheme}
                title="Next"
                onClick={handleRightClick}
                style={{ backgroundColor: "" }}
              />
            </div>
          )}
        </div>
      )}
      <IconThemeComponent isDarkTheme={isDarkTheme} handleThemeToggle={handleThemeToggle} />
    </div>
  );
}

export default PracticeScreen;