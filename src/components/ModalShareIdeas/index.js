import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import firebase from '../../services/firebaseConnection';

import { FiX } from 'react-icons/fi';

import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export default function ModalShareIdeas({close}) {
   const { user } = useContext(AuthContext);
   const [text, setText] = useState("");
   const [loading, setLoading] = useState(false);

   async function handleSave(e){
      e.preventDefault();
      setLoading(true);

      await firebase.firestore().collection('shareIdeas')
      .add({
         text: text,
         user_name: user.name,
         user_id: user.uid
      })
      .then(() => {
         setText("");
         toast.success("Dados enviados com sucesso!");
         setLoading(false);
      })
      .catch((error) => {
         console.log(error);
         toast.error("Oops, algo deu errado, tente novamente mais tarde.");
         setLoading(false);
         return null;
      })
   }

   return (
      <div className={styles.container}>
         <div className={styles.modalBox}>
            <div className={styles.header}>
               <h1>Compartilhe suas ideias</h1>
               <button onClick={close}>
                  <FiX size={22} />
               </button>
            </div>
            <hr />

            <form onSubmit={handleSave}>
               <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Nos conte suas ideias!"
               >
               </textarea>

               {text === "" ?
                  <button
                   className={styles.buttonOff} type="submit"
                   disabled
                   >
                     Enviar
                  </button>
                  :
                  <button type="submit">
                  Enviar
               </button>
               }
            </form>
         </div>
      </div>
   )
}