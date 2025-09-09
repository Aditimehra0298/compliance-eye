import React, { useState, useEffect } from 'react';
import './ComplianceSolution.css';

const ComplianceSolution = () => {
  const [visibleItems, setVisibleItems] = useState([]);

  const solutionFeatures = [
    {
      title: 'Quiz Assessment',
      description: 'Conduct interactive quizzes to evaluate compliance knowledge and current practices.',
      symbolType: 'quiz'
    },
    {
      title: 'Detailed Analyzed Reports',
      description: 'Provide comprehensive, data-driven reports that break down compliance status and trends.'
    },
    {
      title: 'Individual Expert Analysis',
      description: 'Generate personalized reports reviewed by our compliance experts for accuracy and insights.'
    },
    {
      title: 'ISO Course Recommendations',
      description: 'Suggest targeted ISO training modules to address identified compliance gaps effectively.'
    },
    {
      title: 'Consultant Support',
      description: 'Offer expert consultants to guide through compliance challenges and remediation plans.'
    },
    {
      title: 'Certified & CE Compliant',
      description: 'Ensure all processes, training, and consulting meet certification standards, including CE compliance.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate solution features one by one
            solutionFeatures.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, `feature-${index}`]);
              }, index * 400); // 400ms delay between each item
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('compliance-solution');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section className="compliance-solution" id="compliance-solution">
      <div className="container">
        <div className="solution-content">
          <div className="solution-header">
            <h2 className="section-title">Our Real-Time Compliance Solution</h2>
            <div className="solution-description-wrapper">
              <p className="section-description">
                Our solution delivers real-time compliance monitoring by automatically capturing and seamlessly organizing evidence. It empowers businesses to take immediate, informed actions with confidence, ensuring continuous regulatory adherence and operational excellence. With our intelligent platform, compliance becomes effortless and proactive, transforming how organizations manage risks and audits.
              </p>
            </div>
          </div>
          
          <div className="features-grid">
            {solutionFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${visibleItems.includes(`feature-${index}`) ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.4}s` }}
              >
                <div className="feature-icon">
                  <span className={`feature-symbol ${feature.symbolType ? `feature-symbol-${feature.symbolType}` : ''}`}></span>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSolution;
