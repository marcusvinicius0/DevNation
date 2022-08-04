import { useState, useContext } from 'react';
import styles from '../SignIn/styles.module.scss';
import { AuthContext } from '../../contexts/auth';

import { Link } from 'react-router-dom';

import { FaSpinner, FaUserAlt } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

import Input from '../../components/Userinterface/Input';
import Button from '../../components/Userinterface/Button';
import { toast } from 'react-toastify';

export default function SignUp() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [passwordAgain, setPasswordAgain] = useState('');
   const [alert, setAlert] = useState(null);
   const [hidePass, setHidePass] = useState(false);
   const [hidePass1, setHidePass1] = useState(false);

   const { signUp, loadingAuth } = useContext(AuthContext);

   function handleSubmit(e) {
      e.preventDefault();

      // setPasswordAgain.replaceAll(" ", "")

      if (password <= 6 && passwordAgain <= 6) {
         toast.warning("A senha precisa conter no mínimo 6 caracteres.");
         setPassword('');
         setPasswordAgain('');
         return null;
      }

      if (name !== '' && email !== '' && password !== '' && passwordAgain !== '') {
         signUp(name, email.replaceAll(" ", ""), password.replaceAll(" ", ""))
      } else {
         toast.warning("Preencha todos os campos.");
         setPassword('');
         setPasswordAgain('');
         return null;
      }

      if (password !== passwordAgain) {
         toast.error("As senhas não são iguais.");
         setPassword('');
         setPasswordAgain('');
         return null;
      }

      setName("");
      setEmail("");
      setPassword("");
      setPasswordAgain("");
   }

   function handlePassword() {
      setHidePass(!hidePass);
   }

   function handlePassword1() {
      setHidePass1(!hidePass1);
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

               <label>
                  <Input
                     placeholder="Digite seu nome"
                     type="text"
                     value={name}
                     onChange={(event) => setName(event.target.value)}
                  />
                  <FaUserAlt size={20} color="var(--black)" />
               </label>

               <label>
                  <Input
                     placeholder="Digite seu email"
                     type="text"
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                     maxLength={55}
                  />
                  <MdEmail color="var(--black)" size={22} />
               </label>

               <label>
                  <Input
                     placeholder="Digite sua senha"
                     type={hidePass ? "text" : "password"}
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                     maxLength={30}
                  />
                  {hidePass ?
                     <AiFillEye onClick={handlePassword} color="var(--black)" size={25} className={styles.eyeIcon} />
                     :
                     <AiFillEyeInvisible onClick={handlePassword} color="var(--blaack)" size={25} className={styles.eyeIcon} />
                  }
               </label>

               <label>
                  <Input
                     placeholder="Digite sua senha novamente"
                     type={hidePass1 ? "text" : "password"}
                     value={passwordAgain}
                     onChange={(event) => setPasswordAgain(event.target.value)}
                     maxLength={30}
                  />
                  {hidePass1 ?
                     <AiFillEye onClick={handlePassword1} color="var(--black)" size={25} className={styles.eyeIcon} />
                     :
                     <AiFillEyeInvisible onClick={handlePassword1} color="var(--black)" size={25} className={styles.eyeIcon} />
                  }
               </label>

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