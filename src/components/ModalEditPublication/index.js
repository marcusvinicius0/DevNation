import { useContext } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';

export default function ModalEditProfileBanner() {
  const { user, setUser } = useContext(AuthContext);

  async function handleDelete(item) {
    await firebase
      .firestore()
      .collection('users')
      .doc(item)
      .delete()
      .then(() => {
        const data = {
          ...user,
        };
        // toast.success("Publicação excluída com sucesso!");
        setUser(data);
      })
      .catch((err) => {
        toast.error('Oops, algo deu errado. Tente novamente mais tarde.');
        console.log(err);
        setUser(null);
        return null;
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.box} value={user.publication} onClick={() => handleDelete()}>
        <AiFillDelete size={25} color="var(--soft-gray)" />
        <p>Excluir publicação</p>
      </div>
    </div>
  );
}
