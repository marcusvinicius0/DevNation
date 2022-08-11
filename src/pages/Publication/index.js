import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './styles.module.scss';

import avatar from '../../assets/avatar.png';
import Header from '../../components/Header';
import PostOnDetails from '../../components/PostOnDetails';
import Sidebox from '../../components/Sidebox';

import { usePublications } from '../../hooks/usePublications';

export default function Publication() {
  const { id } = useParams();
  const { loadPublicationById, publication } = usePublications();

  useEffect(() => {
    const goTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    goTop();
  }, []);

  useEffect(() => {
    loadPublicationById(id);
  }, [id]);

  return (
    <>
      <Header />
      <div className={styles.containerPublication}>
        <Sidebox />
        <div className={styles.publication}>
          {publication && <PostOnDetails publicationInfo={publication} />}
        </div>
        <div className={styles.infoUser}>
          {publication.user_avatar_url === null ? (
            <img src={avatar} alt="foto avatar" />
          ) : (
            <img src={publication.user_avatar_url} alt="Avatar foto" />
          )}
          <p>{publication.user_role}</p>
          <Link to={`/user/${publication.user_id}`}>Ver perfil completo</Link>
        </div>
      </div>
    </>
  );
}
