import { useState, useContext, useEffect } from 'react';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import firebase from 'firebase';

import avatar from '../../assets/avatar.png';

import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export default function PublicModal({ close }) {


   async function handleSave(e) {
      e.preventDefault();

         })
   }

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
            </span>
            <span>
               <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="profile-pic" />
               <p className={styles.userName}>{user.name}</p>
            </span>
            <form onSubmit={handleSave}>
               <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  wrap="hard"
                  placeholder="No que você está pensando?"
               />
               <span className={styles.publicationBox}>
                  {text === [] || text === "" ? (
                     <button className={styles.offButton}
                        disabled
                     >
                        Publicar
                     </button>
                  ) : (
                     <button type="submit">Publicar</button>
                  )}
               </span>
            </form>
         </div>
      </div>
   )
}