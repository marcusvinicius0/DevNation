import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import styles from './styles.module.scss';

<<<<<<< HEAD
=======
import { AuthContext } from '../../contexts/user';
>>>>>>> c28e85e7310a8baa59a6901e23674d257c3f5c2e

interface CloseModalProps {
  close: () => void;
}

export default function ModalEditPublication({ close }: CloseModalProps) {
  // const { user } = useContext(AuthContext);

  // async function handleDelete() { }

  return (
    <div className={styles.container}>
      <div className={styles.box} onClick={() => close()}>
        <AiFillDelete size={25} color="var(--soft-gray)" />
        <p>Excluir publicação</p>
      </div>
    </div>
  );
}
