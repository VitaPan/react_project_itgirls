import { Link } from 'react-router-dom';
import styles from './header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">🧠 WordTrainer</Link>
            </div>
            <nav>
                <ul className={styles.nav}>
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/game">Карточки</Link></li>
                </ul>
            </nav>
        </header>
    );
}