import React, { useContext } from "react";
import { WordsContext } from "../../../context/WordsContext";
import styles from "./wordList.module.css";

export default function WordList() {
    const {
        words,
        newWord,
        editingId,
        editedWord,
        handleInputChange,
        handleAddWord,
        startEditing,
        cancelEditing,
        handleEditChange,
        saveEdit,
        deleteWord,
        loading,
        error,
    } = useContext(WordsContext);

    if (loading) return <div className={styles.status}>Загрузка...</div>;
    if (error) return <div className={styles.error}>Ошибка: {error}</div>;

    return (
        <>
            <div className={styles.word_header}>
                <div className={styles.word_cell}>Слово</div>
                <div className={styles.word_cell}>Транскрипция</div>
                <div className={styles.word_cell}>Перевод</div>
                <div className={styles.word_cell}>Действия</div>
            </div>

            <div className={styles.word_input}>
                <input
                    name="english"
                    value={newWord.english}
                    onChange={handleInputChange}
                    placeholder="Слово"
                />
                <input
                    name="transcription"
                    value={newWord.transcription}
                    onChange={handleInputChange}
                    placeholder="Транскрипция"
                />
                <input
                    name="russian"
                    value={newWord.russian}
                    onChange={handleInputChange}
                    placeholder="Перевод"
                />
                <button onClick={handleAddWord}>Добавить</button>
            </div>

            {words?.length > 0 ? (
                words.map((word) => (
                    <div className={styles.word_row} key={word.id}>
                        {editingId === word.id ? (
                            <>
                                <div className={styles.word_cell}>
                                    <input
                                        name="english"
                                        value={editedWord.english}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className={styles.word_cell}>
                                    <input
                                        name="transcription"
                                        value={editedWord.transcription}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className={styles.word_cell}>
                                    <input
                                        name="russian"
                                        value={editedWord.russian}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className={styles.word_actions}>
                                    <button onClick={() => saveEdit(word.id)}>Сохранить</button>
                                    <button onClick={cancelEditing}>Отменить</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.word_cell}>{word.english}</div>
                                <div className={styles.word_cell}>{word.transcription}</div>
                                <div className={styles.word_cell}>{word.russian}</div>
                                <div className={styles.word_actions}>
                                    <button onClick={() => startEditing(word)}>Редактировать</button>
                                    <button onClick={() => deleteWord(word.id)}>Удалить</button>
                                </div>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <div className={styles.status}>Нет слов для отображения</div>
            )}
        </>
    );
}