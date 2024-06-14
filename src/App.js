import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContributionsPage from './pages/ContributionsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import NotificationsPage from './pages/NotificationsPage';
import ChatPage from './pages/ChatPage';
import GeolocationPage from './pages/GeolocationPage'; // Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/contributions" component={ContributionsPage} />
        <Route path="/recommendations" component={RecommendationsPage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/geolocation" component={GeolocationPage} /> {/* Add this route */}
        </Routes>
    </Router>
  );
}

export default App;
