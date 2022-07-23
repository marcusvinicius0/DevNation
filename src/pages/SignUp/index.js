import { useState, useContext } from 'react';
import styles from '../SignIn/styles.module.scss';
import { AuthContext } from '../../contexts/auth';

import { Link } from 'react-router-dom';

import { FaUser, FaLock, FaSpinner } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

import Input from '../../components/Userinterface/Input';
import Button from '../../components/Userinterface/Button';
import { toast } from 'react-toastify';

export default function SignUp() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [passwordAgain, setPasswordAgain] = useState('');
   const [alert, setAlert] = useState(null);

   const { signUp, loadingAuth } = useContext(AuthContext);

   function handleSubmit(e) {
      e.preventDefault();
      
      if (name !== '' && email !== '' && password !== '' && passwordAgain !== '') {
         signUp(name, email, password)
      } else {
         toast.warning("Preencha todos os campos.")
         return null;
      }

      if (password !== passwordAgain) {
         toast.error("As senhas não são iguais.")
         return null;
      }


      if (password <= 5 && passwordAgain <= 5) {
         toast.warning("A senha precisa conter no mínimo 6 caracteres.")
         return null;
      }


   }

   return (
      <div className={styles.mainContainer}>
         <div className={styles.logoContainer}>
            <div className={styles.contentContainer}>
               <h1>Dev Social Network</h1>
               <p>Já possui uma conta?</p>
               <Link to="/">
                  Faça login agora mesmo!
               </Link>
            </div>
         </div>

         <div className={styles.loginContainer}>
            <h2>Cadastre-se!</h2>
            <form
               error={alert}
               className={styles.form}
               onSubmit={handleSubmit}
            >
               {alert ?
                  <Input
                     placeholder="Digite seu nome"
                     type="text"
                     value={name}
                     onChange={(event) => setName(event.target.value)}
                     className={styles.errorInput}
                  /> :
                  <Input
                     placeholder="Digite seu nome"
                     type="text"
                     value={name}
                     onChange={(event) => setName(event.target.value)}
                  />
               }


               <Input
                  placeholder="Digite seu email"
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
               />

               <Input
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
               />

               <Input
                  placeholder="Digite sua senha novamente"
                  type="password"
                  value={passwordAgain}
                  onChange={(event) => setPasswordAgain(event.target.value)}
               />

               <Button
                  type="submit"
               >
                  {loadingAuth ? <FaSpinner color="#FFF" size={16} /> : 'Cadastrar'}
               </Button>
            </form>

         </div>
      </div>
   )
}