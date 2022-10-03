import React, { useContext, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styles from './styles.module.scss';

import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/user';

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
