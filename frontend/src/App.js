import './App.css';
import test from './components/testoasa 1.png'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div className="App">
      <Navbar/>
      <div className="content-container">
        {/* <div className="text-container">
          <p>
            Opiniile sunt mai importante ca niciodată. Platformele de sondaje permit organizatorilor să culeagă feedback direct de la audiența lor și să înțeleagă mai bine nevoile și dorințele acesteia.
          </p>
        </div> */}

        {/* <div>
          <img src={test} className="testpng" alt="testoasa" />
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default App; 
