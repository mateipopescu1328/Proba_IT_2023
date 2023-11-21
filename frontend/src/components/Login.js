import React from 'react';
import './Login.css';

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input type="email" id="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input type="password" id="password" name="password" placeholder="Parolă" required />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default Popup;
