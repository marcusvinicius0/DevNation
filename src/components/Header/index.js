import { useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';

import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';

import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

import { FiSearch, FiX } from 'react-icons/fi';
import { AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { BsFillChatDotsFill, BsFillGearFill, BsBellFill } from 'react-icons/bs';
import { BiMenu } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md'

import { toast} from 'react-toastify'

export default function Header(props) {
   const { user, users } = useContext(AuthContext);
   const { pathname } = useLocation()

   const [searchBarBox, setSearchBarBox] = useState(false);
   const [text, setText] = useState('');
   const [showMenu, setShowMenu] = useState(false);
   const [userFilters, setUserFilters] = useState([]);

   function handleSoon(){
      toast.warning("Em breve documentação...");
   }
   
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
                  <Link onClick={() => { }} to={`/user/${item.id}`} key={item.id}> 
							<FiSearch size={20} /> 
							{item.avatarUrl === null ? <img src={avatar} alt="usuario-perfil" /> : <img src={item.avatarUrl} alt="usuario-perfil" />}
							<div>
								<span>
                           <p>{item.name}</p>
                           {item.isVerified && <MdVerified />}
                        </span>
								<p className={styles.role}>{item.role}</p>
							</div>
						</Link>
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


   function searchValue(e) { 
      setText(e.target.value)
      usersFilter(e.target.value)
   }

   return (

      <>
         <header className={styles.header}>

            <Link to="/dashboard">
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
					<div onMouseLeave={() => setSearchBarBox(!searchBarBox)} className={searchBarBox || text !== "" ? styles.searchBox : styles.searchBoxOff}>
               	{hiddingContent()}
            	</div>
				</div>

            <nav className={showMenu ? styles.menuOn : styles.navegation}>
               <ul>
                  <li className={pathname === "/dashboard" ? styles.active : ""}>
                     <Link to="/dashboard">
                        <AiFillHome  size={20} />
                        Início
                     </Link>
                  </li>
                  <li className={pathname === "/followers" ? styles.active : ""}>
                     <Link to="/" onClick={() => toast.warning("Em breve...")}>
                        <FaUsers  size={20} />
                        Seguidores
                     </Link>
                  </li>
                  <li className={pathname === "/message" ? styles.active : ""}>
                     <Link to="/" onClick={() => toast.warning("Em breve...")}>
                        <BsFillChatDotsFill  size={20} />
                        Mensagens
                     </Link>
                  </li>
                  <li className={pathname === "/settings" ? styles.active : ""}>
                     <Link to="/" onClick={() => toast.warning("Em breve...")}>
                        <BsFillGearFill size={20} />
                        Configurações
                     </Link>
                  </li>
                  <li onClick={handleSoon} className={styles.aboutBox}>
                     <Link to="/dashboard">
                        <AiFillInfoCircle size={20} />
                        Sobre
                     </Link>
                  </li>
               </ul>
            </nav>

            <span className={styles.menuHamb} onClick={() => setShowMenu(!showMenu)}>
               {showMenu ? <FiX size={35} color="rgb(0,0,0,0.7)" />
                  :
                  <BiMenu size={35} color="rgb(0,0,0,0.7)" />
               }
            </span>

            <div className={styles.pictureBox}>
               <BsBellFill size={23} color="var(--soft-gray)" />
               <Link to="/profile">
                  {!user?.avatarUrl ? <img src={avatar} alt="usuario-perfil" /> : <img src={user?.avatarUrl} alt="usuario-perfil" />}
               </Link>
            </div>
         </header>
      </>

   )
}
