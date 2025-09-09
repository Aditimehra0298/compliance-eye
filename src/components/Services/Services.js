import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-paint-brush',
      title: 'Web Design',
      description: 'Beautiful, responsive designs that look great on all devices and drive user engagement.',
    },
    {
      icon: 'fas fa-code',
      title: 'Web Development',
      description: 'Custom websites built with modern technologies for optimal performance and user experience.',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that provide seamless user experiences.',
    },
    {
      icon: 'fas fa-search',
      title: 'SEO Optimization',
      description: 'Improve your search engine rankings and drive more organic traffic to your website.',
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Analytics & Insights',
      description: 'Data-driven insights to help you understand your audience and optimize performance.',
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      description: 'Ongoing maintenance and support to keep your digital presence running smoothly.',
    },
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Services</span>
          <h2>Everything You Need to Succeed Online</h2>
          <p>From design to development, we provide comprehensive digital solutions for your business.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#" className="service-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
