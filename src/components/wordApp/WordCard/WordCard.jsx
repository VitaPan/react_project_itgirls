import React, { useState, useEffect, useRef, useContext } from "react";
import { WordsContext } from "../../../context/WordsContext";
import styles from "./wordCard.module.css";

export default function WordCard() {
    const { words, loading, error } = useContext(WordsContext);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [learnedWords, setLearnedWords] = useState([]);
    const showBtnRef = useRef(null);

    const currentWord = words[currentIndex] || null;

    useEffect(() => {
        setShowTranslation(false);
    }, [currentIndex]);

    useEffect(() => {
        if (showBtnRef.current && !showTranslation) {
            showBtnRef.current.focus();
        }
    }, [currentWord, showTranslation]);

    const handleNext = () => {
        if (words.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }
    };

    const handlePrev = () => {
        if (words.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
        }
    };

    const handleShowTranslation = () => {
        if (!showTranslation) {
            setShowTranslation(true);
            if (currentWord?.id && !learnedWords.includes(currentWord.id)) {
                setLearnedWords((prev) => [...prev, currentWord.id]);
            }
        }
    };

    if (loading) return <div className={styles.card}>Загрузка...</div>;
    if (error) return <div className={styles.card}>Ошибка: {error}</div>;
    if (!currentWord) return <div className={styles.card}>Нет слов для отображения</div>;

    const isLearned = learnedWords.includes(currentWord.id);

    return (
        <div className={styles.card}>
            <div className={styles.word}>{currentWord.english}</div>
            <div className={styles.transcription}>{currentWord.transcription}</div>
            <div className={styles.theme}>{currentWord.theme || "Без темы"}</div>

            {isLearned && (
                <div className={styles.learnedMark}>✔ Изучено</div>
            )}

            {!showTranslation ? (
                <button
                    ref={showBtnRef}
                    className={styles.showBtn}
                    onClick={handleShowTranslation}
                >
                    Показать перевод
                </button>
            ) : (
                <div className={styles.translation}>{currentWord.russian}</div>
            )}

            <div className={styles.nav}>
                <button onClick={handlePrev} disabled={words.length <= 1}>←</button>
                <button onClick={handleNext} disabled={words.length <= 1}>→</button>
            </div>

            <h4>Изучено слов: {learnedWords.length}</h4>
        </div>
    );
}