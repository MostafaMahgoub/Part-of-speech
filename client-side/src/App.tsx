import { useState ,useEffect } from 'react';
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
    <div className="Main-Container">
      <PracticeScreen isDarkTheme={isDarkTheme} handleThemeToggle={handleThemeToggle} />
    </div>
  );
}

export default App;