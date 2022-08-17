import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from '../../components/Utils/Input';
import { AuthContext } from '../../contexts/auth';

import styles from '../SignIn/styles.module.scss';

export default function SignUp() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');

  const { signUp } = useContext(AuthContext);
  const history = useHistory();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (password.length <= 6 && passwordAgain.length <= 6) {
      toast.warning('A senha precisa conter no mínimo 6 caracteres.');
      setPassword('');
      setPasswordAgain('');
      return null;
    }

    if (name !== '' && email !== '' && password !== '' && passwordAgain !== '') {
      console.log(name, email, password);
      await signUp({
        name,
        email: email.replaceAll(' ', ''),
        password: password.replaceAll(' ', ''),
      }).then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setPasswordAgain('');
        history.push('/signin');
      });
    } else {
      toast.warning('Preencha todos os campos.');
      setPassword('');
      setPasswordAgain('');
      return null;
    }

    if (password !== passwordAgain) {
      toast.error('As senhas não são iguais.');
      setPassword('');
      setPasswordAgain('');
      return null;
    }
    return null;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pictureContainer}>
        <div className={styles.contentContainer}>
          <h1>devnation.com</h1>
          <p>devnation.com é o local perfeito pra você encontrar talentos na área de tecnologia.</p>
          <Link to="/">Voltar para home</Link>
        </div>
        <img
          src="https://www.qrpoint.com.br/wp-content/uploads/2022/03/pexels-thisisengineering-3861969-1024x683.jpg"
          alt=""
        />
      </div>

      <div className={styles.loginContainer}>
        <div>
          <header>
            <h2>Faça seu cadastro!</h2>
            <p>
              Seja bem vindo a <span>rede social de desenvolvedores</span>!
            </p>
          </header>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              label="Nome"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <Input
              label="E-mail"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              itsPassword
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <Input
              label="Confirmar senha"
              itsPassword
              value={passwordAgain}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordAgain(e.target.value)}
            />
            <button className={styles.buttonToHandleSignIn} type="submit">
              Cadastrar
            </button>
          </form>

          <Link to="/" className={styles.forgotPassword}>
            Já tem uma conta? <span>Fazer login</span>.
          </Link>
        </div>
      </div>
    </div>
  );
}
