import React, { ChangeEvent, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import { BsBellFill, BsBriefcaseFill, BsFillChatDotsFill, BsFillGearFill } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { FiSearch, FiX } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';

import { toast } from 'react-toastify';
import avatarCompany from '../../assets/avatar-company.png';
import avatar from '../../assets/avatar.png';

import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';
import styles from './styles.module.scss';

import { UserSignedProps } from '../../contexts/types';

export default function Header() {
  const { user, users } = useContext(AuthContext);
  const { pathname } = useLocation();

  const [searchBarBox, setSearchBarBox] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [userFilters, setUserFilters] = useState<UserSignedProps[] | []>([]);

  function usersFilter(value: string) {
    const filterUsers: UserSignedProps[] = [];

    users.forEach((item: UserSignedProps) => {
      if (String(item.name).toLowerCase().includes(value.toLowerCase())) {
        filterUsers.push(item);
        setUserFilters(filterUsers);
        console.log(item);
      }
    });
  }

  function hiddingContent() {
    if (searchBarBox !== false) {
      return (
        <ul>
          {userFilters?.map((item: UserSignedProps) => (
            <Link onClick={() => {}} to={`/user/${item.id}`} key={item.id}>
              <FiSearch size={20} />
              {item.imageUserUrl ? (
                <img src={item.imageUserUrl} alt="usuario-perfil" />
              ) : (
                <img src={user?.isUser ? avatar : avatarCompany} alt="usuario-perfil" />
              )}
              <div>
                <span>
                  <p>{item.name}</p>
                  {item.isVerified && <MdVerified />}
                </span>
                <p className={styles.role}>{item.role}</p>
              </div>
            </Link>
          ))}
          {text !== '' ? (
            <Link className="linkToSeeMoreResults" to="/">
              Ver mais resultados
            </Link>
          ) : (
            ''
          )}
        </ul>
      );
    }
    return '';
  }

  function searchValue(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    usersFilter(e.target.value);
  }

  function handleSoon() {
    toast.warning('Em breve...');
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link className={styles.logoNavigation} to="/dashboard">
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>

        <div className={styles.inputSearchUsers}>
          <FiSearch className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={text}
            onChange={(e) => searchValue(e)}
            onClick={() => setSearchBarBox(!searchBarBox)}
          />
          <div
            onMouseLeave={() => setSearchBarBox(!searchBarBox)}
            className={searchBarBox || text !== '' ? styles.searchBox : styles.searchBoxOff}
          >
            {hiddingContent()}
          </div>
        </div>

        <nav className={showMenu ? styles.menuOn : styles.navegation}>
          <ul>
            <li className={pathname === '/dashboard' ? styles.active : ''}>
              <Link to="/dashboard">
                <AiFillHome size={20} />
                Início
              </Link>
            </li>
            <li className={pathname === '/followers' ? styles.active : ''}>
              <Link to="/" onClick={() => toast.warning('Em breve...')}>
                <FaUsers size={20} />
                Seguidores
              </Link>
            </li>
            <li className={pathname === '/opportunities' ? styles.active : ''}>
              <Link to="/opportunities">
                <BsBriefcaseFill size={20} />
                Vagas
              </Link>
            </li>
            <li className={pathname === '/message' ? styles.active : ''}>
              <Link to="/" onClick={() => toast.warning('Em breve...')}>
                <BsFillChatDotsFill size={20} />
                Mensagens
              </Link>
            </li>
            <li className={pathname === '/settings' ? styles.active : ''}>
              <Link to="/" onClick={() => toast.warning('Em breve...')}>
                <BsFillGearFill size={20} />
                Configurações
              </Link>
            </li>
            <li className={styles.aboutBox}>
              <Link to="/documentation">
                <AiFillInfoCircle size={20} />
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <span className={styles.menuHamb} onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? (
          <FiX size={35} color="rgb(0,0,0,0.7)" />
        ) : (
          <BiMenu size={35} color="rgb(0,0,0,0.7)" />
        )}
      </span>

      <div className={styles.pictureBox}>
        <BsBellFill onClick={handleSoon} size={23} color="var(--soft-gray)" />
        <Link to="/profile">
          {!user?.imageUserUrl ? (
            <img src={avatar} alt="usuario-perfil" />
          ) : (
            <img src={user?.imageUserUrl} alt="usuario-perfil" />
          )}
        </Link>
      </div>
    </header>
  );
}
