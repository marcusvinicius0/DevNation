import React, { useContext, useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { RiPencilLine } from 'react-icons/ri';
import styles from './styles.module.scss';

import avatar from '../../assets/avatar.png';
import banner from '../../assets/banner.png';
import ghLogo from '../../assets/github.png';
import inLogo from '../../assets/linkedin.png';
import ChatModal from '../../components/ChatModal';
import EditProfileModal from '../../components/EditProfileModal';
import EditProfilePictureModal from '../../components/EditProfilePictureModal';
import Header from '../../components/Header';
import ModalEditProfileBanner from '../../components/ModalEditProfileBanner';
import NewsBox from '../../components/NewsBox';
import ProjectsProfile from '../../components/ProjectsProfile';
import PublicationsProfile from '../../components/PublicationsProfile';
import Stacks from '../../components/Stacks';
import { UserSignedContext } from '../../contexts/signed';
import { usePublications } from '../../hooks/usePublications';

export default function Profile() {
  const { user } = useContext(UserSignedContext);
  const { loadUserPublications, userPublications } = usePublications();

  const [editProfileModal, setEditProfileModal] = useState(false);
  const [profilePictureModal, setprofilePictureModal] = useState(false);
  const [modalProfileBanner, setModalProfileBanner] = useState(false);

  useEffect(() => {
    const goTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };
    goTop();
  }, []);

  useEffect(() => {
    loadUserPublications(user?.id || '');
  }, []);

  function toggleEditProfileModal() {
    setEditProfileModal(!editProfileModal);
    console.log('teste');
  }

  function toggleProfilePictureModal() {
    setprofilePictureModal(!profilePictureModal);
  }

  function toggleModalProfileBanner() {
    setModalProfileBanner(!modalProfileBanner);
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <div className={styles.contentProfile}>
            <div className={styles.picturesBox}>
              <img
                className={styles.banner}
                src={user?.bannerUserUrl === null ? banner : user?.bannerUserUrl}
                alt="banner"
              />
              <img
                onClick={toggleProfilePictureModal}
                className={styles.profilePic}
                src={user?.imageUserUrl === null ? avatar : user?.imageUserUrl}
                alt="Foto de perfil"
              />

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
                  <p>{user?.name}</p>
                  {user?.isVerified && <MdVerified />}
                </span>
                <p className={styles.role}>{user?.role}</p>
                <p className={styles.place}>{user?.location}</p>
              </div>

              <div className={styles.socialMedias}>
                <a href={user?.linkedin} rel="noreferrer" target="_blank">
                  <img src={inLogo} alt="linkedin" width={30} height={30} />
                </a>

                <a href={user?.github} rel="noreferrer" target="_blank">
                  <img src={ghLogo} alt="github" width={30} height={30} />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.aboutMe}>
            <h1>Sobre mim</h1>
            {user?.description === '' ? <p>Sem informações.</p> : <p>{user?.description}</p>}
          </div>
          <ProjectsProfile user_id={user?.id} state_button />
          <Stacks user_id={user?.id} state_button />
          <PublicationsProfile publications={userPublications} user={user} />
        </div>
        <NewsBox />
      </div>

      {editProfileModal && <EditProfileModal close={toggleEditProfileModal} />}

      {profilePictureModal && <EditProfilePictureModal close={toggleProfilePictureModal} />}

      {modalProfileBanner && <ModalEditProfileBanner close={toggleModalProfileBanner} />}
      <ChatModal />
    </>
  );
}
