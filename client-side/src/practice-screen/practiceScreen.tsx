import { useState, useEffect } from "react";
import "./practiceScreen.sass";
import Button from "./buttonComponent";
import IconThemeComponent from "./IconThemeComponent";

interface PracticeScreenProps {
  isDarkTheme: boolean;
  handleThemeToggle: () => void;
}

function PracticeScreen({ isDarkTheme, handleThemeToggle }: PracticeScreenProps) {
  const [words, setWords] = useState<string[]>([]);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [showWords, setShowWords] = useState(false);

  interface WordObject {
    id: number;
    word: string;
    pos: string;
  }

  useEffect(() => {
    fetch("http://localhost:3000/words")
      .then((response) => response.json())
      .then((data: WordObject[]) => {
        const words = data.map((wordObj) => wordObj.word);
        setWords(words);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleClick = () => {
    setShowWords(true);
  };

  const handleRightClick = () => {
    setWordIndex((prevIndex) => prevIndex + 1);
  };

  const handleWrongClick = () => {
    // Do nothing for now
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
          <div key={currentWord} className={`${isDarkTheme ? "word-dark" : "word-light"}`}>{currentWord}</div>
          <div className="Buttons-Container">
            <Button
              isDarkTheme={isDarkTheme}
              title="noun"
              onClick={handleRightClick}
            />
            <Button
              isDarkTheme={isDarkTheme}
              title="adverb"
              onClick={handleWrongClick}
            />
            <Button
              isDarkTheme={isDarkTheme}
              title="adjective"
              onClick={handleWrongClick}
            />
            <Button
              isDarkTheme={isDarkTheme}
              title="verb"
              onClick={handleWrongClick}
            />
          </div>
        </div>
      )}
      <IconThemeComponent isDarkTheme={isDarkTheme} handleThemeToggle={handleThemeToggle} />
    </div>
  );
}

export default PracticeScreen;