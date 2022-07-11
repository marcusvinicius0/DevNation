import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import { AuthContext } from '../../contexts/auth';

import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

export default function EditProfileModal({ close }) {
    const { user, storageUser, setUser } = useContext(AuthContext)

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [aboutMe, setAboutMe] = useState('');

    async function handleSave(e) {
        e.preventDefault();

        if (role === '' && location === '' && aboutMe === '' && name !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    name: name
                })
                .then(() => {
                    let data = {
                        ...user,
                        name: name
                    }
                    toast.success("Dados enviados com sucesso!")
                    setUser(data);
                    storageUser(data);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Oops, algo deu errado. Tente novamente mais tarde.");
                    setName(null);
                    return null;
                })
        }
        else if (role === '' && location === '' && name === '' && aboutMe !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    aboutMe: aboutMe
                })
                .then(() => {
                    let data = {
                        ...user,
                        aboutMe: aboutMe
                    }
                    toast.success("Dados enviados com sucesso!")
                    setUser(data);
                    storageUser(data);
                    setAboutMe('');
                })
                .catch((err) => {
                    toast.error("Oops, algo deu errado. Tente novamente mais tarde.")
                    console.log(err)
                    setAboutMe(null);
                    return null;
                })
        }
        else if (role === '' && name === '' && aboutMe === '' && location !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    location: location
                })
                .then(() => {
                    let data = {
                        ...user,
                        location: location
                    }
                    toast.success("Dados enviados com sucesso!");
                    setUser(data);
                    storageUser(data);
                })
                .catch((err) => {
                    toast.error("Oops, algo deu errado. Tente novamente mais tarde.")
                    console.log(err);
                    setLocation(null);
                    return null;
                })
        }
        else if (name === '' && aboutMe === '' && location === '' && role !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    role: role
                })
                .then(() => {
                    let data = {
                        ...user,
                        role: role
                    }
                    toast.success("Dados enviados com sucesso!")
                    setUser(data);
                    storageUser(data);
                })
                .catch((err) => {
                    toast.error("Oops, algo deu errado. Tente novamente mais tarde.")
                    console.log(err);
                    setUser(null);
                    return null;
                })
        }
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
                    <form onSubmit={handleSave}>
                        <label>
                            <p>Nome</p>
                            <input type="text" value={name} onChange={event => setName(event.target.value)} />
                        </label>

                        <label>
                            <p>Função</p>
                            <input type="text" value={role} onChange={event => setRole(event.target.value)} />
                        </label>

                        <label>
                            <p>Localização</p>
                            <input type="text" value={location} onChange={event => setLocation(event.target.value)} />
                        </label>

                        <label>
                            <p>Sobre mim</p>
                            <textarea
                                placeholder="1200 caracteres max."
                                value={aboutMe}
                                onChange={event => setAboutMe(event.target.value)}
                            >
                                {aboutMe}
                            </textarea>
                        </label>

                        {name === '' && role === '' && location === '' && aboutMe === '' ?
                            <button className={styles.buttonOff} type="submit" disabled>
                                Salvar dados
                            </button>
                            :
                            <button className={styles.buttonOn}>
                                Salvar dados
                            </button>
                        }

                    </form>
                </div>
            </div>
        </div>

    )
}