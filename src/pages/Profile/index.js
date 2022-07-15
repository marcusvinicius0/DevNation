import { useState, useContext } from 'react';
import styles from './styles.module.scss';

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

    // const [avatarUrL, setAvatarUrL] = useState(user && user.avatarUrl);

    const [editProfileModal, setEditProfileModal] = useState(false);
    const [profilePictureModal, setprofilePictureModal] = useState(false);
    const [modalProfileBanner, setModalProfileBanner] = useState(false);

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
                <div className={styles.picturesBox}>
                    <img className={styles.banner} src={user.bannerUrl === null ? banner : user.bannerUrl} alt="banner" />
                    <img onClick={toggleProfilePictureModal} className={styles.profilePic} src={user.avatarUrl === null ? avatar : user.avatarUrl} />
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

                    <div className={user.aboutMe === '' ?
                        styles.descriptionBoxOff : styles.descriptionBox}>
                        <h3>Sobre mim:</h3>
                        <textarea disabled maxLength={1000}
                            value={user.aboutMe}
                        >

                        </textarea>

                    </div>
                </span>

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