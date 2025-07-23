import React from "react";
import styles from './wordList.module.css';

export default function WordList({
    words,
    editingId,
    editedWord,
    newWord,
    onInputChange,
    onAddWord,
    onStartEditing,
    onCancelEditing,
    onEditChange,
    onSaveEdit,
    onDeleteWord,
}) {
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
                    onChange={onInputChange}
                    placeholder="Слово"
                />
                <input
                    name="transcription"
                    value={newWord.transcription}
                    onChange={onInputChange}
                    placeholder="Транскрипция"
                />
                <input
                    name="russian"
                    value={newWord.russian}
                    onChange={onInputChange}
                    placeholder="Перевод"
                />
                <button onClick={onAddWord}>Добавить</button>
            </div>

            {words.map((word) => (
                <div className={styles.word_row} key={word.id}>
                    {editingId === word.id ? (
                        <>
                            <div className={styles.word_cell}>
                                <input
                                    name="english"
                                    value={editedWord.english}
                                    onChange={onEditChange}
                                />
                            </div>
                            <div className={styles.word_cell}>
                                <input
                                    name="transcription"
                                    value={editedWord.transcription}
                                    onChange={onEditChange}
                                />
                            </div>
                            <div className={styles.word_cell}>
                                <input
                                    name="russian"
                                    value={editedWord.russian}
                                    onChange={onEditChange}
                                />
                            </div>
                            <div className={styles.word_actions}>
                                <button onClick={() => onSaveEdit(word.id)}>Сохранить</button>
                                <button onClick={onCancelEditing}>Отменить</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.word_cell}>{word.english}</div>
                            <div className={styles.word_cell}>{word.transcription}</div>
                            <div className={styles.word_cell}>{word.russian}</div>
                            <div className={styles.word_actions}>
                                <button onClick={() => onStartEditing(word)}>Редактировать</button>
                                <button onClick={() => onDeleteWord(word.id)}>Удалить</button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}