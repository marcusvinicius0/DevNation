/* eslint-disable react/require-default-props */
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import styles from './styles.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  onClick: () => void;
  // button || submit
  type: 'button' | 'submit';
};

function Button({ children, type, loading, onClick }: ButtonProps) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {loading ? <CircularProgress size={22} /> : children}
    </button>
  );
}

export default Button;
