import { useState, useContext } from 'react';
import styles from './styles.module.scss';

import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';

import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

import { FiSearch, FiX } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { BsFillChatDotsFill, BsFillGearFill, BsBellFill } from 'react-icons/bs';
import { BiMenuAltRight } from 'react-icons/bi';

export default function Header() {
    const { user } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className={styles.header}>

            <Link to="/dashboard">
                <img className={styles.logo} src={logo} alt="logo" />
            </Link>

            <FiSearch className={styles.searchIcon} size={20} />
            <input type="text" placeholder="Pesquisar..." />

            <nav className={showMenu ? styles.menuOn : styles.navegation}>
                <ul>
                    <li>
                        <Link to="/dashboard">
                            <AiFillHome className={styles.homeIcon} size={20} />
                            Início
                        </Link>
                    </li>

                    <li>
                        <Link to="/followers">
                            <FaUsers className={styles.usersIcon} size={20} />
                            Seguidores
                        </Link>
                    </li>

                    <li>
                        <Link to="/">
                            <BsFillChatDotsFill className={styles.chatIcon} size={20} />
                            Mensagens
                        </Link>
                    </li>

                    <li>
                        <Link to="/">
                            <BsFillGearFill className={styles.configIcon}
                                size={20} />
                            Configurações
                        </Link>
                    </li>
                </ul>
            </nav>

            <span className={styles.menuHamb} onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? <FiX size={35} color="var(--red-900)" />
                    :
                    <BiMenuAltRight size={35} color="var(--red-900)" />
                }
            </span>

            <div className={styles.pictureBox}>
                <BsBellFill size={23} color="var(--soft-gray)" />
                <Link to="/profile">
                    {user.avatarUrl === null ? <img src={avatar} alt="usuario-perfil" /> : <img src={user.avatarUrl} alt="usuario-perfil" />}
                </Link>
            </div>

        </header>
    )
}
