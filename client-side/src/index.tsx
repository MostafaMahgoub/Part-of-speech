import React from 'react';
import ReactDOM from 'react-dom/client';
import PracticeScreen from './practice-screen/practiceScreen';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PracticeScreen />
  </React.StrictMode>
);

