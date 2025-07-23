import { useEffect, useState } from "react";
import { fetchWords } from "../api/words";
import WordCard from "../components/wordApp/WordCard/WordCard";

export default function Game() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        fetchWords().then(data => setWords(data));
    }, []);

    return (
        <div>
            <h1>Тренажёр</h1>
            <WordCard words={words} />
        </div>
    );
}