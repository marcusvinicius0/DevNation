import { useState, useContext } from 'react';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import avatar from '../../assets/avatar.png';

import { AuthContext } from '../../contexts/auth';

export default function PublicModal({ close }) {
   const [text, setText] = useState('');

   const { user } = useContext(AuthContext);

   return (
      <div className={styles.container}>
         <div className={styles.containerModal}>

            <span className={styles.buttonBox}>
               <button className={styles.closeButton} onClick={close}>
                  <FiX size={30} color="var(--soft-gray)" />
               </button>
            </span>

            <span>
               <p>Criar publicação</p>
               <hr />
            </span>

            <span>
               <img src={avatar} alt="profile-pic" />
               <p className={styles.userName}>{user.name}</p>
            </span>

            <textarea
               value={text}
               onChange={(event) => setText(event.target.value)}
               wrap="hard"
               placeholder="No que você está pensando?"
            />

            <span className={styles.publicationBox}>
               {text === '' ? (
                  <button className={styles.offButton}
                     disabled
                  >
                     Publicar
                  </button>
               ) : (
                  <button>Publicar</button>
               )}
            </span>

         </div>
      </div>
   )
}