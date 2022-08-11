import { useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';

export default function ModalShareIdeas({ close }) {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');

  async function handleSave(e) {
    e.preventDefault();

    await firebase
      .firestore()
      .collection('shareIdeas')
      .add({
        text,
        user_name: user.name,
        user_id: user.uid,
      })
      .then(() => {
        setText('');
        toast.success('Dados enviados com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Oops, algo deu errado, tente novamente mais tarde.');
        return null;
      });
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
