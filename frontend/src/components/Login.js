import React, { useState } from 'react';
import './Login.css';

function Popup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 404) {
        setError('Utilizatorul nu există.');
        setMessage(null);
      } else {
        setMessage(data.message);
        setError(null);
      }
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
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Parolă"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
          {message && <p style={{ color: 'white', fontSize: '1.2em', backgroundColor: '#04395E', padding: '10px', borderRadius: '5px' }}>{message}</p>}
          {error && <p style={{ color: 'white', fontSize: '1.2em', backgroundColor: '#04395E', padding: '10px', borderRadius: '5px' }}>{error}</p>}
        </form>
      </div>
    </div>
  ) : null;
}

export default Popup;
