import React, { useContext } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { BsBookmarkFill } from 'react-icons/bs';
import { FaEnvelopeOpenText, FaUserCircle } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { MdLightbulb, MdNewReleases, MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import avatar from '../../assets/avatar.png';
import banner from '../../assets/banner.png';
import { AuthContext } from '../../contexts/auth';
import { UserSignedContext } from '../../contexts/signed';
import styles from './styles.module.scss';

export default function Sidebox() {
  const { signOut } = useContext(AuthContext);
  const { user } = useContext(UserSignedContext);

  //   const avatarUrl = user && user.imageUserUrl;

  return (
    <div className={styles.sideBox}>
      <div className={styles.bannerBox}>
        {!user?.bannerUserUrl ? (
          <img src={banner} alt="usuario-perfil" />
        ) : (
          <img src={user?.imageUserUrl} alt="usuario-perfil" />
        )}
      </div>
      <div className={styles.pictureBox}>
        <Link to={user?.isUser ? `/user/${user?.username}` : '/profile-company'}>
          {!user?.imageUserUrl ? (
            <img src={avatar} alt="usuario-perfil" />
          ) : (
            <img src={user?.imageUserUrl} alt="usuario-perfil" />
          )}
        </Link>
      </div>
      <span className={styles.userName}>
        <p>{user?.name}</p>
        {user?.isVerified && <MdVerified />}
      </span>
      <p className={styles.role}>{user?.role}</p>
      <hr />
      <div className={styles.routesBox}>
        <Link to={user?.isUser ? `/user/${user?.username}` : '/company/user'}>
          <span>
            <FaUserCircle color="var(--soft-blue)" size={24} />
            <p>{user?.isUser ? 'Meu perfil' : 'Minha empresa'}</p>
          </span>
        </Link>

        <Link to={user?.isUser ? '/myprojects' : 'myopportunities'}>
          <span>
            <FaEnvelopeOpenText color="var(--soft-blue)" size={22} />
            <p>{user?.isUser ? 'Meus projetos' : 'Minhas vagas'}</p>
          </span>
        </Link>

        <Link to="/repositories">
          <span>
            <AiFillGithub color="var(--soft-blue)" size={22} />
            <p>Encontrar repositórios</p>
          </span>
        </Link>

        <Link to="/" onClick={() => toast.warning('Em breve...')}>
          <span>
            <BsBookmarkFill color="var(--soft-blue)" size={22} />
            <p>Salvos</p>
          </span>
        </Link>

        <Link to="/suggestions">
          <span>
            <MdLightbulb color="var(--soft-blue)" size={22} />
            <p>Sugestões</p>
          </span>
        </Link>

        <Link to="/updates">
          <span>
            <MdNewReleases color="var(--soft-blue)" size={22} />
            <p>Atualizações</p>
          </span>
        </Link>

        <div className={styles.logoutBox} onClick={signOut}>
          <IoLogOut color="var(--soft-blue)" size={25} />
          <p>Sair</p>
        </div>
      </div>
    </div>
  );
}
