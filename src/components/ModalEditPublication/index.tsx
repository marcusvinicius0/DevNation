import React, { useContext } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import styles from './styles.module.scss';

import { AuthContext } from '../../contexts/auth';

interface ModalEditPublicationProps {
  close: () => void;
}

export default function ModalEditPublication({ close }: ModalEditPublicationProps) {
  const { user } = useContext(AuthContext);

  async function handleDelete() {}

  return (
    <div className={styles.container}>
      <div className={styles.box} onClick={() => close()}>
        <AiFillDelete size={25} color="var(--soft-gray)" />
        <p>Excluir publicação</p>
      </div>
    </div>
  );
}
