import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import { FiX, FiUpload } from 'react-icons/fi';

import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';

import firebase from '../../services/firebaseConnection';

import { toast } from 'react-toastify';

export default function EditProfilePictureModal({ close }) {
    const { user, setUser, storageUser } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl); 
    const [imageAvatar, setImageAvatar] = useState(null);


    function handleFile(e) {

        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            } else {
                toast.warning("Envie uma imagem do tipo PNG ou JPEG.")
                setImageAvatar(null);
                return null;
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
            .ref(`images/${currentUid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {
                toast.success("Dados enviados com sucesso!")

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
                                close();
                            })
                    })
            })
    }

    function handleSave(e) {
        e.preventDefault();

        if (avatarUrl !== null) {
            handleUpload();
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.modalBox}>

                <div className={styles.headerModal}>

                    <p>Foto do perfil</p>

                    <button onClick={close}>
                        <FiX size={30} color="var(--soft-gray)" />
                    </button>

                </div>

                <form onSubmit={handleSave}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload className={styles.uploadIcon} color="var(--white)" size={30} />
                        </span>


                        <input type="file" accept="image/*" onChange={handleFile} /> <br />

                        {avatarUrl === null ? (

                            <img src={avatar} alt="profile" />

                        ) :
                            <img src={avatarUrl} alt="profile" />

                        }
                    </label>

                    <button type="submit">
                        Salvar alterações
                    </button>
                </form>

            </div>
        </div>
    )
}