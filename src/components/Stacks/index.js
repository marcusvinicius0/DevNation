/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { RiPencilLine } from 'react-icons/ri';
import { allStacks } from './stacks.js';

import ModalStacks from '../ModalStacks';
import styles from './styles.module.scss';

export default function Stacks({ user_id, state_button }) {
  const [stacks, setStacks] = useState([]);
  const [modalStacksIsActive, setModalStacksIsActive] = useState(false);

  async function loadStacks() {}

  useEffect(() => {
    setStacks([]);
    loadStacks();
  }, [user_id]);

  return (
    <div className={styles.containerStacks}>
      <header>
        <h1>Minhas stacks</h1>
        {state_button && (
          <button onClick={() => setModalStacksIsActive(true)}>
            {stacks >= [0] ? (
              <>
                <RiPencilLine />
                <span> Editar stacks</span>
              </>
            ) : (
              <>
                <FiPlus />
                <span>Adicionar stacks</span>
              </>
            )}
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
