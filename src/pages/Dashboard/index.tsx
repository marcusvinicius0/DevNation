/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { AiFillPicture, AiOutlineGithub } from 'react-icons/ai';
import { BiBriefcase } from 'react-icons/bi';
import { FiVideo } from 'react-icons/fi';
import styles from './styles.module.scss';

import avatarCompany from '../../assets/avatar/avatar-company.jpg';
import avatar from '../../assets/avatar/avatar.png';
import ChatModal from '../../components/ChatModal';
import Feed from '../../components/Feed';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import JoinDiscord from '../../components/JoinDiscord';
import ModalEditPublication from '../../components/ModalEditPublication';
import NewsBox from '../../components/NewsBox';
import PublicModal from '../../components/PublicationModal';
import Sidebox from '../../components/Sidebox';
import { AuthContext } from '../../contexts/auth';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [showPostModal, setShowPostModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user && user?.imageUserUrl);
  const [editPublication, setEditPublication] = useState(false);

  function toggleEditPublication() {
    setEditPublication(!editPublication);
  }

  function togglePostModal() {
    setShowPostModal(!showPostModal);
  }

  useEffect(() => {
    const goTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    goTop();
  }, []);

  useEffect(() => {
    function loadToTop() {
      let posicao: any = localStorage.getItem('posicaoScroll');

      if (posicao) {
        /* Timeout necessário para funcionar no Chrome */
        setTimeout(() => {
          window.scrollTo(0, posicao);
        }, 1);
      }

      window.onscroll = function (e) {
        posicao = window.scrollY;
        localStorage.setItem('posicaoScroll', JSON.stringify(posicao));
      };
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
              {!user?.imageUserUrl ? (
                <img src={user?.isUser ? avatar : avatarCompany} alt="usuario-perfil" />
              ) : (
                <img src={user?.imageUserUrl} alt="usuario-perfil" />
              )}
              <div className={styles.publication} onClick={() => togglePostModal()}>
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
                <BiBriefcase size={22} color="var(--soft-blue)" />
                <span>Projeto</span>
              </button>
              <button onClick={() => togglePostModal()}>
                <AiOutlineGithub size={22} color="var(--soft-blue)" />
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

        {showPostModal && <PublicModal close={togglePostModal} />}

        {editPublication && <ModalEditPublication close={toggleEditPublication} />}
      </div>
    </>
  );
}
