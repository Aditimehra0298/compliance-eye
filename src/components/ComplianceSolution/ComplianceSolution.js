import React, { useState, useEffect } from 'react';
import './ComplianceSolution.css';
import OurClients from '../OurClients/OurClients';

const ComplianceSolution = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [visibleFeedbackCards, setVisibleFeedbackCards] = useState([]);

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

  // Separate observer for feedback cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate feedback cards one by one
            const feedbackCards = [0, 1, 2]; // 3 feedback cards
            feedbackCards.forEach((index) => {
              setTimeout(() => {
                setVisibleFeedbackCards(prev => [...prev, `feedback-${index}`]);
              }, index * 500); // 500ms delay between each card
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const feedbackSection = document.getElementById('customer-experience-section');
    if (feedbackSection) {
      observer.observe(feedbackSection);
    }

    return () => {
      if (feedbackSection) {
        observer.unobserve(feedbackSection);
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

          {/* New Expertise Section */}
          <div className="expertise-section">
            <div className="expertise-header">
              <h2 className="expertise-title">Stay Ahead with Trusted Compliance Expertise</h2>
              <p className="expertise-description">
                Welcome to your partner in navigating the complex world of compliance.
                We combine deep industry knowledge, cutting-edge technology, and certified expertise to ensure your organization meets regulatory standards confidently.
                Our commitment is to provide clear, actionable insights and solutions that drive integrity, transparency, and sustainable success.
              </p>
            </div>

            <div className="expertise-main">
              {/* Left Side - Image */}
              <div className="expertise-image-section">
                <div className="image-container">
                  <img 
                    src="/Untitled%20design%20(21).png" 
                    alt="Compliance Analytics" 
                    className="expertise-image"
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="expertise-text-section">
                <div className="text-content">
                  <h3 className="content-title">Insightful Analytics</h3>
                  <p className="content-description">
                    Insightful analytics powered by deep business expertise and cutting-edge AI innovation, transforming complex data into clear, actionable compliance intelligence.
                  </p>
                  <p className="content-description">
                    Our software not only uncovers critical insights but also helps you bridge compliance gaps with targeted recommendations—enabling confident, data-driven decisions for your organization's success.
                  </p>
                  
                  {/* Our Insight Button inside the content */}
                  <div className="insight-button-container">
                    <button className="btn btn-primary insight-btn">
                      Our Insight
                    </button>
                  </div>
                </div>
              </div>
            </div>


            {/* Our Clients Section */}
            <div className="clients-section">
              <OurClients />
            </div>

            {/* Perfect Customer Experience Section */}
            <div className="customer-experience-section" id="customer-experience-section">
              <div className="experience-header">
                <h2 className="experience-title">The Perfect Customer Experience</h2>
              </div>
              
              <div className="feedback-cards">
                <div className={`feedback-card ${visibleFeedbackCards.includes('feedback-0') ? 'visible' : ''}`}>
                  <div className="feedback-content">
                    <div className="quote-icon">"</div>
                    <p className="feedback-text">
                      "Compliance Eye transformed our regulatory processes completely. Their real-time monitoring and AI-powered insights helped us achieve 100% compliance while reducing manual work by 80%."
                    </p>
                    <div className="feedback-author">
                      <div className="author-info">
                        <h4 className="author-name">Sarah Johnson</h4>
                        <p className="author-title">Compliance Director, TechCorp</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`feedback-card ${visibleFeedbackCards.includes('feedback-1') ? 'visible' : ''}`}>
                  <div className="feedback-content">
                    <div className="quote-icon">"</div>
                    <p className="feedback-text">
                      "The detailed analytics and expert recommendations provided by Compliance Eye gave us the confidence to navigate complex regulatory requirements effortlessly. Highly recommended!"
                    </p>
                    <div className="feedback-author">
                      <div className="author-info">
                        <h4 className="author-name">Michael Chen</h4>
                        <p className="author-title">CEO, InnovateLabs</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`feedback-card ${visibleFeedbackCards.includes('feedback-2') ? 'visible' : ''}`}>
                  <div className="feedback-content">
                    <div className="quote-icon">"</div>
                    <p className="feedback-text">
                      "Outstanding support and cutting-edge technology. Compliance Eye's platform made our audit preparation seamless and helped us maintain continuous compliance across all departments."
                    </p>
                    <div className="feedback-author">
                      <div className="author-info">
                        <h4 className="author-name">Emily Rodriguez</h4>
                        <p className="author-title">Risk Manager, GlobalFinance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSolution;
