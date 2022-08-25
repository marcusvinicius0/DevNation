import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';

import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { UserSignedContext } from '../../contexts/signed';
import AdminCompany from './components/admin-company';
import SeeCompany from './components/company';

interface ParamsProps {
  username: string;
}

export default function Company() {
  const { user } = useContext(UserSignedContext);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { username } = useParams<ParamsProps>();

  useEffect(() => {
    if (username == 'user') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [username]);

  return (
    <>
      <Header />
      <div className={styles.container}>{isAdmin ? <AdminCompany /> : <SeeCompany />}</div>
    </>
  );
}
