import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { IoIosArrowRoundBack } from 'react-icons/io';
import { toast } from 'react-toastify';
import { Input } from '../../components/Utils/Input';
import { CompanyContext } from '../../contexts/company';
import styles from './styles.module.scss';

export default function SignIn() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyRole, setCompanyRole] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [isBoolean, setIsBoolean] = useState(false);

  const history = useHistory();
  const { signUpCompany } = useContext(CompanyContext);

  function handleContinue(e: FormEvent) {
    e.preventDefault();
    if (email !== '' && companyName !== '' && password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) setIsBoolean(true);
      else toast.error('Senhas não conferem.');
    } else {
      toast.warning('Complete todos os campos!');
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    await signUpCompany({
      name: companyName,
      email,
      password,
      quantityOfEmployee: numberOfEmployees,
      location: companyLocation,
      companyRole,
    });
    history.push('/signin');
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.contentContainer}>
          <h1>devnation.com</h1>
          <p>devnation.com é o local perfeito pra você encontrar talentos na área de tecnologia.</p>
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
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
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyLocation(e.target.value)}
            />
            <Input
              label="Com o que a empresa trabalha?"
              value={companyRole}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyRole(e.target.value)}
            />

            <label>
              Quantidade de funcionários
              <select
                value={numberOfEmployees}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setNumberOfEmployees(e.target.value)
                }
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
  );
}
