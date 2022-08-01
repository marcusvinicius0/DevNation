import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import { Link } from 'react-router-dom';

import { FaSpinner } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

import Input from '../../components/Userinterface/Input';
import Button from '../../components/Userinterface/Button';

import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(false);

    const { signIn, loadingAuth } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            signIn(email.replaceAll(" ", ""), password.replaceAll(" ", ""));
        }
    };

    function handlePassword() {
        setHidePass(!hidePass)
    };

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

                    <label>
                        <Input
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
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
                            <AiFillEye onClick={handlePassword} color="var(--black)" size={25}
                                className={styles.eyeIcon} />
                            :
                            <AiFillEyeInvisible onClick={handlePassword} color="var(--black)" size={25}
                                className={styles.eyeIcon} />
                        }
                    </label>

                    <Button
                        type="submit"
                    >
                        {loadingAuth ? (<FaSpinner color="var(--white)" size={16} />) : 'Acessar'}
                    </Button>
                </form>

                <Link to="/forgot-password">
                    Esqueceu sua senha?
                </Link>

            </div>
        </div>
    )
}
