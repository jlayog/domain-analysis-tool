import React from 'react';
import styles from './Grid.module.css';

type GridProps = {
    children: React.ReactNode;
};

const Grid: React.FC<GridProps> = ({ children }) => {
    return <div className={styles.grid}>{children}</div>;
};

export default Grid;
