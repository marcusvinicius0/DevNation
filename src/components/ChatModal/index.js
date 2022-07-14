import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import avatar from '../../assets/avatar.png';

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

import { AuthContext } from '../../contexts/auth';

export default function ChatModal() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const { user } = useContext(AuthContext);

    return (
        <div className={isChatOpen ? styles.chatOn : styles.container}>

            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
            <div className={styles.text}>Mensagens</div>
            <span onClick={() => setIsChatOpen(!isChatOpen)}>
                {isChatOpen ? <MdKeyboardArrowDown size={25} color="var(--black)" />
                    :
                    <MdKeyboardArrowUp size={25} color="var(--black)" />
                }
            </span>

        </div>
    )
}
