import { useState, useContext, useEffect } from 'react';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import firebase from 'firebase';

import avatar from '../../assets/avatar.png';

import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export default function PublicModal({ close }) {
   const [text, setText] = useState([]);
   const { user } = useContext(AuthContext);

   async function handleSave(e) {
      e.preventDefault();
      await firebase.firestore().collection('publications')
					.add({
						publication: text,
						user_id: user.uid,
						created: new Date()
					})
         .then(() => {
            setText('');
            toast.success("Publicação feita com sucesso!")
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
                  {text === '' ? (
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