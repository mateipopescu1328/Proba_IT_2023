import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingPage from './components/LoadingPage';
import CreatePollPage from './components/CreatePollPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/createpollpage" element={<CreatePollPage />} />
      </Routes>
    </Router>
  );
}

export default App;
