import React, { createContext, useState, useEffect } from 'react';

export const WordsContext = createContext();

export const WordsProvider = ({ children }) => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [newWord, setNewWord] = useState({
        english: '',
        transcription: '',
        russian: '',
    });

    const [editingId, setEditingId] = useState(null);
    const [editedWord, setEditedWord] = useState({
        english: '',
        transcription: '',
        russian: '',
    });

    const fetchWords = () => {
        setLoading(true);
        setError(null);
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) setWords(data);
                else setError('Неверный формат данных');
            })
            .catch((err) => setError(err.message || 'Произошла ошибка при загрузке слов'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchWords();
    }, []);

    const addWord = (newWord) => {
        fetch('http://itgirlschool.justmakeit.ru/api/words/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWord),
        })
            .then((res) => {
                if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
                fetchWords();
            })
            .catch((err) => setError(err.message || 'Произошла ошибка при добавлении слова'));
    };

    const updateWord = (updatedWord) => {
        const body = {
            ...updatedWord,
            tags: updatedWord.tags || '',
            tags_json: updatedWord.tags_json || '',
        };

        fetch(`http://itgirlschool.justmakeit.ru/api/words/${updatedWord.id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => {
                if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
                fetchWords();
            })
            .catch((err) => setError(err.message || 'Ошибка при обновлении слова'));
    };

    const deleteWord = (id) => {
        fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
            method: 'POST',
        })
            .then((res) => {
                if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
                fetchWords();
            })
            .catch((err) => setError(err.message || 'Произошла ошибка в удалении слова'));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWord((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddWord = () => {
        if (Object.values(newWord).some((val) => val.trim() === '')) return;
        addWord(newWord);
        setNewWord({ english: '', transcription: '', russian: '' });
    };

    const startEditing = (word) => {
        setEditingId(word.id);
        setEditedWord({
            english: word.english,
            transcription: word.transcription,
            russian: word.russian,
        });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditedWord({ english: '', transcription: '', russian: '' });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedWord((prev) => ({ ...prev, [name]: value }));
    };

    const saveEdit = (id) => {
        const wordToUpdate = words.find((w) => w.id === id);
        if (wordToUpdate) {
            updateWord({ ...wordToUpdate, ...editedWord });
            cancelEditing();
        }
    };

    return (
        <WordsContext.Provider
            value={{
                words,
                loading,
                error,
                fetchWords,
                addWord,
                updateWord,
                deleteWord,
                newWord,
                setNewWord,
                editingId,
                editedWord,
                setEditedWord,
                handleInputChange,
                handleAddWord,
                startEditing,
                cancelEditing,
                handleEditChange,
                saveEdit,
            }}
        >
            {children}
        </WordsContext.Provider>
    );
};
