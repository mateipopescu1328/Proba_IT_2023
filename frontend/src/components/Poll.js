import React, { useState, useEffect } from 'react';
import './Poll.css';

const Poll = ({ title, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showVoteButton, setShowVoteButton] = useState(false);

  useEffect(() => {
    // Acest efect se va rula de fiecare dată când selectedOption se schimbă
    setShowVoteButton(selectedOption !== null);
  }, [selectedOption]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleVoteClick = () => {
    // Implementează logica pentru a vota pentru opțiunea selectată
    console.log(`Ai votat pentru: ${selectedOption}`);
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
