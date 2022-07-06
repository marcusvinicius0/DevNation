import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import { FiX } from 'react-icons/fi';

import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';

import firebase from '../../services/firebaseConnection';

import { toast } from 'react-toastify';

export default function EditProfilePictureModal({ close }) {
    const { user, setUser, storageUser } = useContext(AuthContext);

    const [avatarURL, setAvatarURL] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null); //picture preview


    function handleFile(e) {

        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarURL(URL.createObjectURL(e.target.files[0]))
            } else {
                toast.warning("Envie uma imagem do tipo PNG ou JPEG.")
                setImageAvatar(null);
                return null;
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid;

         await firebase.storage()
            .ref(`images/${currentUid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {
                toast.success('Dados enviados com sucesso!')

                await firebase.storage().ref(`images/${currentUid}`)
                    .child(imageAvatar.name).getDownloadURL()
                    .then(async (url) => {
                        let urlFoto = url;

                        await firebase.firestore().collection('users')
                            .doc(user.uid)
                            .update({
                                avatarUrl: urlFoto,
                            })
                            .then(() => {
                                let data = {
                                    ...user,
                                    avatarUrl: urlFoto,
                                };
                                setUser(data);
                                storageUser(data);
                            })
                    })
            })
    }

    async function handleSave(e) {
        e.preventDefault();

        if (avatarURL !== null) {
            handleUpload();
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

                <span>
                    <p>Foto do perfil</p>
                    <hr />
                </span>

                <form onSubmit={handleSave}>
                    <input type="file" accept="image/*" onChange={handleFile} /> <br />
                    {avatarURL === null ? (
                        <div className={styles.pictureBox}>
                            <img src={avatar} alt="profile" />
                        </div>
                    ) : (
                        <div className={styles.pictureBox}>
                            <img src={avatarURL} alt="profile" />
                        </div>
                    )}

                    <button type="submit">
                        Salvar alterações
                    </button>
                </form>

            </div>
        </div>
    )
}