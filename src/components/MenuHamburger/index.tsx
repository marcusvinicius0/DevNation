import React from 'react';

import styles from './styles.module.scss';

interface MenuHamburgerProps {
    boolean: boolean;
    [x: string]: any;
}

export default function MenuHamburguer({ boolean, ...rest }: MenuHamburgerProps) {
    return (
        <button className={styles.hamburguer} {...rest}>
            <div className={boolean ? styles.line1 : undefined} />
            <div className={boolean ? styles.line2 : undefined} />
            <div className={boolean ? styles.line3 : undefined} />
        </button>
    )
}