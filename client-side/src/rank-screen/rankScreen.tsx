import React from "react";
import ProgressBar from "./progressBar";
import ButtonComponent from "../practice-screen/buttonComponent"
import "./rankScreen.sass";


interface RankScreenProps {
  isDarkTheme: boolean;
  rank: number | null;
  score: number | null;
  setIsRankScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

function RankScreen({isDarkTheme , rank , score , setIsRankScreen}:RankScreenProps): JSX.Element {

  const handleTryAgain = () => {
    setIsRankScreen(false);
  }

  return (
    <div className="rank-Container">
      <ProgressBar isDarkTheme={isDarkTheme} rank={rank} score={score} />
      <ButtonComponent isDarkTheme={isDarkTheme} title="Try Again" onClick={handleTryAgain} style={{ marginTop : "5vw"}} />
    </div>
  );
}

export default RankScreen;