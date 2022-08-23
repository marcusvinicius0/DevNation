/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import styles from './styles.module.scss';

interface InputProps {
  label: string;
  itsPassword?: boolean;
  itsIconEmail?: boolean;
  itsIconUser?: boolean;
  [x: string]: any;
}

export function Input({ label, itsPassword, itsIconEmail, itsIconUser, ...rest }: InputProps) {
  const [isHidden, setIsHidden] = useState<boolean | undefined>(itsPassword);

  return (
    <div className={styles.input}>
      <p>{label}</p>
      <input type={isHidden ? 'password' : ''} {...rest} />
      <span>{itsIconEmail && <MdEmail size={20} />} </span>
      <span>{itsIconUser && <FaUserAlt size={20} />} </span>
      {itsPassword && (
        <button onClick={() => setIsHidden(!isHidden)} type="button">
          {isHidden ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
        </button>
      )}
    </div>
  );
}
