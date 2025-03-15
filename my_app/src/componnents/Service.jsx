import React from 'react';
import './Service.css'; // Optional: for custom styles

const Service = () => {
  // Sample data for services
  const services = [
    {
      id: 1,
      title: 'Service 1',
      description: 'This is a description for Service 1. It provides amazing features and benefits.',
      icon: 'bi bi-gear', // Bootstrap icon class
    },
    {
      id: 2,
      title: 'Service 2',
      description: 'This is a description for Service 2. It offers top-notch solutions for your needs.',
      icon: 'bi bi-lightbulb', // Bootstrap icon class
    },
    {
      id: 3,
      title: 'Service 3',
      description: 'This is a description for Service 3. It ensures high-quality performance.',
      icon: 'bi bi-speedometer2', // Bootstrap icon class
    },
    {
      id: 4,
      title: 'Service 4',
      description: 'This is a description for Service 4. It delivers exceptional results.',
      icon: 'bi bi-tools', // Bootstrap icon class
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Services</h2>
      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100 text-center p-3 shadow-sm">
              <div className="card-body">
                <i className={`${service.icon} fs-1 text-primary mb-3`}></i>
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;