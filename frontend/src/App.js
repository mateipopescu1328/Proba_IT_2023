// App.js
import './App.css';
import test from './components/testoasa 1.png';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Poll from './components/Poll';
import { useState } from 'react';

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const pollOptions = ['Opțiunea 1', 'Opțiunea 2', 'Opțiunea 3', 'Opțiunea 4'];

  return (
    <div className="App">
      <Navbar />

      {/* Secțiunea pentru text și imagine */}
      <div className="content-container">
        <div className="content-row">
          <div className="half left">
            <p>Opiniile sunt mai importante ca </p>
            <p>niciodată. Platformele de sondaje</p>
            <p>permit organizatorilor să culeagă</p>
            <p>feedback direct de la audiența lor</p>
            <p>și să înțeleagă mai bine nevoile și</p>
            <p>dorințele acesteia.</p>
          </div>
          <div className="half right">
            <img src={test} alt="Imaginea ta" />
          </div>
        </div>
      </div>

      {/* Secțiunea pentru sondaje */}
      <div className="polls-container">
        <Poll title="Sondajul 1" options={pollOptions} handleVote={() => console.log('Votat!')} />
        <Poll title="Sondajul 2" options={pollOptions} handleVote={() => console.log('Votat!')} />
        <Poll title="Sondajul 3" options={pollOptions} handleVote={() => console.log('Votat!')} />
        <Poll title="Sondajul 4" options={pollOptions} handleVote={() => console.log('Votat!')} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
