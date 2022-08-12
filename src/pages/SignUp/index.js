import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from '../../components/Utils/Input';
import { AuthContext } from '../../contexts/auth';

import styles from '../SignIn/styles.module.scss';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const { signUp } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    // setPasswordAgain.replaceAll(" ", "")

    if (password <= 6 && passwordAgain <= 6) {
      toast.warning('A senha precisa conter no mínimo 6 caracteres.');
      setPassword('');
      setPasswordAgain('');
      return null;
    }

    if (name !== '' && email !== '' && password !== '' && passwordAgain !== '') {
      signUp(name, email.replaceAll(' ', ''), password.replaceAll(' ', ''));
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
    setName('');
    setEmail('');
    setPassword('');
    setPasswordAgain('');
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
            <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              label="Senha"
              itsPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirmar senha"
              itsPassword
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
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
