import { useEffect, useState } from 'react';
import { AiFillBug } from 'react-icons/ai';
import { FcIdea } from 'react-icons/fc';
import styles from './styles.module.scss';

import ChatModal from '../../components/ChatModal';
import Header from '../../components/Header';
import ModalReportBug from '../../components/ModalReportBug';
import ModalShareIdeas from '../../components/ModalShareIdeas';

export default function Suggestions() {
  const [modalReport, setModalReport] = useState(false);
  const [modalShareIdeas, setModalShareIdeas] = useState(false);

  useEffect(() => {
    const goTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    goTop();
  }, []);

  function toggleModalReportBug() {
    setModalReport(!modalReport);
  }

  function toggleModalShareIdeas() {
    setModalShareIdeas(!modalShareIdeas);
  }

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.titleBox}>
          <h1>Nos ajude a melhorar sua experiência!</h1>
          <p>Dê feedbacks, sugestões, críticas construtivas que estaremos avaliando todas!</p>
        </div>

        <div className={styles.buttonsBox}>
          <button onClick={toggleModalShareIdeas}>
            <FcIdea size={20} className={styles.ideaIcon} />
            <span>Compartilhe uma ideia</span>
          </button>

          <button onClick={toggleModalReportBug}>
            <AiFillBug size={20} className={styles.bugIcon} />
            <span>Relate erros/bugs</span>
          </button>
        </div>
      </div>

      {modalReport && <ModalReportBug close={toggleModalReportBug} />}

      {modalShareIdeas && <ModalShareIdeas close={toggleModalShareIdeas} />}

      <ChatModal />
    </>
  );
}
