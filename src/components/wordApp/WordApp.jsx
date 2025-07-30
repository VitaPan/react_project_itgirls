import React, { useContext, useState } from "react";
import { WordsContext } from "../../context/WordsContext";
import WordList from "./WordList/WordList";
import WordCard from "./WordCard/WordCard";
import Loading from "../loading/Loading";

export default function WordApp() {
    const {
        words,
        loading,
        error,
        addWord,
        updateWord,
        deleteWord,
    } = useContext(WordsContext);

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

    const [learnedCount, setLearnedCount] = useState(0);
    const [learnedIds, setLearnedIds] = useState([]);

    const handleLearned = (wordId) => {
        if (!learnedIds.includes(wordId)) {
            setLearnedCount(prev => prev + 1);
            setLearnedIds(prev => [...prev, wordId]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWord({ ...newWord, [name]: value });
    };

    const handleAddWord = () => {
        if (Object.values(newWord).some(val => val.trim() === "")) return;
        addWord(newWord);
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
        const updated = {
            ...editedWord,
            id,
            tags: '',
            tags_json: '',
        };
        updateWord(updated);
        cancelEditing();
    };

    const handleDeleteWord = (id) => {
        deleteWord(id);
    };

    if (loading) return <Loading />;
    if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;

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
                onLearned={handleLearned}
                learnedIds={learnedIds}
                learnedCount={learnedIds.length}
            />
        </>
    );
}
