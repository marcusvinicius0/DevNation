import React, { useContext } from 'react';
import styles from './styles.module.scss';

import avatarCompany from '../../assets/avatar-company.png';
import description from '../../assets/description.png';

import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';

export default function ProfileCompany() {
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
          <h1>Dev Social Network</h1>
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
      </div>
    </>
  );
}
