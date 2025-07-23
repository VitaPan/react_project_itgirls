import React, { useState, useEffect, useRef } from "react";
import styles from './wordCard.module.css';

export default function WordCard({ words, onLearned, learnedCount }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const showBtnRef = useRef(null);

    const currentWord = words[currentIndex];

    useEffect(() => {
        setShowTranslation(false);
    }, [currentIndex]);

    useEffect(() => {
        if (showBtnRef.current && !showTranslation) {
            showBtnRef.current.focus();
        }
    }, [currentWord, showTranslation]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    };

    if (!words || words.length === 0) {
        return <div className={styles.card}>Нет слов для отображения</div>;
    }

    const handleShowTranslation = () => {
        setShowTranslation(true);
        if (onLearned && currentWord?.id) {
            onLearned(currentWord.id);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.word}>{currentWord.english}</div>
            <div className={styles.transcription}>{currentWord.transcription}</div>
            <div className={styles.theme}>{currentWord.theme || 'Без темы'}</div>

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
                <button onClick={handlePrev}>←</button>
                <button onClick={handleNext}>→</button>
            </div>
            <h4>Изучено слов: {learnedCount}</h4>
        </div>
    );
}
