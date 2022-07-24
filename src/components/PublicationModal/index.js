import { useState, useContext } from 'react';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';
import { BiWorld, BiCaretDown } from 'react-icons/bi'
import { FaBriefcase, FaChartBar } from 'react-icons/fa'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'

import firebase from 'firebase/app';

import avatar from '../../assets/avatar.png';

import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import { usePublications } from '../../hooks/usePublications';

export default function PublicModal({ close }) {
   const [text, setText] = useState("");
   const { user } = useContext(AuthContext);
	const { loadPublications } =  usePublications();

   async function handleSave(e) {
      e.preventDefault();
      await firebase.firestore().collection('publications')
					.add({
						publication: text,
						user_id: user.uid,
						created: new Date()
					})
         .then(() => {
            setText([]);
            toast.success("Publicação feita com sucesso!")
				 })
				loadPublications();
				close();
   }

	function coming() {
		toast.warning("Em breve...")
	}

   return (
      <div className={styles.container}>
         <div className={styles.containerModal}>
				<header>
					<h2>Criar publicação</h2>
					<button onClick={close} type="button">
						<FiX size={22} />
					</button>
				</header>
            <div className={styles.infoUser}>
               <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="profile-pic" />
               <div>
						<p className={styles.userName}>{user.name}</p>
						<button>
							<BiWorld />
							<span>Todos</span>
							<BiCaretDown />
						</button>
					</div>
            </div>
            <form onSubmit={handleSave}>
               <textarea placeholder="No que você está pensando?" value={text} onChange={(e) => setText(e.target.value)}/>
					<div className={styles.formActions}>
						<div className={styles.tools}>
							<button type="button" onClick={coming}><FaChartBar size={20} /></button>
							<button type="button" onClick={coming}><FaBriefcase size={20} /></button>
							<button type="button" onClick={coming}><IoEllipsisHorizontalSharp size={20} /></button>
						</div>
						{text === "" ? (
							<button type="submit" className={styles.buttonToHandlePublication} disabled>Publicar</button>
						) : (
							<button type="submit" className={styles.buttonToHandlePublication}>Publicar</button>
						)}
					</div>
            </form>
         </div>
      </div>
   )
}