import { useContext, useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/user';

export default function EditProfilePictureModal({ close }) {
  const { user, setUser, storageUser } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]));
      } else {
        toast.warning('Envie uma imagem do tipo PNG ou JPEG.');
        setImageAvatar(null);
        return null;
      }
    }
    return null;
  }

  async function handleUpload() {
    const currentUid = user.uid;
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
            ) : (
              <img src={avatarUrl} alt="profile" />
            )}
          </label>

          <button type="submit">Salvar alterações</button>
        </form>
      </div>
    </div>
  );
}
