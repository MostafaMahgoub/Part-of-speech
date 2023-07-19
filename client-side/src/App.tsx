import { useState ,useEffect } from 'react';
import PracticeScreen from './practice-screen/practiceScreen';
import RankScreen from './rank-screen/rankScreen';
import './index.css';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isRankScreen, setIsRankScreen] = useState(false);
  const [rank, setRank] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const bodyClassName = isDarkTheme ? "background-dark" : "background-light";

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.className = bodyClassName;
    }
  }, [bodyClassName]);

  return (
    <div className="Main-Container">
      <PracticeScreen isDarkTheme={isDarkTheme} handleThemeToggle={handleThemeToggle} setIsRankScreen={setIsRankScreen} isRankScreen={isRankScreen} setRank={setRank} setScore={setScore} />
      {isRankScreen && (<RankScreen isDarkTheme = {isDarkTheme}  rank = {rank}  score= {score} />)}
    </div>
  );
}

export default App;