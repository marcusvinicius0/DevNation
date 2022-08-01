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
import PublicationsProfile from '../../components/PublicationsProfile';

import avatar from '../../assets/avatar.png';
import banner from '../../assets/banner.png';
import ghLogo from '../../assets/github.png';
import inLogo from '../../assets/linkedin.png';

import { MdVerified } from 'react-icons/md'

import { AuthContext } from '../../contexts/auth';
import { RiPencilLine } from 'react-icons/ri';
import { usePublications } from '../../hooks/usePublications'

export default function Profile() {
	const { user } = useContext(AuthContext);
	const { loadUserPublications, userPublications } = usePublications()

	const [editProfileModal, setEditProfileModal] = useState(false);
	const [profilePictureModal, setprofilePictureModal] = useState(false);
	const [modalProfileBanner, setModalProfileBanner] = useState(false);
	const [publicationsProfile, setPublicationsProfile] = useState([])

	useEffect( () => {
		loadUserPublications(user.uid)
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
								<span className={styles.name}>
									<p>{user.name}</p>
									{user.isVerified && <MdVerified />}
								</span>
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
					<ProjectsProfile user_id={user.uid} state_button={true} />
					<Stacks user_id={user.uid} state_button={true} />
					<PublicationsProfile publications={userPublications} user={user} />
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