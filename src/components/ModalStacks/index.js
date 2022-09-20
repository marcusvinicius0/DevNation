import { FiCheck, FiX } from 'react-icons/fi';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import styles from './styles.module.scss';

export default function ModalStacks({ handleCloseModal, allStacks, reloadStacks }) {
  const { user } = useContext(AuthContext);
  const [stacksAlreadyAdded, setStacksAlreadyAdded] = useState([]);

  async function loadStacksAlreadyAdded() {}

  useEffect(() => {
    loadStacksAlreadyAdded();
  }, []);

  async function handleAddStack(stack) {
    if (stacksAlreadyAdded.indexOf(stack) > -1) {
      const stacksFiltered = stacksAlreadyAdded.filter((item) => item !== stack);
      setStacksAlreadyAdded(stacksFiltered);
    } else {
      setStacksAlreadyAdded([...stacksAlreadyAdded, stack]);
    }
  }

  async function handleSaveStacks() {}

  return (
    <div className={styles.containerModal}>
      <div className={styles.contentModal}>
        <header>
          <h1>Editar stacks</h1>
          <button onClick={handleCloseModal}>
            <FiX />
          </button>
        </header>
        <div className={styles.selectStacks}>
          {allStacks.map((stack, index) => (
            <div className={styles.cardCheckStack} key={index}>
              <button
                className={stacksAlreadyAdded.indexOf(stack.stack) > -1 && styles.activeButton}
                onClick={() => handleAddStack(stack.stack)}
              >
                <FiCheck />
              </button>
              <i>{stack.icon}</i>
              <span>{stack.stack}</span>
            </div>
          ))}
        </div>
        <button className={styles.saveButton} onClick={handleSaveStacks}>
          Salvar
        </button>
      </div>
    </div>
  );
}
