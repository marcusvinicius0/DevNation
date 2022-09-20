import { useContext, useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

import banner from '../../assets/banner.png';
import { AuthContext } from '../../contexts/auth';

export default function ModalEditProfileBanner({ close }) {
  const { user, setUser, storageUser } = useContext(AuthContext);

  const [bannerUrl, setBannerUrl] = useState(user && user.bannerUrl); // picture preview
  const [bannerAvatar, setBannerAvatar] = useState(null);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setBannerAvatar(image);
        setBannerUrl(URL.createObjectURL(e.target.files[0]));
      } else {
        toast.warning('Envie uma imagem do tipo PGN ou JPEG.');
        setBannerAvatar(null);
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

    if (bannerUrl !== null) {
      handleUpload();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.headerModal}>
          <p>Editar banner</p>

          <button onClick={close}>
            <FiX size={30} color="var(--soft-gray)" />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <label className={styles.labelAvatar}>
            <span>
              <FiUpload className={styles.uploadIcon} color="var(--soft-gray)" size={30} />
            </span>
            <input type="file" accept="image/*" onChange={handleFile} /> <br />
            {bannerUrl === null ? (
              <img src={banner} alt="profile" />
            ) : (
              <img src={bannerUrl} alt="profile" />
            )}
          </label>

          <button type="submit">Salvar alterações</button>
        </form>
      </div>
    </div>
  );
}
