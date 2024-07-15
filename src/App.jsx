import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import TwoPlayersPage from './pages/TwoPlayersPage';
import AIPage from './pages/AIPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/two-players" element={<TwoPlayersPage />} />
        <Route path="/play-with-ai" element={<AIPage />} />
      </Routes>
    </Router>
  );
}

export default App;
