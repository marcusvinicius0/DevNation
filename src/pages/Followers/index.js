import { useContext } from 'react';
import styles from './styles.module.scss';

import ChatModal from '../../components/ChatModal';

import { Link } from 'react-router-dom';

import { FaUsers } from 'react-icons/fa';

import avatar from '../../assets/avatar.png';

import { AuthContext } from '../../contexts/auth';

export default function Followers() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <div className={styles.container}>

                <span className={styles.header}>
                    <h1>Meus seguidores</h1>
                    <FaUsers size={30} color="var(--soft-gray)" />
                </span>
                <hr />

                <div className={styles.box}>
                    <Link to="/profile">
                        <span>
                            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
                            <span className={styles.userInformation}>
                                <p>{user.name}</p>
                                <p className={styles.role}>{user.role}</p>
                                <p className={styles.location}>{user.location}</p>
                            </span>
                        </span>
                    </Link>

                    <Link to="/profile">
                        <span>
                            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
                            <span className={styles.userInformation}>
                                <p>{user.name}</p>
                                <p className={styles.role}>{user.role}</p>
                                <p className={styles.location}>{user.location}</p>
                            </span>
                        </span>
                    </Link>

                    <Link to="/profile">
                        <span>
                            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
                            <span className={styles.userInformation}>
                                <p>{user.name}</p>
                                <p className={styles.role}>{user.role}</p>
                                <p className={styles.location}>{user.location}</p>
                            </span>
                        </span>
                    </Link>

                    <Link to="/profile">
                        <span>
                            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
                            <span className={styles.userInformation}>
                                <p>{user.name}</p>
                                <p className={styles.role}>{user.role}</p>
                                <p className={styles.location}>{user.location}</p>
                            </span>
                        </span>
                    </Link>

                    <Link to="/profile">
                        <span>
                            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
                            <span className={styles.userInformation}>
                                <p>{user.name}</p>
                                <p className={styles.role}>{user.role}</p>
                                <p className={styles.location}>{user.location}</p>
                            </span>
                        </span>
                    </Link>

                    <Link to="/profile">
                        <span>
                            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
                            <span className={styles.userInformation}>
                                <p>{user.name}</p>
                                <p className={styles.role}>{user.role}</p>
                                <p className={styles.location}>{user.location}</p>
                            </span>
                        </span>
                    </Link>

                    <Link to="/profile">
                        <span>
                            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
                            <span className={styles.userInformation}>
                                <p>{user.name}</p>
                                <p className={styles.role}>{user.role}</p>
                                <p className={styles.location}>{user.location}</p>
                            </span>
                        </span>
                    </Link>

                    <Link to="/profile">
                        <span>
                            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
                            <span className={styles.userInformation}>
                                <p>{user.name}</p>
                                <p className={styles.role}>{user.role}</p>
                                <p className={styles.location}>{user.location}</p>
                            </span>
                        </span>
                    </Link>

                    <Link to="/profile">
                        <span>
                            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
                            <span className={styles.userInformation}>
                                <p>{user.name}</p>
                                <p className={styles.role}>{user.role}</p>
                                <p className={styles.location}>{user.location}</p>
                            </span>
                        </span>
                    </Link>

                  

                </div>
            </div>
            
            <ChatModal />

        </>

    )
}