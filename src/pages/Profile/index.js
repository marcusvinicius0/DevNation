import { useState, useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import firebase from 'firebase/app';

import Header from '../../components/Header';

import EditProfileModal from '../../components/EditProfileModal';
import EditProfilePictureModal from '../../components/EditProfilePictureModal';
import ModalEditProfileBanner from '../../components/ModalEditProfileBanner';
import NewsBox from '../../components/NewsBox';
import ChatModal from '../../components/ChatModal';
import ProjectsProfile from '../../components/ProjectsProfile';
import Stacks from '../../components/Stacks';

import avatar from '../../assets/avatar.png';
import banner from '../../assets/banner.png';
import ghLogo from '../../assets/github.png';
import inLogo from '../../assets/linkedin.png';

import { AuthContext } from '../../contexts/auth';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { RiPencilLine } from 'react-icons/ri';

export default function Profile() {
	const { user } = useContext(AuthContext);

	const [editProfileModal, setEditProfileModal] = useState(false);
	const [profilePictureModal, setprofilePictureModal] = useState(false);
	const [modalProfileBanner, setModalProfileBanner] = useState(false);
	const [publicationsProfile, setPublicationsProfile] = useState([])

	useEffect(() => {
		async function loadPosts() {
			await firebase.firestore().collection('publications')
				.orderBy('created', 'desc')
				.get()
				.then((snapshot) => {
					let arrayPublications = [];

					snapshot.forEach((doc) => {
						if (doc.data().user_id === user.uid) {
							let data = {
								publication: doc.data().publication,
								created: doc.data().created,
								user_id: user.uid,
								id: doc.id
							}
							arrayPublications.push(data)
						}
					})
					setPublicationsProfile(arrayPublications)
				})
		}
		loadPosts()
	}, [])

	function toggleEditProfileModal() {
		setEditProfileModal(!editProfileModal)
		console.log('teste')
	}

	function toggleProfilePictureModal() {
		setprofilePictureModal(!profilePictureModal)
	}

	function toggleModalProfileBanner() {
		setModalProfileBanner(!modalProfileBanner)
	}

	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className={styles.profileContainer}>
					<div className={styles.contentProfile}>
						<div className={styles.picturesBox}>
							<img className={styles.banner} src={user.bannerUrl === null ? banner : user.bannerUrl} alt="banner" />
							<img onClick={toggleProfilePictureModal} className={styles.profilePic} src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto de perfil" />

							<button className={styles.editBanner} onClick={toggleModalProfileBanner}>
								<RiPencilLine size={25} color="var(--black)" />
							</button>
						</div>

						<div className={styles.infoProfile}>
							<div className={styles.infoBox}>
								<button className={styles.editInfoProfile} onClick={toggleEditProfileModal}>
									<RiPencilLine size={25} color="var(--black)" />
								</button>
								<p className={styles.name}>{user.name}</p>
								<p className={styles.role}>{user.role}</p>
								<p className={styles.place}>{user.location}</p>
							</div>

							<div className={styles.socialMedias}>
								<a href={user.linkedin} rel="noreferrer" target="_blank">
									<img src={inLogo} alt="linkedin" width={30} height={30} />
								</a>

								<a href={user.github} rel="noreferrer" target="_blank">
									<img src={ghLogo} alt="github" width={30} height={30} />
								</a>
							</div>
						</div>
					</div>
					<div className={styles.aboutMe}>
						<h1>Sobre mim</h1>
						{user.aboutMe === '' ? (
							<p>Sem informações.</p>
						) : (
							<p>{user.aboutMe}</p>
						)}
					</div>
					<ProjectsProfile user_id={user.uid} />
					<Stacks />
					<div className={styles.posts}>
						<h3>Minhas publicações</h3>
						{publicationsProfile.map((publication) => (
							<div key={publication.id} className={styles.post}>
								<header>
									<img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Avatar foto" />
									<div>
										<span>{user.name}</span>
										<p>{user.role}</p>
										<time>{format(new Date(publication.created.seconds * 1000), "EEEE ' • 'd' de 'MMMM' • 'k'h'mm'", {
											locale: ptBR
										})}</time>
									</div>
								</header>
								<div className={styles.contentPost}>
									<p>{publication.publication}</p>
								</div>
							</div>
						))}
						{publicationsProfile.length === 0 && (
							<p>Sem publicações.</p>
						)}
					</div>
				</div>
				<NewsBox />
			</div>

			{editProfileModal && (
				<EditProfileModal
					close={toggleEditProfileModal}
				/>
			)}

			{profilePictureModal && (
				<EditProfilePictureModal
					close={toggleProfilePictureModal}
				/>
			)}

			{modalProfileBanner && (
				<ModalEditProfileBanner
					close={toggleModalProfileBanner}
				/>
			)}
			<ChatModal />
		</>
	)
}