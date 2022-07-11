import { useContext } from 'react';
import styles from './styles.module.scss';

import avatar from '../../assets/avatar.png';

import { AiOutlineArrowUp } from 'react-icons/ai';

import { AuthContext } from '../../contexts/auth';

export default function ChatModal() {
    const { user } = useContext(AuthContext);

    return (
        <div className={styles.container}>
            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
            <p>Mensagens</p>
            <span>
                <AiOutlineArrowUp size={25} color="var(--soft-gray)" />
            </span>
        </div>
    )
}