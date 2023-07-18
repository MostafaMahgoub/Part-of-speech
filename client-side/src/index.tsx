import React, { useRef , useState ,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import PracticeScreen from './practice-screen/practiceScreen';
import './index.css';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

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
    <div>
      <PracticeScreen isDarkTheme={isDarkTheme} handleThemeToggle={handleThemeToggle} />
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);