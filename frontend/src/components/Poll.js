import React, { useState, useEffect } from 'react';
import './Poll.css';

const Poll = ({ pollId, title, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showVoteButton, setShowVoteButton] = useState(false);

  useEffect(() => {
    setShowVoteButton(selectedOption !== null);
  }, [selectedOption]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleVoteClick = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:5000/api/polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({
          option: selectedOption,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Vot înregistrat cu succes:', data.message);
        // Poți actualiza starea sau interfața utilizatorului aici, dacă este necesar
      } else {
        console.error('Eroare înregistrare vot:', data.message);
      }
    } catch (error) {
      console.error('Eroare înregistrare vot:', error.message);
    }
  };

  return (
    <div className="poll-container">
      <div className="poll-title">{title}</div>
      <div className="make-choice-text">Make a choice:</div>
      <div className="choice-container">
        {options.map((option, index) => (
          <label className="choice-label" key={index}>
            <input
              type="radio"
              name="poll-option"
              value={option}
              onChange={() => handleOptionChange(option)}
              className="choice-option"
            />
            {option}
          </label>
        ))}
      </div>
      {showVoteButton && (
        <button className="vote-btn" onClick={handleVoteClick}>
          Vote
        </button>
      )}
    </div>
  );
};

export default Poll;
