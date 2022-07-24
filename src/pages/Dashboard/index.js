import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import PublicModal from '../../components/PublicationModal';
import NewsBox from '../../components/NewsBox';
import ChatModal from '../../components/ChatModal';
import ModalEditPublication from '../../components/ModalEditPublication';
import JoinDiscord from '../../components/JoinDiscord'

import logo from '../../assets/logo.png';

import { AiFillPicture } from 'react-icons/ai';
import { FiVideo } from 'react-icons/fi';

import avatar from '../../assets/avatar.png';

import { AuthContext } from '../../contexts/auth';
import Feed from '../../components/Feed';
import Sidebox from '../../components/Sidebox';

export default function Dashboard() {
   const { user } = useContext(AuthContext);
   const [showPostModal, setShowPostModal] = useState(false);
   const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
   const [editPublication, setEditPublication] = useState(false);


   function toggleEditPublication() {
      setEditPublication(!editPublication)
   };

   function togglePostModal() {
      setShowPostModal(!showPostModal)
   };

   return (
      <>
         <Header />
         <div className={styles.dashboard}>
            <div className={styles.containerTeste}>
					<Sidebox />
            </div>

            <div className={styles.mainFeedContainer}>
               <div className={styles.createPublicationContainer}>
                  <div className={styles.contentBox}>
                     {avatarUrl === null ? <img src={avatar} alt="user-profile" /> : <img src={avatarUrl} alt="user-profile" />}
                     <div
                        className={styles.publication}
                        onClick={() => togglePostModal()}

                     >
                        <p>No que você está pensando?</p>
                     </div>
                  </div>
                  <div className={styles.contentActions}>
							<button onClick={() => togglePostModal()}>
								<AiFillPicture size={22} color="var(--soft-blue)"/>
								<span>Foto</span>
							</button>
							<button onClick={() => togglePostModal()}>
								<FiVideo size={22} color="var(--soft-blue)"/>
								<span>Vídeo</span>
							</button>
							<button onClick={() => togglePostModal()}>
								<AiFillPicture size={22} color="var(--soft-blue)"/>
								<span>Projeto</span>
							</button>
							<button onClick={() => togglePostModal()}>
								<AiFillPicture size={22} color="var(--soft-blue)" />
								<span>Repositório</span>
							</button>
                  </div>
               </div>

               <hr />

               <Feed />
            </div>

            <div className={styles.newsAndAdversiting}>
					<NewsBox />
					<JoinDiscord />
					<footer>
                  <Link to="/dashboard">Sobre o projeto</Link>
                  <Link to="/contributors">Contribuidores</Link>
                  <span>
                     <img src={logo} alt="logo" width={100} height={40} />
                     <p>DevSocial Corporation © 2022</p>
                  </span>
               </footer>
				</div>
            <ChatModal />

            {showPostModal && (
               <PublicModal
                  close={togglePostModal}
               />
            )}

            {editPublication && (
               <ModalEditPublication
                  close={toggleEditPublication}
               />
            )}
         </div>
      </>
   )
}