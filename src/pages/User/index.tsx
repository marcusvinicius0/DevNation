import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';

import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { UserSignedContext } from '../../contexts/signed';
import AdminUser from './components/admin-user/admin-user';
import SeeUser from './components/user/user';

interface ParamsProps {
  username: string;
}

export default function User() {
  const { user } = useContext(UserSignedContext);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const { username } = useParams<ParamsProps>();

  useEffect(() => {
    if (username == user?.username) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [username]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        {isAdmin ? <AdminUser username={username} /> : <SeeUser username={username} />}
      </div>
    </>
  );
}
