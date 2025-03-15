import React from 'react';
import './about.css'; // Custom CSS for styling

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">About Us</h1>
        <p className="hero-subtitle">Discover the story behind our marketplace.</p>
      </div>

      {/* Mission and Vision Section */}
      <div className="mission-vision-section">
        <div className="mission-vision-card">
          <h2>Our Mission</h2>
          <p>
            At our marketplace, we strive to provide a seamless and enjoyable shopping experience for our customers. 
            Our mission is to connect buyers with high-quality products while supporting sellers in growing their businesses.
          </p>
        </div>
        <div className="mission-vision-card">
          <h2>Our Vision</h2>
          <p>
            We envision a world where everyone has access to the products they need, delivered with exceptional service 
            and care. We aim to be the go-to platform for both buyers and sellers worldwide.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2>Our Team</h2>
        <p>
          Our team is made up of passionate individuals dedicated to making your experience on our platform the best 
          it can be. From developers to customer support, we work together to ensure your satisfaction.
        </p>
        <div className="team-members">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" />
            <h3>Aziz Sadaoui</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" />
            <h3>Wnnissi Oussama</h3>
            <p>Head of Operations</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 3" />
            <h3>Khemiri Hamdi</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to reach out to us. We'd love to hear from you!
        </p>
        <div className="contact-links">
          {/* Email */}
          <a href="mailto:khmirihamdi06@gmail.com" className="contact-link">
            <i className="bi bi-envelope-fill"></i> khmirihamdi06@gmail.com
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/your_instagram" target="_blank" rel="noopener noreferrer" className="contact-link">
            <i className="bi bi-instagram"></i> Instagram
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com/your_facebook" target="_blank" rel="noopener noreferrer" className="contact-link">
            <i className="bi bi-facebook"></i> Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;