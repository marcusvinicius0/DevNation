import { useState, useContext } from 'react';
import styles from './styles.module.scss';

import Header from '../../components/Header';
import EditProfileModal from '../../components/EditProfileModal';
import EditProfilePictureModal from '../../components/EditProfilePictureModal';

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

    function toggleEditProfileModal() {
        setEditProfileModal(!editProfileModal)
    }

    function toggleProfilePictureModal(){
        setprofilePictureModal(!profilePictureModal)
    }

    return (
        <>
            <Header />

            <div className={styles.profileContainer}>
                <span className={styles.picturesBox}>
                    <img src={banner} alt="banner" />
                    <img onClick={toggleProfilePictureModal} className={styles.profilePic} src={user.avatarUrl === null ? avatar : user.avatarUrl}/>  
                </span>

                <span className={styles.infoBox}>
                    <p className={styles.name}>{user.name}</p>
                    <p className={styles.role}>{user.role}</p>
                    <p className={styles.place}>{user.location}</p>
                    <RiPencilLine onClick={toggleEditProfileModal} size={30} color="var(--black)" />
                    <span className={styles.socialMedias}>
                        <img src={inLogo} alt="linkedin" width={30} height={30} />
                        <img src={ghLogo} alt="github" width={30} height={30} />
                    </span>

                    <div className={styles.descriptionBox}>
                        <h3>Sobre mim:</h3>
                        <textarea maxLength={1000}>
                            {user.publication}
                        </textarea>
                    
                    </div>
                </span>

            </div>

            <RiPencilLine className={styles.editBanner} size={20} color="var(--black)" />

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

        </>
    )
}