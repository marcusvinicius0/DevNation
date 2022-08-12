
import { useState, useContext } from "react";
import styles from "../SignIn/styles.module.scss";
import { AuthContext } from "../../contexts/auth";

import { Link } from "react-router-dom";

import { FaSpinner } from "react-icons/fa";


import { Input } from "../../components/Utils/Input";
import { toast } from "react-toastify";
import React from "react";

export default function SignUp() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordAgain, setPasswordAgain] = useState("");
   const [alert, setAlert] = useState(null);
  
   const { signUp, loadingAuth } = useContext(AuthContext);

   function handleSubmit(e) {
      e.preventDefault();

      // setPasswordAgain.replaceAll(" ", "")

      if (password <= 6 && passwordAgain <= 6) {
         toast.warning("A senha precisa conter no mínimo 6 caracteres.");
         setPassword("");
         setPasswordAgain("");
         return null;
      }

      if (
         name !== "" &&
         email !== "" &&
         password !== "" &&
         passwordAgain !== ""
      ) {
         signUp(name, email.replaceAll(" ", ""), password.replaceAll(" ", ""));
      } else {
         toast.warning("Preencha todos os campos.");
         setPassword("");
         setPasswordAgain("");
         return null;
      }

      if (password !== passwordAgain) {
         toast.error("As senhas não são iguais.");
         setPassword("");
         setPasswordAgain("");
         return null;
      }
      setName("");
      setEmail("");
      setPassword("");
      setPasswordAgain("");
   }

   return (
      <div className={styles.mainContainer}>
         <div className={styles.logoContainer}>
            <div className={styles.contentContainer}>
               <h1>Dev Social Network</h1>
               <p>Já possui uma conta?</p>
               <Link to="/">Faça login agora mesmo!</Link>
            </div>
         </div>

         <div className={styles.loginContainer}>
            <h2>Cadastre-se!</h2>
            <form error={alert} className={styles.form} onSubmit={handleSubmit}>
               <Input label="Digite seu nome" itsIconUser  type="text" value={name} onChange={(e ) => setName(e.target.value)} />
               <Input label="E-mail" itsIconEmail value={email}  type="text" onChange={(e ) => setEmail(e.target.value)} />
               <Input label="Senha" itsPassword value={password} onChange={(e) => setPassword(e.target.value)} />
               <Input label="Digite sua senha novamente" itsPassword value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)} />

             
               <button className={styles.buttonToHandleSignIn} type="submit">{loadingAuth ? <FaSpinner color="#FFF" size={16} /> : "Cadastrar"}</button>
            </form>
         </div>
      </div>
   );
}
