import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import WhoWeAre from './components/WhoWeAre/WhoWeAre';
import ComplianceIndustries from './components/ComplianceIndustries/ComplianceIndustries';
import ComplianceSolution from './components/ComplianceSolution/ComplianceSolution';
import Footer from './components/Footer/Footer';
import AuthPage from './components/AuthPage/AuthPage';
import './App.css';

function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <ComplianceIndustries />
      <ComplianceSolution />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
