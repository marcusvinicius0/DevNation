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
   const { user, users } = useContext(AuthContext);

   const [searchBarBox, setSearchBarBox] = useState(false);
   const [text, setText] = useState('');
   const [showMenu, setShowMenu] = useState(false);
   const [userFilters, setUserFilters] = useState([]);

   function usersFilter(value) {

      let filterUsers = []

      users.forEach((item) => {
         if (String(item.name).toLowerCase().includes(value.toLowerCase())) {
            filterUsers.push(item)
            setUserFilters(filterUsers)

         }
      })

   }

   function hiddingContent() {

      if (searchBarBox !== false) {
         return (
            <ul>
               {userFilters.map(item => (
                  <Link onClick={() => { }} to={`/users/${item.id}`} key={item.id}> <FiSearch /> {item.name} <img src={item.avatarUrl} /> </Link>
               ))}
               {text !==  "" ?
                <Link className="linkToSeeMoreResults" to="/">Ver mais resultados</Link>
                :
                ""
               }
              
            </ul>
         )
      } else {
         return (
            ""
         )
      }
   }


   function searchValue(e) { //alterando valor do input
      setText(e.target.value)
      usersFilter(e.target.value)
   }

   return (

      <>
         <header className={styles.header}>

            <Link to="/dashboard">
               <img className={styles.logo} src={logo} alt="logo" />
            </Link>

            <FiSearch className={styles.searchIcon} size={20} />
            <input
               type="text"
               placeholder="Pesquisar..."
               value={text}
               onChange={(e) => searchValue(e)}
               onClick={() => setSearchBarBox(!searchBarBox)}
            />

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
                     <Link to="/message">
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

            <div onMouseLeave={() => setSearchBarBox(!searchBarBox)} className={searchBarBox || text !== "" ? styles.searchBox : styles.searchBoxOff}>
               {hiddingContent()}
            </div>
         </header>
      </>

   )
}
