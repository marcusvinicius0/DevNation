import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Input } from '../../components/Utils/Input';
import firebase from '../../services/firebaseConnection';
import styles from '../SignIn/styles.module.scss';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  function handlePassword(e) {
    e.preventDefault();

    const auth = firebase.auth();

    auth
      .sendPasswordResetEmail(email.replaceAll(' ', ''))
      .then(() => {
        toast.success('Sucesso. Verifique seu email para redefinição de senha');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Oops, algo deu errado.');
      });

    setEmail('');
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.contentContainer}>
          <h1>Dev Social Network</h1>
          <p>Entre em sua conta</p>
          <Link to="/">Faça login agora mesmo!</Link>
        </div>
      </div>

      <div className={styles.loginContainer}>
        <h2>Alterar senha</h2>

        <form className={styles.form} onSubmit={handlePassword}>
          <label>
            <Input
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <MdEmail color="var(--black)" size={22} />
          </label>
        </form>
      </div>
    </div>
  );
}
