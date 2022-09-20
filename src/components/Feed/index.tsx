import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from 'react';

import { usePublications } from '../../hooks/usePublications';
import Post from '../Post';
import styles from './styles.module.scss';

export default function Feed() {
  const { publications, loadPublications, loadingPublications } = usePublications();

  useEffect(() => {
    loadPublications();
  }, []);

  if (loadingPublications) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.feed}>
      {publications.length > 0 &&
        publications.map((publication, index) => <Post key={index} publication={publication} />)}
    </div>
  );
}
