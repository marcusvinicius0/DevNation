import React, { FormEvent, useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

import { EditUserProps } from '../../@types/User/types';
import { AuthContext } from '../../contexts/user';

interface EditProfileUserProps {
  close: () => void;
  changeInfoUser: ({
    /* eslint-disable */
    userId,
    name,
    role,
    description,
    location,
    linkedin,
    github,
    /* eslint-enable */
  }: EditUserProps) => void;
}



export default function EditProfileModal({ close, changeInfoUser }: EditProfileUserProps) {
  // eslint-disable-next-line
  const { user, storageUser, editInformations } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState(user?.role || '');
  const [location, setLocation] = useState(user?.location || '');
  const [aboutMe, setAboutMe] = useState(user?.description || '');
  const [linkedin, setLinkedin] = useState(user?.linkedin || '');
  const [github, setGithub] = useState(user?.github || '');

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    const data: EditUserProps = {
      userId: user?.id || '',
      name,
      role,
      description: aboutMe,
      location,
      linkedin,
      github,
    };
    await editInformations(data).then(() => {
      changeInfoUser(data);
    });
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalBox}>
        <header>
          <h2>Editar perfil</h2>
          <button onClick={close} type="button">
            <FiX size={22} />
          </button>
        </header>
        <div className={styles.formBox}>
          <form onSubmit={handleSave}>
            <label>
              <p>Nome</p>
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <label>
              <p>Função</p>
              <input type="text" value={role} onChange={(event) => setRole(event.target.value)} />
            </label>
            <label>
              <p>Localização</p>
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </label>
            <label>
              <p>Sobre mim</p>
              <textarea
                placeholder="1200 caracteres max."
                value={aboutMe}
                onChange={(event) => setAboutMe(event.target.value)}
              >
                {aboutMe}
              </textarea>
            </label>
            <label>
              <p>Linkedin</p>
              <input
                type="text"
                value={linkedin}
                onChange={(event) => setLinkedin(event.target.value)}
              />
            </label>
            <label>
              <p>GitHub</p>
              <input
                type="text"
                value={github}
                onChange={(event) => setGithub(event.target.value)}
              />
            </label>
            {name === '' && role === '' && location === '' && aboutMe === '' ? (
              <button className={styles.buttonOff} type="submit" disabled>
                Salvar dados
              </button>
            ) : (
              <button className={styles.buttonOn}>Salvar dados</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
