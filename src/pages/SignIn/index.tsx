import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import { Input } from '../../components/Utils/Input';
import { Loading } from '../../components/Utils/Loading';

import styles from './styles.module.scss';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext);

    function handleSubmit(e: ) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            signIn(email.replaceAll(" ", ""), password.replaceAll(" ", ""));
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.logoContainer}>
                <div className={styles.contentContainer}>
                    <h1>devsocialnetwork.com</h1>
                    <p>devsocialnetwork.com é o local perfeito pra você encontrar talentos na área de tecnologia.</p>
                    <Link to="/register">
                        Voltar para home
                    </Link>
                </div>
					<img src="https://sercortes.com.br/wp-content/uploads/2020/03/inovacao-875x500.jpg" alt="" />
            </div>

            <div className={styles.loginContainer}>
                <header>
					 	<h2>Faça seu login!</h2>
						<p>Olá, bem vindo de volta à <span>Dev Social Network</span>!</p>
					 </header>
                <form className={styles.form} onSubmit={handleSubmit}>
						  <Input label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input label="Senha" itsPassword  value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className={styles.buttonToHandleSignIn} type="submit">Acessar</button>
                </form>

                <Link to="/" className={styles.forgotPassword}>
                    Esqueceu a senha? <span>Recupere-a</span>.
                </Link>

            </div>
        </div>
    )
}
