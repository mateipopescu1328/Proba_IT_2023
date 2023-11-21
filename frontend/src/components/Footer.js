import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="social-icons">
          <a href="link_instagram" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="link_facebook" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="link_twitch" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitch"></i>
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
