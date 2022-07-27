import { useState } from 'react';
import styles from './styles.module.scss';

import Header from '../../components/Header';
import ChatModal from '../../components/ChatModal';
import ModalReportBug from '../../components/ModalReportBug';
import ModalShareIdeas from '../../components/ModalShareIdeas';

import { FcIdea } from 'react-icons/fc';
import { AiFillBug } from 'react-icons/ai';

export default function Suggestions() {
   const [modalReport, setModalReport] = useState(false);
   const [modalShareIdeas, setModalShareIdeas] = useState(false);

   function toggleModalReportBug() {
      setModalReport(!modalReport);
   }

   function toggleModalShareIdeas(){
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

         {modalReport && (
            <ModalReportBug
               close={toggleModalReportBug}
            />
         )}

         {modalShareIdeas && (
            <ModalShareIdeas
            close={toggleModalShareIdeas}
            />
         )}

         <ChatModal />
      </>
   )
}