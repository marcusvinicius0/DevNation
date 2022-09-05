import React, { useContext } from 'react';
import styles from '../styles.module.scss';

import avatarCompany from '../../../assets/avatar-company.jpg';
import background from '../../../assets/banner.png';
import description from '../../../assets/description.png';
import noHasOpp from '../../../assets/noHasOpp.png';
import noHasPub from '../../../assets/noHasPub.png';

import { AiFillPicture, AiOutlineGithub } from 'react-icons/ai';
import { BiBriefcase } from 'react-icons/bi';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiVideo } from 'react-icons/fi';
import Header from '../../../components/Header';
import { AuthContext } from '../../../contexts/auth';

export default function AdminCompany() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          {user?.imageUserUrl ? (
            <img src={user?.imageUserUrl} alt="" />
          ) : (
            <img src={avatarCompany} alt="" />
          )}
          <h1>{user?.name}</h1>
          <span>Versão do super administrador</span>
          <button>Cadastrar vaga</button>
        </div>
        <div className={styles.warnings}>
          <header>
            <h1>Deixe sua empresa mais completa</h1>
            <p>Conclua essas etapas para se estabelecer melhor na rede.</p>
          </header>
          <div className={styles.cards}>
            <div className={styles.card}>
              <img src={description} alt="" />
              <div>
                <h2>Descrição</h2>
                <p>
                  Adicione sua descrição para que sua empresa seja encontrada em mais buscas e que
                  os devs a apreciem.
                </p>
                <button>Adicionar</button>
              </div>
            </div>
            <div className={styles.card}>
              <img src={description} alt="" />
              <div>
                <h2>Descrição</h2>
                <p>
                  Adicione sua descrição para que sua empresa seja encontrada em mais buscas e que
                  os devs a apreciem.
                </p>
                <button>Adicionar</button>
              </div>
            </div>
            <div className={styles.card}>
              <img src={description} alt="" />
              <div>
                <h2>Descrição</h2>
                <p>
                  Adicione sua descrição para que sua empresa seja encontrada em mais buscas e que
                  os devs a apreciem.
                </p>
                <button>Adicionar</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.banner}>
            <img src={background} alt="" />
            <button>
              <BsFillPencilFill />
            </button>
          </div>
          <div className={styles.containerInfos}>
            <img src={avatarCompany} alt="" />
            <div className={styles.infos}>
              <h1>{user?.name}</h1>
              <p>{user?.description}</p>
              <span>{user?.role}</span>
              <button>
                <BsFillPencilFill /> Editar página
              </button>
            </div>
          </div>
        </div>
        <div className={styles.postsAndOpportunities}>
          <div className={styles.posts}>
            <div className={styles.createPost}>
              <div className={styles.boxTextarea}>
                <img src={avatarCompany} alt="" />
                <textarea placeholder="Começar publicação" />
              </div>
              <div className={styles.contentActions}>
                <button>
                  <AiFillPicture size={22} color="var(--soft-blue)" />
                  <span>Foto</span>
                </button>
                <button>
                  <FiVideo size={22} color="var(--soft-blue)" />
                  <span>Vídeo</span>
                </button>
                <button>
                  <BiBriefcase size={22} color="var(--soft-blue)" />
                  <span>Projeto</span>
                </button>
                <button>
                  <AiOutlineGithub size={22} color="var(--soft-blue)" />
                  <span>Repositório</span>
                </button>
              </div>
            </div>
            <div className={styles.flexPosts}>
              <div className={styles.noHasPosts}>
                <img src={noHasPub} alt="" />
                <span>Você ainda não publicou nada.</span>
                <p>Interaja com seu público na DevNation.</p>
              </div>
            </div>
          </div>
          <div className={styles.opportunities}>
            <header>
              <h1>Minhas vagas</h1>
              <button>Cadastrar vaga</button>
            </header>
            <div className={styles.listOpportunities}>
              <div className={styles.noHasOpportunities}>
                <img src={noHasOpp} alt="" />
                <span>Você ainda não publicou nada.</span>
                <p>Interaja com seu público na DevNation.</p>
              </div>
              <div className={styles.opportunitie}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
