import React, { FormEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import { Input } from '../../components/Utils/Input';
import { AuthContext } from '../../contexts/auth';
import styles from './styles.module.scss';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      signIn(email.replaceAll(' ', ''), password.replaceAll(' ', ''));
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pictureContainer}>
        <div className={styles.contentContainer}>
          <h1>devsocialnetwork.com</h1>
          <p>
            devsocialnetwork.com é o local perfeito pra você encontrar talentos na área de
            tecnologia.
          </p>
          <Link to="/">Voltar para home</Link>
        </div>
        <img
          src="https://sercortes.com.br/wp-content/uploads/2020/03/inovacao-875x500.jpg"
          alt=""
        />
      </div>

      <div className={styles.loginContainer}>
        <div>
          <header>
            <h2>Faça seu login!</h2>
            <p>
              Olá, bem vindo de volta à <span>Dev Social Network</span>!
            </p>
          </header>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="email"
              label="E-mail"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              itsPassword
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loadingAuth}>
              Acessar
            </Button>
          </form>

          <Link to="/forgot-password" className={styles.forgotPassword}>
            Esqueceu a senha? <span>Recupere-a</span>.
          </Link>
        </div>
      </div>
    </div>
  );
}
