import React, { useContext, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styles from './styles.module.scss';

<<<<<<< HEAD
import avatar from '../../assets/avatar/avatar.png';
import { AuthContext } from '../../contexts/auth';
=======
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/user';
>>>>>>> c28e85e7310a8baa59a6901e23674d257c3f5c2e

export default function ChatModal() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  return (
    <div className={isChatOpen ? styles.chatOn : styles.container}>
      <img src={user?.imageUserUrl === null ? avatar : user?.imageUserUrl} alt="avatar url" />
      <div className={styles.text}>Mensagens</div>
      <span onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? (
          <MdKeyboardArrowDown size={25} color="var(--black)" />
        ) : (
          <MdKeyboardArrowUp size={25} color="var(--black)" />
        )}
      </span>
    </div>
  );
}
