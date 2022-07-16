import { useState, useContext } from 'react';
import styles from '../SignIn/styles.module.scss';

import { Link } from 'react-router-dom';

import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';

import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

import Input from '../../components/Userinterface/Input';
import Button from '../../components/Userinterface/Button';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const { loadingAuth } = useContext(AuthContext);

    function handlePassword(e) {
        e.preventDefault();

        const auth = firebase.auth();

        auth.sendPasswordResetEmail(email)
            .then(() => {
                toast.success("Sucesso. Verifique seu email para redefinição de senha")
            })
            .catch((error) => {
                console.log(error)
                toast.error("Oops, algo deu errado.")
            })

        setEmail('');
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.logoContainer}>
                <div className={styles.contentContainer}>
                    <h1>Dev Social Network</h1>
                    <p>Entre em sua conta</p>
                    <Link to="/">
                        Faça login agora mesmo!
                    </Link>
                </div>
            </div>

            <div className={styles.loginContainer}>

                <h2>Alterar senha</h2>

                <form className={styles.form} onSubmit={handlePassword}>
    
                    <Input
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <Button
                        type="submit"
                    >
                        {loadingAuth ? (<FaSpinner color="#FFF" size={16} />) : 'Enviar'}
                    </Button>
                </form>

            </div>
        </div>
    )
}