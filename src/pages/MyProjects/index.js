import { useContext, useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import styles from './styles.module.scss';

import AddProjectModal from '../../components/AddProjectModal';
import Header from '../../components/Header';
import Sidebox from '../../components/Sidebox';
import { AuthContext } from '../../contexts/auth';

export default function MyProjects() {
  const { user } = useContext(AuthContext);

  const [modalNewProjectIsOpen, setModalNewProjectIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const goTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    goTop();
  }, []);

  async function loadProjects() {}

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleDeleteProject(id) {}

  function handleCloseModalNewProject() {
    setModalNewProjectIsOpen(false);
  }

  function handleOpenModalNewProject() {
    setModalNewProjectIsOpen(true);
  }

  return (
    <>
      <Header />
      <div className={styles.containerMyProjects}>
        <div className={styles.sidebox}>
          <Sidebox />
        </div>
        <div className={styles.contentMyProjects}>
          <header>
            <h1>Meus projetos</h1>
            <button onClick={handleOpenModalNewProject}>
              <FiPlus />
              <span>Adicionar projeto</span>
            </button>
          </header>
          <div className={styles.cardsProjects}>
            {projects.map((project) => (
              <div className={styles.card} key={project.id}>
                <img src={project.imageProjectUrl} alt="Foto projeto" />
                <div className={styles.infosCard}>
                  <span>{project.title}</span>
                  <p>{project.description}</p>
                </div>
                <div className={styles.buttonsCard}>
                  <button>
                    <a href={project.liveLink} target="_blank" rel="noreferrer">
                      Ver aplicação
                    </a>
                  </button>
                  <button>
                    <a href={project.repo} target="_blank" rel="noreferrer">
                      Ver repositório
                    </a>
                  </button>
                </div>
                <button
                  className={styles.buttonToDeleteProject}
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <BsTrash size={19} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalNewProjectIsOpen === true && (
        <AddProjectModal closeModal={handleCloseModalNewProject} reloadProjects={loadProjects} />
      )}
    </>
  );
}
