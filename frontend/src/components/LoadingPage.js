import './LP.css';
import test from './testoasa 1.png';
import Footer from './Footer';
import Navbar from './Navbar';
import Poll from './Poll';
import { useState, useEffect } from 'react';

function LoadingPage() {
    const [latestPolls, setLatestPolls] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/latestpolls')
            .then(response => response.json())
            .then(data => setLatestPolls(data))
            .catch(error => console.error('Eroare la obținerea ultimelor poll-uri:', error));
    }, []);

    return (
        <div className="App" style={{ position: 'relative' }}>
            <Navbar />

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

            <div className="polls-container">
                {latestPolls.map(poll => (
                    <Poll key={poll._id} title={poll.title} options={poll.options.map(option => option.text)} handleVote={() => console.log('Votat!')} />
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default LoadingPage;