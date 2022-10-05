import React, { FormEvent, useContext, useState } from 'react';
import { AiFillPicture } from 'react-icons/ai';
import { BiCaretDown, BiWorld } from 'react-icons/bi';
import { FaBriefcase, FaChartBar } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';

<<<<<<< HEAD
import avatarCompany from '../../assets/avatar/avatar-company.jpg';
import avatar from '../../assets/avatar/avatar.png';
import { AuthContext } from '../../contexts/auth';
=======
import avatarCompany from '../../assets/avatar-company.jpg';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/user';
>>>>>>> c28e85e7310a8baa59a6901e23674d257c3f5c2e
import { usePublications } from '../../hooks/usePublications';
import styles from './styles.module.scss';

interface PublicModalProps {
  close: () => void;
}

export default function PublicModal({ close }: PublicModalProps) {
  const [text, setText] = useState<string>('');
  const [imagePublication, setImagePublication] = useState<string | null>(null);
  const [imagePublicationUrl, setImagePublicationUrl] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const { handleCreatePublication } = usePublications();

  function coming() {
    toast.warning('Em breve...');
  }

  async function handleDataToCreatePublication(e: FormEvent) {
    e.preventDefault();

    try {
      const data: any = {
        publication: text,
        userId: user?.id,
        imagePublicationUrl: imagePublication,
      };

      await handleCreatePublication(data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleFile(e: any) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (
        image.type === 'image/jpeg' ||
        image.type === 'image/png' ||
        image.type === 'image/jpg' ||
        image.type === 'image/gif'
      ) {
        setImagePublication(image);
        setImagePublicationUrl(URL.createObjectURL(image));
      } else {
        toast.warning('Envie uma imagem do tipo JPG, JPEG, GIF ou PNG.');
        setImagePublication(null);
        return null;
      }
    }
    return null;
  }

  function resetFile() {
    setImagePublication(null);
    setImagePublicationUrl(null);
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerModal}>
        <header>
          <h2>Criar publicação</h2>
          <button onClick={close} type="button">
            <FiX size={22} />
          </button>
        </header>
        <div className={styles.infoUser}>
          {!user?.imageUserUrl ? (
            <img src={user?.isUser ? avatar : avatarCompany} alt="usuario-perfil" />
          ) : (
            <img src={user?.imageUserUrl} alt="usuario-perfil" />
          )}
          <div>
            <p className={styles.userName}>{user?.name}</p>
            <button>
              <BiWorld />
              <span>Todos</span>
              <BiCaretDown />
            </button>
          </div>
        </div>
        <form onSubmit={handleDataToCreatePublication}>
          <textarea
            placeholder="No que você está pensando?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {imagePublicationUrl && (
            <div className={styles.containerImageFile}>
              <img src={imagePublicationUrl} alt="Foto publicação" />
              <button onClick={resetFile}>
                <FiX />
              </button>
            </div>
          )}
          <div className={styles.formActions}>
            <div className={styles.tools}>
              <div className={styles.inputFile}>
                <input type="file" onChange={handleFile} />
                <AiFillPicture size={20} />
              </div>
              <button type="button" onClick={coming}>
                <FaChartBar size={20} />
              </button>
              <button type="button" onClick={coming}>
                <FaBriefcase size={20} />
              </button>
              <button type="button" onClick={coming}>
                <IoEllipsisHorizontalSharp size={20} />
              </button>
            </div>

            {text === '' ? (
              <button type="submit" className={styles.buttonToHandlePublication} disabled>
                Publicar
              </button>
            ) : (
              <button type="submit" className={styles.buttonToHandlePublication}>
                Publicar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
