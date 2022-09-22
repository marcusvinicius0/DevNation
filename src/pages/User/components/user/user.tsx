import React, { useContext, useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { RiPencilLine } from 'react-icons/ri';
import styles from './styles.module.scss';

import avatar from '../../../../assets/avatar.png';
import banner from '../../../../assets/banner.png';
import ghLogo from '../../../../assets/github.png';
import inLogo from '../../../../assets/linkedin.png';

import { useParams } from 'react-router-dom';
import ChatModal from '../../../../components/ChatModal';
import EditProfileModal from '../../../../components/EditProfileModal';
import Header from '../../../../components/Header';
import ModalEditProfileBanner from '../../../../components/ModalEditProfileBanner';
import NewsBox from '../../../../components/NewsBox';
import NotFoundUser from '../../../../components/NotFoundUser';
import ProjectsProfile from '../../../../components/ProjectsProfile';
import PublicationsProfile from '../../../../components/PublicationsProfile';
import Stacks from '../../../../components/Stacks';
import { AuthContext } from '../../../../contexts/auth';
import { usePublications } from '../../../../hooks/usePublications';
import apiDsn from '../../../../services/apiDsn';
import { UserProps } from '../../types';

interface SeeUserProps {
  username: string;
}

interface ParamsProps {
  username: string;
}

export default function SeeUser() {
  const { user } = useContext(AuthContext);
  const { username } = useParams<ParamsProps>();
  const { loadUserPublications, userPublications } = usePublications();

  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  const [modalProfileBanner, setModalProfileBanner] = useState<boolean>(false);
  const [profileUser, setProfileUser] = useState<UserProps | null>({
    email: '',
    id: '',
    isVerified: false,
    name: '',
    username: '',
  });

  useEffect(() => {
    const goTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };
    goTop();
  }, []);

  async function loadUser() {
    if (username) {
      await apiDsn
        .get('/users/detail', { params: { username } })
        .then((res) => {
          let data: UserProps = {
            bannerUrl: res.data.bannerUrl,
            company: res.data.company,
            name: res.data.name,
            id: res.data.id,
            email: res.data.email,
            isVerified: res.data.isVerified,
            updatedAt: res.data.updatedAt,
            createdAt: res.data.createdAt,
            imageUserUrl: res.data.imageUserUrl,
            username,
          };
          setProfileUser(data);
          console.log(res.data);
        })
        .catch((err) => {
          setProfileUser(null);
          console.log(err);
        });
    }
  }

  useEffect(() => {
    loadUser();
    console.log('Na user normal', username);
    // loadUserPublications(username);
  }, [username]);

  function toggleEditProfileModal() {
    setEditProfileModal(!editProfileModal);
  }

  function toggleModalProfileBanner() {
    setModalProfileBanner(!modalProfileBanner);
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
                  <img
                    className={styles.banner}
                    src={profileUser.bannerUrl == '' ? banner : profileUser.bannerUrl}
                    alt="banner"
                  />
                  <img
                    className={styles.profilePic}
                    src={profileUser.imageUserUrl == null ? avatar : profileUser.imageUserUrl}
                    alt="Foto de perfil"
                  />
                </div>

                <div className={styles.infoBox}>
                  <header>
                    <span className={styles.name}>
                      <p>{profileUser.name}</p>
                      {profileUser.isVerified && <MdVerified />}
                    </span>
                    <div className={styles.socialMedias}>
                      <a href={profileUser.linkedin || undefined} rel="noreferrer" target="_blank">
                        <img src={inLogo} alt="linkedin" width={30} height={30} />
                      </a>

                      <a href={profileUser.github || undefined} rel="noreferrer" target="_blank">
                        <img src={ghLogo} alt="github" width={30} height={30} />
                      </a>
                    </div>
                  </header>
                  <article>
                    <div className={styles.moreInfo}>
                      <p className={styles.role}>{profileUser.role}</p>
                      <p className={styles.location}>{profileUser.location}</p>
                    </div>
                  </article>
                </div>
              </div>
              <div className={styles.aboutMe}>
                <header>
                  <h1>Sobre mim</h1>
                </header>
                {profileUser.description == null ? (
                  <p>Sem informações.</p>
                ) : (
                  <p>{profileUser.description}</p>
                )}
                {user?.id === profileUser.id && (
                  <button type="button">
                    <RiPencilLine size={22} />
                  </button>
                )}
              </div>
              <ProjectsProfile user_id={profileUser.id} state_button={false} />
              <Stacks user_id={profileUser.id} state_button={false} />
              <PublicationsProfile publications={userPublications} user={profileUser} />
            </div>
            <NewsBox />
          </div>
          <ChatModal />
        </>
      )}

      {editProfileModal && <EditProfileModal close={toggleEditProfileModal} />}

      {modalProfileBanner && <ModalEditProfileBanner close={toggleModalProfileBanner} />}
    </>
  );
}
