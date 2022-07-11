import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import { Link } from 'react-router-dom';

import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import Input from '../../components/Userinterface/Input';
import Button from '../../components/Userinterface/Button';

import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext);
    function handleSubmit(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            signIn(email, password)
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.logoContainer}>
                <div className={styles.contentContainer}>
                    <h1>Dev Social Network</h1>
                    <p>Não possui uma conta?</p>
                    <Link to="/register">
                        Cadastre-se agora!
                    </Link>
                </div>
            </div>

            <div className={styles.loginContainer}>

                <h2>Faça seu login!</h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* <MdEmail className={styles.emailIcon} size={22} /> */}
                    <Input
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    {/* <FaLock className={styles.lockIcon} size={18} /> */}
                    <Input
                        placeholder="Digite sua senha"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <Button
                        type="submit"
                    >
                        {loadingAuth ? ( <FaSpinner color="#FFF" size={16} />) : 'Acessar'}
                    </Button>
                </form>

                <Link to="/forgot-password">
                    Esqueceu sua senha?
                </Link>

            </div>
        </div>
    )
}
