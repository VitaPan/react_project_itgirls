import React from "react";
import { Link } from "react-router-dom";
import styles from "./notFound.module.css";

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <h2>404 — Страница не найдена</h2>
            <p>Кажется, вы заблудились.</p>
            <Link to="/">Вернуться на главную</Link>
        </div>
    );
}