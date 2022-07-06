import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { AuthContext } from '../../contexts/auth';

import firebase from '../../services/firebaseConnection';

export default function EditProfileModal({ close }) {
    const { user } = useContext(AuthContext)

    const [name, setName] = useState(user.name);
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [aboutMe, setAboutMe] = useState('');

    function handleSubmit() {
        return (
            ""
        )
    }

    return (

        <div className={styles.container}>
            <div className={styles.modalBox}>
                <span className={styles.buttonBox}>
                    <button className={styles.closeButton} onClick={close}>
                        <FiX size={30} color="var(--soft-gray)" />
                    </button>
                </span>


                <span className={styles.header}>
                    <p>Editar introdução</p>
                    <hr />
                </span>

                <div className={styles.formBox}>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>Nome</p>
                            <input type="text" value={name} onChange={ event => setName(event.target.value)} />
                        </label>

                        <label>
                            <p>Função</p>
                            <input type="text" value={role} onChange={ event => setRole(event.target.value)} />
                        </label>

                        <label>
                            <p>Localização</p>
                            <input type="text" value={location} onChange={ event => setLocation(event.target.value)}  />
                        </label>

                        <label>
                            <p>Sobre mim</p>
                            <textarea
                             placeholder="1200 caracteres max."
                            value={aboutMe}
                            onChange={ event => setAboutMe(event.target.value)}
                            >

                            </textarea>
                        </label>

                   
                            <button type="submit">
                                Salvar dados
                            </button>

                    </form>
                </div>
            </div>
        </div>

    )
}