import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import WhoWeAre from './components/WhoWeAre/WhoWeAre';
import ComplianceIndustries from './components/ComplianceIndustries/ComplianceIndustries';
import ComplianceSolution from './components/ComplianceSolution/ComplianceSolution';
import About from './components/About/About';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Hero />
        <WhoWeAre />
        <ComplianceIndustries />
        <ComplianceSolution />
        <About />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
