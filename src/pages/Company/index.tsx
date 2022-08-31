import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import AdminCompany from './components/admin-company';
import SeeCompany from './components/company';
import styles from './styles.module.scss';

interface ParamsProps {
  username: string;
}

export default function Company() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { username } = useParams<ParamsProps>();

  useEffect(() => {
    if (username === 'user') {
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
