import React, { useState, useEffect } from 'react';
import './Poll.css';

const Poll = ({ pollId, title, options, user }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showVoteButton, setShowVoteButton] = useState(false);
  const [votes, setVotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [isUserOwner, setIsUserOwner] = useState(false);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        if (!pollId) {
          console.error('pollId is undefined');
          return;
        }
        const response = await fetch(`http://localhost:5000/api/polls/${pollId}`);
        const pollData = await response.json();

        if (response.ok) {
          setVotes(pollData.options.map(option => option.votes));
          setIsUserOwner(user === pollData.owner);
        } else {
          console.error('Eroare obținere date sondaj:', pollData.message);
        }
      } catch (error) {
        console.error('Eroare obținere date sondaj:', error.message);
      }
    };

    fetchPollData();
  }, [pollId, user]);

  useEffect(() => {
    setShowVoteButton(selectedOption !== null);
  }, [selectedOption]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setHasVoted(false);
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
        const updatedPollData = await fetch(`http://localhost:5000/api/polls/${pollId}`);
        const pollData = await updatedPollData.json();

        if (updatedPollData.ok) {
          setVotes(pollData.options.map(option => option.votes));
        } else {
          console.error('Eroare obținere date sondaj:', pollData.message);
        }
        setHasVoted(true);
      } else {
        console.error('Eroare înregistrare vot:', data.message);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Eroare înregistrare vot:', error.message);
      setErrorMessage('Eroare înregistrare vot. Te rugăm să încerci din nou.');
    }
  };

  const handleDeletePoll = async () => {
    try {
      if (!isUserOwner) {
        console.error('Nu aveți permisiunea de a șterge acest sondaj.');
        return;
      }

      const token = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:5000/api/polls/${pollId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sondaj șters cu succes:', data.message);
      } else {
        console.error('Eroare ștergere sondaj:', data.message);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Eroare ștergere sondaj:', error.message);
      setErrorMessage('Eroare ștergere sondaj. Te rugăm să încerci din nou.');
    }
  };

  return (
    <div className="poll-container" style={{ position: 'relative' }}>
      <div className="poll-title">
        {title}
        {isUserOwner && (
          <button className="delete-btn" onClick={handleDeletePoll}>
            Delete
          </button>
        )}
      </div>
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
      <div className='altceva'>
        <button className="vote-btn" onClick={handleVoteClick}>
          Vote
        </button>
      </div>
      <div className="ceva">{errorMessage}</div>
      {selectedOption && !hasVoted && (
        <div>
          {options.map((option, index) => (
            <div className="ceva" key={index}>
              {option} - Voturi: {votes[index]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Poll;
