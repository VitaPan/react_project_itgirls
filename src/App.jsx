import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Game from './pages/Game';
import NotFound from './components/NotFound/NotFound';
import { WordsProvider } from './context/WordsContext'; // Импорт провайдера

function App() {
  return (
    <WordsProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </WordsProvider>
  );
}

export default App;
