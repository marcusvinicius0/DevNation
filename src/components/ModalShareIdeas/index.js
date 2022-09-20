import { useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

import { AuthContext } from '../../contexts/auth';

export default function ModalShareIdeas({ close }) {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');

  async function handleSave(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalBox}>
        <div className={styles.header}>
          <h1>Compartilhe suas ideias</h1>
          <button onClick={close}>
            <FiX size={22} />
          </button>
        </div>
        <hr />

        <form onSubmit={handleSave}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nos conte suas ideias!"
          />

          {text === '' ? (
            <button className={styles.buttonOff} type="submit" disabled>
              Enviar
            </button>
          ) : (
            <button type="submit">Enviar</button>
          )}
        </form>
      </div>
    </div>
  );
}
