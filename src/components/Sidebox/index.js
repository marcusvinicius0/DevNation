import { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

import banner from "../../assets/banner.png";

import { FaUserCircle, FaEnvelopeOpenText } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { BsBookmarkFill } from 'react-icons/bs';
import { MdVerified, MdLightbulb, MdNewReleases } from 'react-icons/md';
import { AiFillGithub } from 'react-icons/ai';

import avatar from "../../assets/avatar.png";
import { toast } from 'react-toastify';

import { AuthContext } from "../../contexts/auth";

export default function Sidebox() {
  const { signOut, user } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

  return (
    <div className={styles.sideBox}>
      <div className={styles.bannerBox}>
        <img
          src={user.bannerUrl === null ? banner : user.bannerUrl}
          alt="banner"
        />
      </div>
      <div className={styles.pictureBox}>
        <Link to="/profile">
          {avatarUrl === null ? (
            <img src={avatar} alt="foto avatar" />
          ) : (
            <img src={avatarUrl} alt="foto usuario" />
          )}
        </Link>
      </div>
      <span className={styles.userName}>
        <p>{user.name}</p>
        {user.isVerified && <MdVerified />}
      </span>
      <p className={styles.role}>{user.role}</p>
      <hr />
      <div className={styles.routesBox}>
        <Link to="/profile">
          <span>
            <FaUserCircle color="var(--soft-blue)" size={24} />
            <p>Meu perfil</p>
          </span>
        </Link>

        <Link to="/myprojects">
          <span>
            <FaEnvelopeOpenText color="var(--soft-blue)" size={22} />
            <p>Meus projetos</p>
          </span>
        </Link>

        <Link to="/repositories">
          <span>
            <AiFillGithub color="var(--soft-blue)" size={22} />
            <p>Encontrar repositórios</p>
          </span>
        </Link>

        <Link to="/" onClick={() => toast.warning("Em breve...")}>
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
