import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss';
import firebase from 'firebase/app';

import Header from '../../components/Header';

import EditProfileModal from '../../components/EditProfileModal';
import ModalEditProfileBanner from '../../components/ModalEditProfileBanner';
import NewsBox from '../../components/NewsBox';
import ChatModal from '../../components/ChatModal';
import ProjectsProfile from '../../components/ProjectsProfile';
import NotFoundUser from '../../components/NotFoundUser';
import Stacks from '../../components/Stacks';
import PublicationsProfile from '../../components/PublicationsProfile';

import avatar from '../../assets/avatar.png';
import banner from '../../assets/banner.png';
import ghLogo from '../../assets/github.png';
import inLogo from '../../assets/linkedin.png';

import { AuthContext } from '../../contexts/auth';
import { usePublications } from '../../hooks/usePublications'

import { RiPencilLine } from 'react-icons/ri';
import { MdVerified } from 'react-icons/md'

export default function ProfileUser() {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const { loadUserPublications, userPublications } = usePublications();

	const [editProfileModal, setEditProfileModal] = useState(false);
	const [modalProfileBanner, setModalProfileBanner] = useState(false);
	const [profileUser, setProfileUser] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const goTop = () => { window.scrollTo({ top: 0, left: 0, behavior: 'auto'})};
		goTop();
	}, []);

	useEffect(() => {
		loadUser()
		loadUserPublications(id)
	}, [id])

	async function loadUser() {
		setLoading(true);
		if (id) {
			await firebase.firestore().collection('users')
				.doc(id)
				.get()
				.then((snapshot) => {
					if (snapshot.data()) {
						let data = {
							about_me: snapshot.data()?.aboutMe,
							avatar_url: snapshot.data().avatarUrl,
							banner_url: snapshot.data().bannerUrl,
							email: snapshot.data().email,
							location: snapshot.data().location,
							name: snapshot.data().name,
							id: snapshot.id,
							role: snapshot.data().role,
							linkedin: snapshot.data().linkedin,
							github: snapshot.data().github,
							is_verified: snapshot.data().verified
						}
						console.log(data)
						setProfileUser(data)
						setLoading(false)
					} else {
						setProfileUser(null)
					}
				})
				.catch((error) => {
					console.log(error)
					setLoading(false)
					setProfileUser(null)
				})
		}
	}

	function toggleEditProfileModal() {
		setEditProfileModal(!editProfileModal)
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
					<Header />
					<div className={styles.container}>
						<div className={styles.profileContainer}>
							<div className={styles.contentProfile}>
								<div className={styles.picturesBox}>
									<img className={styles.banner} src={profileUser.banner_url === null ? banner : profileUser.banner_url} alt="banner" />
									<img className={styles.profilePic} src={profileUser.avatar_url === null ? avatar : profileUser.avatar_url} alt="Foto de perfil" />

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
									<span className={styles.name}>
										<p>{profileUser.name}</p>
										{profileUser.is_verified && <MdVerified />}
									</span>
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
								{profileUser.about_me === '' ? (
									<p>Sem informações.</p>
								) : (
									<p>{profileUser.about_me}</p>
								)}
								{user.uid === profileUser.id && <button type="button"><RiPencilLine size={22} /></button>}
							</div>
							<ProjectsProfile user_id={profileUser.id} state_button={false}/>
							<Stacks user_id={profileUser.id} state_button={false} />
							<PublicationsProfile publications={userPublications} user={profileUser} />
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

			{modalProfileBanner && (
				<ModalEditProfileBanner
					close={toggleModalProfileBanner}
				/>
			)}
		</>
	)
}