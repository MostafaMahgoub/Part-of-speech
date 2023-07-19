
import ProgressBar from "./progressBar";


interface RankScreenProps {
  isDarkTheme: boolean;
  rank: number | null;
  score: number | null;
}

function rankScreen({isDarkTheme , rank , score}:RankScreenProps) {
  return (
    <div>
      <ProgressBar isDarkTheme={isDarkTheme} rank={rank} score={score} />
    </div>
  );
}

export default rankScreen;
