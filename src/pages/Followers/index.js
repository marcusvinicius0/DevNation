import { useContext, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

import avatar from '../../assets/avatar.png';
import ChatModal from '../../components/ChatModal';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/user';

export default function Followers() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const goTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    goTop();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <span className={styles.header}>
          <h1>Meus seguidores</h1>
          <FaUsers size={30} color="var(--soft-gray)" />
        </span>
        <hr />

        <div className={styles.box}>
          <Link to="/profile">
            <span>
              <img alt="avatar url" src={user.avatarUrl === null ? avatar : user.avatarUrl} />
              <span className={styles.userInformation}>
                <p>{user.name}</p>
                <p className={styles.role}>{user.role}</p>
                <p className={styles.location}>{user.location}</p>
              </span>
            </span>
          </Link>

          <Link to="/profile">
            <span>
              <img alt="avatar url" src={user.avatarUrl === null ? avatar : user.avatarUrl} />
              <span className={styles.userInformation}>
                <p>{user.name}</p>
                <p className={styles.role}>{user.role}</p>
                <p className={styles.location}>{user.location}</p>
              </span>
            </span>
          </Link>

          <Link to="/profile">
            <span>
              <img alt="avatar url" src={user.avatarUrl === null ? avatar : user.avatarUrl} />
              <span className={styles.userInformation}>
                <p>{user.name}</p>
                <p className={styles.role}>{user.role}</p>
                <p className={styles.location}>{user.location}</p>
              </span>
            </span>
          </Link>

          <Link to="/profile">
            <span>
              <img alt="avatar url" src={user.avatarUrl === null ? avatar : user.avatarUrl} />
              <span className={styles.userInformation}>
                <p>{user.name}</p>
                <p className={styles.role}>{user.role}</p>
                <p className={styles.location}>{user.location}</p>
              </span>
            </span>
          </Link>

          <Link to="/profile">
            <span>
              <img alt="avatar url" src={user.avatarUrl === null ? avatar : user.avatarUrl} />
              <span className={styles.userInformation}>
                <p>{user.name}</p>
                <p className={styles.role}>{user.role}</p>
                <p className={styles.location}>{user.location}</p>
              </span>
            </span>
          </Link>

          <Link to="/profile">
            <span>
              <img alt="avatar url" src={user.avatarUrl === null ? avatar : user.avatarUrl} />
              <span className={styles.userInformation}>
                <p>{user.name}</p>
                <p className={styles.role}>{user.role}</p>
                <p className={styles.location}>{user.location}</p>
              </span>
            </span>
          </Link>

          <Link to="/profile">
            <span>
              <img alt="avatar url" src={user.avatarUrl === null ? avatar : user.avatarUrl} />
              <span className={styles.userInformation}>
                <p>{user.name}</p>
                <p className={styles.role}>{user.role}</p>
                <p className={styles.location}>{user.location}</p>
              </span>
            </span>
          </Link>

          <Link to="/profile">
            <span>
              <img alt="avatar url" src={user.avatarUrl === null ? avatar : user.avatarUrl} />
              <span className={styles.userInformation}>
                <p>{user.name}</p>
                <p className={styles.role}>{user.role}</p>
                <p className={styles.location}>{user.location}</p>
              </span>
            </span>
          </Link>

          <Link to="/profile">
            <span>
              <img alt="avatar url" src={user.avatarUrl === null ? avatar : user.avatarUrl} />
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
  );
}
