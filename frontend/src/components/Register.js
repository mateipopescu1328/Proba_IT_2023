import React from 'react';
import './Register.css';

function RegisterPopup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input type="email" id="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input type="password" id="password" name="password" placeholder="Password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password"></label>
            <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" required />
          </div>
          <div className="form-group">
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default RegisterPopup;
