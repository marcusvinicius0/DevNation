import { useContext, useState, useEffect } from 'react';
import styles from './styles.module.scss';

import Header from '../../components/Header';

import PublicModal from '../../components/PublicationModal';
import NewsBox from '../../components/NewsBox';
import ChatModal from '../../components/ChatModal';
import ModalEditPublication from '../../components/ModalEditPublication';
import JoinDiscord from '../../components/JoinDiscord';
import Footer from '../../components/Footer';

import { AiFillPicture } from 'react-icons/ai';
import { FiVideo } from 'react-icons/fi';
import { BiBriefcase } from 'react-icons/bi'

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

   useEffect(() => {

      const goTop = () => { window.scrollTo({ top: 0, left: 0, behavior: 'auto'})};

      goTop();

   }, []);

   useEffect(() => {
    
      function loadToTop(){
         var posicao = localStorage.getItem('posicaoScroll');

         if (posicao) {
            /* Timeout necessário para funcionar no Chrome */
            setTimeout(function () {
               window.scrollTo(0, posicao);
            }, 1);      
         }
   
         window.onscroll = function (e) {
            posicao = window.scrollY;
            localStorage.setItem('posicaoScroll', JSON.stringify(posicao));
        }
      }

      loadToTop();

   }, []);

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
                        <AiFillPicture size={22} color="var(--soft-blue)" />
                        <span>Foto</span>
                     </button>
                     <button onClick={() => togglePostModal()}>
                        <FiVideo size={22} color="var(--soft-blue)" />
                        <span>Vídeo</span>
                     </button>
                     <button onClick={() => togglePostModal()}>
                        <AiFillPicture size={22} color="var(--soft-blue)" />
                        <span>Projeto</span>
                     </button>
                     <button onClick={() => togglePostModal()}>
                        <BiBriefcase size={22} color="var(--soft-blue)" />
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
               <Footer />
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