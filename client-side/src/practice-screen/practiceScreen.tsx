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
  correctPos: string;
}

function PracticeScreen({ isDarkTheme, handleThemeToggle }: PracticeScreenProps) {
  const [words, setWords] = useState<WordObject[]>([]);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [showWords, setShowWords] = useState(false);
  const [buttonColors, setButtonColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch("http://localhost:3000/words")
      .then((response) => response.json())
      .then((data: WordObject[]) => {
        setWords(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleClick = () => {
    setShowWords(true);
    setButtonColors({});
  };

  const handleButtonClick = (pos: string) => {
  const currentWord = words[wordIndex];
  const isCorrect = pos === currentWord.pos;

  if (isCorrect) {
    setButtonColors({ ...buttonColors, [pos]: "green" });
  } else {
    setButtonColors({ ...buttonColors, [pos]: "red" });
  }
};

  const handleRightClick = () => {
    setWordIndex((prevIndex) => prevIndex + 1);
    setButtonColors({});
  };

  const handleWrongClick = () => {
    setButtonColors({});
  };

  const currentWord = words[wordIndex];

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
          <div key={currentWord.id} className={`${isDarkTheme ? "word-dark" : "word-light"}`}>{currentWord.word}</div>
          <div className="Buttons-Container">
            <Button
              isDarkTheme={isDarkTheme}
              title="noun"
              onClick={() => handleButtonClick("noun")}
              style={{ backgroundColor: buttonColors["noun"] }}
            />
            <Button
              isDarkTheme={isDarkTheme}
              title="adverb"
              onClick={() => handleButtonClick("adverb")}
              style={{ backgroundColor: buttonColors["adverb"] }}
            />
            <Button
              isDarkTheme={isDarkTheme}
              title="adjective"
              onClick={() => handleButtonClick("adjective")}
              style={{ backgroundColor: buttonColors["adjective"] }}
            />
            <Button
              isDarkTheme={isDarkTheme}
              title="verb"
              onClick={() => handleButtonClick("verb")}
              style={{ backgroundColor: buttonColors["verb"] }}
            />
          </div>
          <div className="Buttons-Container">
            <Button
              isDarkTheme={isDarkTheme}
              title="Next"
              onClick={handleRightClick}
              style={{ backgroundColor: "" }}
            />
          </div>
        </div>
      )}
      <IconThemeComponent isDarkTheme={isDarkTheme} handleThemeToggle={handleThemeToggle} />
    </div>
  );
}

export default PracticeScreen;