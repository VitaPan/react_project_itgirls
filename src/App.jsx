import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Game from './pages/Game';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
