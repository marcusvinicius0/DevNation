import { useState, useContext } from 'react';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';
import { BiWorld, BiCaretDown } from 'react-icons/bi'
import { FaBriefcase, FaChartBar } from 'react-icons/fa'
import { AiFillPicture } from 'react-icons/ai'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'

import firebase from 'firebase/app';

import avatar from '../../assets/avatar.png';

import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import { usePublications } from '../../hooks/usePublications';

export default function PublicModal({ close }) {
	const [text, setText] = useState("");
	const [imagePublication, setImagePublication] = useState(null);
	const [imagePublicationUrl, setImagePublicationUrl] = useState(null);
	const { user } = useContext(AuthContext);
	const { loadPublications, handleCreatePublication } = usePublications();
	const [loading, setLoading] = useState(false);
  

	
	async function handleSave(e) {
		e.preventDefault();
		setLoading(true);
		if (imagePublication) {
			await firebase.storage().ref(`images/${user.uid}/${imagePublication.name}`)
				.put(imagePublication)
				.then(async () => {
					await firebase.storage().ref(`images/${user.uid}`)
						.child(`${imagePublication.name}`).getDownloadURL()
						.then(async (url) => {
							let urlFoto = url
							let textVerified = (text.replaceAll("  ", "")).replaceAll("\n\n\n", "")
							await handleCreatePublication({ publication: textVerified, user: user, image_publication_url: urlFoto }).then(() => {
								toast.success('Publicação feita com sucesso.');
								setText("");
								setLoading(false);
								setImagePublication(null);
								setImagePublicationUrl(null);
								close();
								console.log(text);
							}).catch((err) => {
								console.log(err)
								setLoading(false);
							});
						})
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
					toast.error('Ops, algo deu errado.');
				})
		} else {
			await handleCreatePublication({ publication: text, user: user, image_publication_url: null }).then((res) => {
				console.log(res)
				toast.success('Publicação feita com sucesso.');
				setText("");
				setLoading(false);
				setImagePublication(null);
				setImagePublicationUrl(null);
				close();
			});
		}
	}

	function coming() {
		toast.warning("Em breve...")
	}

	function handleFile(e) {
		if (e.target.files[0]) {
			const image = e.target.files[0]
			if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg' || image.type === 'image/gif') {
				setImagePublication(image)
				setImagePublicationUrl(URL.createObjectURL(image))
			} else {
				toast.warning('Envie uma imagem do tipo JPG, JPEG, GIF ou PNG.');
				setImagePublication(null);
				return null;
			}
		}
	}

	function resetFile() {
		setImagePublication(null)
		setImagePublicationUrl(null)
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
					<textarea placeholder="No que você está pensando?" value={text} onChange={(e) => setText(e.target.value)} />
					{imagePublicationUrl && (
						<div className={styles.containerImageFile}>
							<img src={imagePublicationUrl} alt="Foto publicação" />
							<button onClick={resetFile}><FiX /></button>
						</div>
					)}
					<div className={styles.formActions}>
						<div className={styles.tools}>
							<div className={styles.inputFile}>
								<input type="file" onChange={handleFile} />
								<AiFillPicture size={20} />
							</div>
							<button type="button" onClick={coming}><FaChartBar size={20} /></button>
							<button type="button" onClick={coming}><FaBriefcase size={20} /></button>
							<button type="button" onClick={coming}><IoEllipsisHorizontalSharp size={20} /></button>
						</div>
						{loading ? 
						<button /> : ""}

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