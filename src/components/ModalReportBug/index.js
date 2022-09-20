import { useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

import { AuthContext } from '../../contexts/auth';

export default function ModalReportBug({ close }) {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');

  async function handleSave(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalBox}>
        <header className={styles.header}>
          <h1>Relatar erros</h1>
          <button onClick={close}>
            <FiX />
          </button>
        </header>
        <hr />

        <form onSubmit={handleSave}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite os erros/bugs que você encontrou."
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
