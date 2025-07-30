import React from 'react';
import styles from './loading.module.css'

const Loading = () => {
    return (
        <div className={styles.cssloadContainer}>
            <div className={styles.cssloadWhirlpool}></div>
        </div>
    );
};

export default Loading;