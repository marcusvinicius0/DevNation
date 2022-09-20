import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';

import { Input } from '../../components/Utils/Input';
import styles from './styles.module.scss';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handlePassword() {
    setLoading(true);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pictureContainer}>
        <div className={styles.contentContainer}>
          <h1>devsocialnetwork.com</h1>
          <div>
            <p>Entre em sua conta</p>
            <Link to="/">Faça login agora mesmo!</Link>
          </div>
        </div>
        <img
          src="https://sercortes.com.br/wp-content/uploads/2020/03/inovacao-875x500.jpg"
          alt=""
        />
      </div>

      <div className={styles.loginContainer}>
        <div className={styles.resetPassword}>
          <h2>Alterar senha</h2>

          <Input
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            itsIconEmail
          />
          <Button type="button" loading={loading} onClick={handlePassword}>
            Resetar senha
          </Button>
        </div>
      </div>
    </div>
  );
}
