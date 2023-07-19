
interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        <div className="progress-text">{`${Math.round(progress)}%`}</div>
      </div>
    </div>
  );
}

export default ProgressBar;