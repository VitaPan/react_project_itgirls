import React, { useState, useEffect } from "react";
import { fetchWords } from "../../api/words";
import WordList from "./WordList/WordList";
import WordCard from "./WordCard/WordCard";

export default function WordApp() {
    const [words, setWords] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedWord, setEditedWord] = useState({
        english: '',
        transcription: '',
        russian: '',
    });

    const [newWord, setNewWord] = useState({
        english: '',
        transcription: '',
        russian: '',
    });

    useEffect(() => {
        const getWords = async () => {
            try {
                const data = await fetchWords();
                setWords(data);
            } catch (error) {
                console.error("Ошибка с API", error);
            }
        };
        getWords();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWord({ ...newWord, [name]: value });
    };

    const handleAddWord = () => {
        if (Object.values(newWord).some(val => val.trim() === "")) return;
        setWords([{ ...newWord, id: Date.now() }, ...words]);
        setNewWord({ english: "", transcription: "", russian: "" });
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
        setEditedWord({ english: "", transcription: "", russian: "" });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedWord({ ...editedWord, [name]: value });
    };

    const saveEdit = (id) => {
        const updated = words.map(word =>
            word.id === id ? { ...word, ...editedWord } : word
        );
        setWords(updated);
        cancelEditing();
    };

    const handleDeleteWord = (id) => {
        setWords(words.filter(word => word.id !== id));
    };

    return (
        <>
            <WordList
                words={words}
                editingId={editingId}
                editedWord={editedWord}
                newWord={newWord}
                onInputChange={handleInputChange}
                onAddWord={handleAddWord}
                onStartEditing={startEditing}
                onCancelEditing={cancelEditing}
                onEditChange={handleEditChange}
                onSaveEdit={saveEdit}
                onDeleteWord={handleDeleteWord}
            />
            <WordCard
                words={words}
            />
        </>
    );
}