import React, { useEffect, useRef } from "react";
import "./rankScreen.sass";

interface CircularProgressProps {
  title: string;
  value: string;
  progress: number | null;
  isDarkTheme : boolean;
}

function CircularProgress({
  title,
  value,
  progress,
  isDarkTheme
}: CircularProgressProps): JSX.Element {
  const valueRef = useRef<SVGTextElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const valueEl = valueRef.current;
    const circleEl = circleRef.current;

    if (valueEl && circleEl) {
      valueEl.textContent = value;
      const progressValue = progress !== null ? progress : 0;
      circleEl.style.setProperty("--progress-value", `${(progressValue / 100) * 283}`);
    }
  }, [value, progress]);

  return (
    <div className="progress-circular-bar">
      <span className={`${isDarkTheme ? "progress-circular-title-dark" : "progress-circular-title-light"}`}>{title}</span>
      <div className="progress-circular-bar-inner">
        <svg className="progress-circular-circle" viewBox="0 0 100 100">
          <circle
            className="progress-circular-background"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <circle
            ref={circleRef}
            className="progress-circular-circle"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <text
            ref={valueRef}
            className={`${isDarkTheme ? "progress-circular-value-dark" : "progress-circular-value-light"}`}
            x="50"
            y="50"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {value}
          </text>
        </svg>
      </div>
    </div>
  );
}

interface ProgressBarProps {
    isDarkTheme: boolean;
    rank: number | null;
    score: number | null;
  }

function ProgressBars({ isDarkTheme, rank, score }: ProgressBarProps): JSX.Element {
  const scoreValue = score ? score.toString() : "N/A";
  const rankValue = rank ? rank.toString() : "N/A";

  return (
    <div className="progress-circular-container">
      <CircularProgress title="Score" value={scoreValue} progress={score} isDarkTheme={isDarkTheme} />
      <CircularProgress title="Rank" value={rankValue} progress={rank} isDarkTheme={isDarkTheme} />
    </div>
  );
}

export default ProgressBars;