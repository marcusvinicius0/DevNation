/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

import { RiPencilLine } from 'react-icons/ri';
import { allStacks } from './stacks';

import ModalStacks from '../ModalStacks';
import styles from './styles.module.scss';

interface StacksComponentProps {
  userId: string;
  stateButton: boolean;
  isAdmin?: boolean;
}

interface DefaultStacksComponentProps {
  userId: string;
  stateButton: boolean;
  isAdmin: null;
}

export interface Stack {
  stack: string;
  icon: any;
  color: string;
}

// eslint-disable-next-line
export default function Stacks({ userId, stateButton, isAdmin }: StacksComponentProps | DefaultStacksComponentProps) {
  const [stacks, setStacks] = useState<Stack[] | []>([]);
  const [modalStacksIsActive, setModalStacksIsActive] = useState(false);

  async function loadStacks() {
    console.log("Cheguei aqui")
  }

  useEffect(() => {
    setStacks([]);
    loadStacks();
  }, [userId]);

  return (
    <div className={styles.containerStacks}>
      <header>
        <h1>Minhas stacks</h1>
        {isAdmin && (
          <button onClick={() => setModalStacksIsActive(true)}>
            <RiPencilLine />
            <span> Editar stacks</span>
          </button>
        )}
      </header>
      {stacks.length > 0 ? (
        <div className={styles.allStacks}>
          {stacks.map((stack, index) => (
            <div className={styles.stack} key={index} style={{ background: stack.color }}>
              {stack.icon}
              <span>{stack.stack}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>Sem stacks.</p>
      )}

      {modalStacksIsActive === true && (
        <ModalStacks
          handleCloseModal={() => setModalStacksIsActive(false)}
          allStacks={allStacks}
          reloadStacks={loadStacks}
        />
      )}
    </div>
  );
}
