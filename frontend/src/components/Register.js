import React, { useState } from 'react';
import './Register.css';

function RegisterPopup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Parolele nu se potrivesc.');
      setMessage(null);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      setMessage(responseData.message);
      setError(null);

      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Eroare la conectarea la server:', error);

      setMessage(null);
      setError('Eroare la conectarea la server.');
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password"></label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              required
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
            />
          </div>
          <div className="form-group">
            <button type="submit">Create Account</button>
          </div>
          {message && <p style={{ color: 'white', fontSize: '1.2em', backgroundColor: '#04395E', padding: '10px', borderRadius: '5px' }}>{message}</p>}
          {error && <p style={{ color: 'white' }}>{error}</p>}
        </form>
      </div>
    </div>
  ) : null;
}

export default RegisterPopup;
