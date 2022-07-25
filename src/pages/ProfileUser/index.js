import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss';
import firebase from 'firebase/app';

import EditProfileModal from '../../components/EditProfileModal';
import EditProfilePictureModal from '../../components/EditProfilePictureModal';
import ModalEditProfileBanner from '../../components/ModalEditProfileBanner';
import NewsBox from '../../components/NewsBox';
import ChatModal from '../../components/ChatModal';
import ProjectsProfile from '../../components/ProjectsProfile';
import NotFoundUser from '../../components/NotFoundUser';

import avatar from '../../assets/avatar.png';
import banner from '../../assets/banner.png';
import ghLogo from '../../assets/github.png';
import inLogo from '../../assets/linkedin.png';

import { AuthContext } from '../../contexts/auth';

import { RiPencilLine } from 'react-icons/ri';

export default function ProfileUser() {
	const { user } = useContext(AuthContext);
	const { id } = useParams();

	const [editProfileModal, setEditProfileModal] = useState(false);
	const [profilePictureModal, setprofilePictureModal] = useState(false);
	const [modalProfileBanner, setModalProfileBanner] = useState(false);
	const [publicationsProfile, setPublicationsProfile] = useState([]);
	const [profileUser, setProfileUser] = useState(null)

	useEffect(() => {
		loadPosts()
		loadUser()
	}, [id])

	async function loadUser() {
		await firebase.firestore().collection('users')
			.doc(id)
			.get()
			.then((snapshot) => {
				if (snapshot.data()) {
					let data = {
						aboutMe: snapshot.data().aboutMe,
						avatarUrl: snapshot.data().avatarUrl,
						bannerUrl: snapshot.data().bannerUrl,
						email: snapshot.data().email,
						location: snapshot.data().location,
						name: snapshot.data().name,
						id: snapshot.data().uid,
						role: snapshot.data().role,
						linkedin: snapshot.data().linkedin,
						github: snapshot.data().github,
					}
					setProfileUser(data)
				}
			})
	}

	async function loadPosts() {
		await firebase.firestore().collection('publications')
			.orderBy('created', 'desc')
			.get()
			.then((snapshot) => {
				let arrayPublications = [];

				snapshot.forEach((doc) => {
					if (doc.data().user_id === id) {
						let data = {
							publication: doc.data().publication,
							created: doc.data().created,
							user_id: id,
							id: doc.id
						}
						arrayPublications.push(data)
					}
				})
				setPublicationsProfile(arrayPublications)
			})
	}

	function toggleEditProfileModal() {
		setEditProfileModal(!editProfileModal)
	}

	function toggleProfilePictureModal() {
		setprofilePictureModal(!profilePictureModal)
	}

	function toggleModalProfileBanner() {
		setModalProfileBanner(!modalProfileBanner)
	}

	return (
		<>
			{profileUser === null ? (
				<NotFoundUser />
			) : (
				<>
					<div className={styles.container}>
						<div className={styles.profileContainer}>
							<div className={styles.contentProfile}>
								<div className={styles.picturesBox}>
									<img className={styles.banner} src={profileUser.bannerUrl === null ? banner : profileUser.bannerUrl} alt="banner" />
									<img onClick={toggleProfilePictureModal} className={styles.profilePic} src={profileUser.avatarUrl === null ? avatar : profileUser.avatarUrl} alt="Foto de perfil" />

									{user.uid === profileUser.id && (
										<button className={styles.editBanner} onClick={toggleModalProfileBanner}>
											<RiPencilLine size={25} color="var(--black)" />
										</button>
									)}
								</div>

								<div className={styles.infoBox}>
									{user.uid === profileUser.id && (
										<button className={styles.editInfoProfile} onClick={toggleEditProfileModal}>
											<RiPencilLine size={25} color="var(--black)" />
										</button>
									)}
									<p className={styles.name}>{profileUser.name}</p>
									<p className={styles.role}>{profileUser.role}</p>
									<p className={styles.place}>{profileUser.location}</p>

									<div className={styles.socialMedias}>
										<a href={profileUser.linkedin} rel="noreferrer" target="_blank">
											<img src={inLogo} alt="linkedin" width={30} height={30} />
										</a>

										<a href={profileUser.github} rel="noreferrer" target="_blank">
											<img src={ghLogo} alt="github" width={30} height={30} />
										</a>
									</div>
								</div>
							</div>
							<div className={styles.aboutMe}>
								<h1>Sobre mim</h1>
								{profileUser.aboutMe === '' ? (
									<p>Sem informações.</p>
								) : (
									<p>{profileUser.aboutMe}</p>
								)}
								{user.uid === profileUser.id && <button type="button"><RiPencilLine size={22} /></button>}
							</div>
							<ProjectsProfile user_id={profileUser.id} />
							<div className={styles.posts}>
								<h3>Minhas publicações</h3>
								{publicationsProfile.map((publication) => (
									<div key={publication.id} className={styles.post}>
										<header>
											<img src={profileUser.avatarUrl === null ? avatar : profileUser.avatarUrl} alt="Avatar foto" />
											<div>
												<span>{profileUser.name}</span>
												<p>{profileUser.role}</p>
												<time>Há 1h</time>
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
					<ChatModal />
				</>
			)}

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
		</>
	)
}