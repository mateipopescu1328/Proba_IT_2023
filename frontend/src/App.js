import './App.css';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div className="App">
      <Navbar/>
    </div>
  );
}

export default App;
