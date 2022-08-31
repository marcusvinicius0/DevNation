import React, { FormEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { BsBuilding } from 'react-icons/bs';
import { ImUser } from 'react-icons/im';

import { Input } from '../../components/Utils/Input';
import { AuthContext } from '../../contexts/auth';

import Button from '../../components/Button';
import { CompanyContext } from '../../contexts/company';
import styles from './styles.module.scss';

export default function SignIn() {
  const { signInCompany } = useContext(CompanyContext);
  const { signIn, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [modeLoginSelectedIsUser, setModeLoginSelectedIsUser] = useState<boolean>(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      if (modeLoginSelectedIsUser) {
        signIn(email.replaceAll(' ', ''), password.replaceAll(' ', ''));
      } else {
        signInCompany(email.replaceAll(' ', ''), password.replaceAll(' ', ''));
      }
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
            <div className={styles.modeLogin}>
              <button
                onClick={() => setModeLoginSelectedIsUser(true)}
                className={modeLoginSelectedIsUser ? `${styles.selected}` : ''}
                type="button"
              >
                <ImUser /> <span>Indivíduo</span>{' '}
              </button>
              <button
                onClick={() => setModeLoginSelectedIsUser(false)}
                className={modeLoginSelectedIsUser ? '' : `${styles.selected}`}
                type="button"
              >
                <BsBuilding /> <span>Empresa</span>{' '}
              </button>
            </div>
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
