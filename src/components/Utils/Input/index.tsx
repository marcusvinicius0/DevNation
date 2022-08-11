/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from './styles.module.scss';

interface InputProps {
  label: string;
  itsPassword?: boolean;
  [x: string]: any;
}

export function Input({ label, itsPassword, ...rest }: InputProps) {
  const [isHidden, setIsHidden] = useState(itsPassword);

  return (
    <div className={styles.input}>
      <p>{label}</p>
      <input type={isHidden ? 'password' : ''} {...rest} />
      {itsPassword && (
        <button onClick={() => setIsHidden(!isHidden)} type="button">
          {isHidden ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
        </button>
      )}
    </div>
  );
}
