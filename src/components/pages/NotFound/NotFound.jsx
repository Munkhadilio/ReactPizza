import React from 'react'
import styles from "../NotFound/NotFound.module.scss"

const NotFound = () => {
    return (
        <div className={styles.root}>
            <span>😞</span>
            <h1>НИЧЕГО НЕ НАЙДЕНО</h1>
            <div className={styles.descr}>К сожалению данная страница отсутствует</div>
        </div>
    )
}

export default NotFound;