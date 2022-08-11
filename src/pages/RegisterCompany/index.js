/* eslint-disable no-alert */
import { useState } from 'react';

import { Link } from 'react-router-dom';

import { IoIosArrowRoundBack } from 'react-icons/io';
import { Input } from '../../components/Utils/Input';
import styles from './styles.module.scss';

export default function SignIn() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [numberOfEmplooyees, setNumberOfEmplooyees] = useState('');
  const [isBoolean, setIsBoolean] = useState(false);

  function handleContinue(e) {
    e.preventDefault();
    if (email !== '' && companyName !== '' && password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) setIsBoolean(true);
      else alert('Senhas não conferem.');
    } else {
      alert('Complete todos os campos!');
    }
  }

  function handleRegister(e) {
    e.preventDefault();

    console.log(companyLocation, numberOfEmplooyees);
  }

  return (
    console.log(isBoolean),
    (
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.contentContainer}>
            <h1>devsocialnetwork.com</h1>
            <p>
              devsocialnetwork.com é o local perfeito pra você encontrar talentos na área de
              tecnologia.
            </p>
            <Link to="/register">Voltar para home</Link>
          </div>
          <img
            src="https://piauihoje.com/uploads/imagens/tecno-divulgacao-1654806461.jpeg"
            alt="Imagem de Fundo"
          />
        </div>

        <div className={styles.registerContainer}>
          <header>
            <h2>Cadastrar empresa</h2>
            <p>Encontre os melhores talentos para sua empresa!</p>
          </header>

          {isBoolean === false ? (
            <form className={styles.form1} onSubmit={handleContinue}>
              <Input
                label="Nome da Empresa"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className={styles.buttonToHandleContinue} type="submit">
                Continuar
              </button>
            </form>
          ) : (
            <form className={styles.form2} onSubmit={handleRegister}>
              <Input
                label="Localidade da empresa"
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
              />

              <label>
                Quantidade de funcionários
                <select
                  value={numberOfEmplooyees}
                  onChange={(e) => setNumberOfEmplooyees(e.target.value)}
                >
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>50-100</option>
                  <option>100-200</option>
                  <option>200+</option>
                </select>
              </label>

              <button className={styles.buttonToHandleRegister} type="submit">
                Cadastrar
              </button>

              <button className={styles.back} onClick={() => setIsBoolean(false)}>
                <IoIosArrowRoundBack />
                Voltar
              </button>
            </form>
          )}
        </div>
      </div>
    )
  );
}
