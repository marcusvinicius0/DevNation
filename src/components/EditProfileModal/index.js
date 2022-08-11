import { useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';

export default function EditProfileModal({ close }) {
  const { user, storageUser, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user.name ? user.name : '');
  const [role, setRole] = useState(user.role ? user.role : '');
  const [location, setLocation] = useState(user.location ? user.location : '');
  const [aboutMe, setAboutMe] = useState(user.aboutMe ? user.aboutMe : '');
  const [linkedin, setLinkedin] = useState(user.linkedin ? user.linkedin : '');
  const [github, setGithub] = useState(user.github ? user.github : '');

  async function handleSave(e) {
    e.preventDefault();

    if (name === '') {
      toast.warning('Você deve indicar um nome!');
      return null;
    }

    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        name,
        role,
        location,
        aboutMe,
        linkedin,
        github,
      })
      .then(() => {
        const data = {
          ...user,
          name,
          role,
          location,
          aboutMe,
          linkedin,
          github,
        };
        toast.success('Dados editados com sucesso!');
        setUser(data);
        storageUser(data);
        close();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Oops, algo deu errado. Tente novamente mais tarde.');
        setName(null);
        return null;
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
