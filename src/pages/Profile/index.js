import { useState, useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import firebase from 'firebase';

import Header from '../../components/Header';
import EditProfileModal from '../../components/EditProfileModal';
import EditProfilePictureModal from '../../components/EditProfilePictureModal';
import ModalEditProfileBanner from '../../components/ModalEditProfileBanner';
import NewsBox from '../../components/NewsBox';
import ChatModal from '../../components/ChatModal';

import avatar from '../../assets/avatar.png';
import banner from '../../assets/banner.png';
import ghLogo from '../../assets/github.png';
import inLogo from '../../assets/linkedin.png';

import { AuthContext } from '../../contexts/auth';

import { RiPencilLine } from 'react-icons/ri';

export default function Profile() {
    const { user } = useContext(AuthContext);

    const [editProfileModal, setEditProfileModal] = useState(false);
    const [profilePictureModal, setprofilePictureModal] = useState(false);
    const [modalProfileBanner, setModalProfileBanner] = useState(false);
		const [publicationsProfile, setPublicationsProfile] = useState([])

		useEffect( () => {
			async function loadPosts() {
				await firebase.firestore().collection('publications')
				.orderBy('created', 'desc')
				.get()
				.then( (snapshot) => {
					let arrayPublications = [];

					snapshot.forEach( (doc) => {
						if(doc.data().user_id === user.uid) {
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

            <div className={styles.profileContainer}>
                <div className={styles.contentProfile}>
									<div className={styles.picturesBox}>
											<img className={styles.banner} src={user.bannerUrl === null ? banner : user.bannerUrl} alt="banner" />
											<img onClick={toggleProfilePictureModal} className={styles.profilePic} src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto de perfil" />

											<div className={styles.editBanner}>
													<RiPencilLine onClick={toggleModalProfileBanner} size={25} color="var(--black)" />
											</div>
									</div>

									<span className={styles.infoBox}>
											<RiPencilLine onClick={toggleEditProfileModal} size={30} color="var(--black)" />
											<p className={styles.name}>{user.name}</p>
											<p className={styles.role}>{user.role}</p>
											<p className={styles.place}>{user.location}</p>

											<span className={styles.socialMedias}>
													<img src={inLogo} alt="linkedin" width={30} height={30} />
													<img src={ghLogo} alt="github" width={30} height={30} />
											</span>
									</span>
								</div>
								<div className={styles.aboutMe}>
									<h1>Sobre mim</h1>
									{user.aboutMe === '' ? (
										<p>Sem informações.</p>
									) : (
										<p>{user.aboutMe}</p>
									)}
									<button type="button"><RiPencilLine size={22} /></button>
								</div>
								<div className={styles.posts}>
										{publicationsProfile.map( (publication) => (
											<div key={publication.id} className={styles.post}>
												<header>
													<img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Avatar foto" />
													<div>
														<span >{user.name}</span>
														<p>{user.role}</p>
														<time>Há 1h</time>
													</div>
												</header>
												<div className={styles.contentPost}>
													<p>{publication.publication}</p>
												</div>
										</div>
										))}
								</div>
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

            <NewsBox />
            <ChatModal />
        </>
    )
}