import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


import { IoIosArrowRoundBack } from 'react-icons/io';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import { Input } from '../../components/Utils/Input';
import { CompanyContext } from '../../contexts/company';
import styles from './styles.module.scss';

<<<<<<< HEAD

=======
const typesOfRoles = [
  'Desenvolvimento de Software',
  'Tecnologia, informação e internet',
  'Marketing',
  'Imobiliária',
  'Serviços de recursos humanos',
];
>>>>>>> 9828620a7080d38dcae3d10d2e00471babed73dd

export default function SignIn() {
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [companyLocation, setCompanyLocation] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [companyRole, setCompanyRole] = useState<string>('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [firstForm, setFirstForm] = useState(false);

  const { signUpCompany, loadingAuth } = useContext(CompanyContext);
  const history = useHistory();

  function handleContinue(e: FormEvent) {
    e.preventDefault();
    if (email !== '' && companyName !== '' && password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) setFirstForm(true);
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
    setCompanyName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setCompanyLocation('')
    setCompanyRole('')
    setNumberOfEmployees('')
    toast.success("Empresa cadastrada com sucesso!")
    history.push('/signin');
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.contentContainer}>
          <h1>devnation.com</h1>
          <p>devnation.com é o local perfeito pra você encontrar talentos na área de tecnologia.</p>
          <Link to="/">Voltar para home</Link>
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

        {firstForm === false ? (
          <form className={styles.form1} onSubmit={handleContinue}>
            <Input
              label="Nome da Empresa"
              value={companyName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
            />
            <Input
              label="Usuário da Empresa"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
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
            <Link to="/" className={styles.hasAccount}>
              Já tem uma conta? <span>Fazer login</span>.
            </Link>
          </form>
        ) : (
          <>
            <form className={styles.form2} onSubmit={handleRegister}>
              <Input
                label="Localidade da empresa"
                value={companyLocation}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyLocation(e.target.value)}
              />

              <label>
                Setor da empresa
                <select
                  value={numberOfEmployees}
                  placeholder="Com o que a empresa trabalha?"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setNumberOfEmployees(e.target.value)
                  }
                >
                  {typesOfRoles.map((type) => (
                    <option>{type}</option>
                  ))}
                </select>
              </label>

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

              <Button type="submit" loading={loadingAuth}>
                Cadastrar
              </Button>
            </form>
            <button className={styles.back} type="button" onClick={() => setFirstForm(false)}>
              <IoIosArrowRoundBack />
              Voltar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
