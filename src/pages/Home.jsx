import React, { useContext } from 'react';
import { WordsContext } from '../context/WordsContext';
import WordList from '../components/wordApp/WordList/WordList';
import WordCard from '../components/wordApp/WordCard/WordCard';
import Loading from '../components/loading/Loading';

const WordApp = () => {
    const { words, loading, error, addWord, updateWord, deleteWord } = useContext(WordsContext);

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;

    return (
        <div className="word-app">
            <WordList
                words={words}
                onAdd={addWord}
                onUpdate={updateWord}
                onDelete={deleteWord}
            />
            <WordCard words={words} />
        </div>
    );
};

export default WordApp;