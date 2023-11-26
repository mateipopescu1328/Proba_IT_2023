import React, { useState } from 'react';
import './CreatePoll.css';

const CreatePollPopup = (props) => {
  const [title, setTitle] = useState('');
  const [voteType, setVoteType] = useState('singleChoice');
  const [answerOptions, setAnswerOptions] = useState(['', '', '']);
  const [error, setError] = useState(null);

  const addOption = () => {
    setAnswerOptions((prevOptions) => [...prevOptions, '']);
  };

  const handleCreatePoll = async () => {

    console.log('Token:', localStorage.getItem('auth-token'));
    console.log('Data sent to server:', { title, options: answerOptions });

    console.log('Creating poll...');
    if (title.trim() === '') {
      setError('Title cannot be empty');
    } else {
      setError(null);

      try {
        const token = localStorage.getItem('auth-token');
        const response = await fetch('http://localhost:5000/api/createpoll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
          body: JSON.stringify({
            title,
            options: answerOptions,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Poll created successfully:', data.message);
          props.setTrigger(false);
        } else {
          console.error('Error creating poll:', data.message);
        }
      } catch (error) {
        console.error('Error creating poll:', error.message);
      }
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
        <h2>Create a Poll</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Vote Type</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="singleChoice"
                  checked={voteType === 'singleChoice'}
                  onChange={() => setVoteType('singleChoice')}
                />
                Single Choice
              </label>
              <label>
                <input
                  type="radio"
                  value="multipleChoice"
                  checked={voteType === 'multipleChoice'}
                  onChange={() => setVoteType('multipleChoice')}
                />
                Multiple Choice
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Answer Options</label>
            {answerOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const options = [...answerOptions];
                  options[index] = e.target.value;
                  setAnswerOptions(options);
                }}
              />
            ))}
            <div className="add-option-container">
              <button type="button" onClick={addOption}>
                Add Option
              </button>
            </div>
          </div>
          <div className="form-group">
            <button type="button" onClick={handleCreatePoll}>
              Create Poll
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  ) : null;
};

export default CreatePollPopup;
