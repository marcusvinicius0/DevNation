import { useCallback, useState, useEffect } from 'react';
import styles from './styles.module.scss';

import Header from '../../components/Header';
import ChatModal from '../../components/ChatModal';

import githubLogo from '../../assets/github.png';

import { AiOutlinePlus } from 'react-icons/ai';
import { FaSpinner, FaBars, FaTrash } from 'react-icons/fa';

import api from '../../services/api';
import { toast } from 'react-toastify';

export default function Repositories() {
   const [text, setText] = useState('');
   const [repositories, setRepositories] = useState([]);
   const [loading, setLoading] = useState(false);
   const [alert, setAlert] = useState(null);

   // buscar
   useEffect(() => {
      const repoStorage = localStorage.getItem('repos');

      if (repoStorage) {
         setRepositories(JSON.parse(repoStorage));
      }
   }, []);

   //salvar
   useEffect(() => {
      localStorage.setItem('repos', JSON.stringify(repositories));
   }, [repositories]);


   const handleSubmit = useCallback((e) => {
      e.preventDefault();

      async function submit() {
         setLoading(true);
         setAlert(null);
         try {
            if (text === "") {
               setAlert(true);
               toast.warning("Você precisa indicar um repositório.");
               throw new Error("Você precisa indicar um repositório!");
            }

            const response = await api.get(`repos/${text}`);

            const hasRepository = repositories.find(repo => repo.name === text);

            if (hasRepository) {
               setAlert(true);
               toast.warning("Repositório duplicado");
               setText("");
               throw new Error("Repositório duplicado");
            }

            const data = {
               name: response.data.full_name,
            }

            setRepositories([...repositories, data]);
            setText('');
         } catch (error) {
            setAlert(true);
            console.log(error);
         } finally {
            setLoading(false);
         }
      }

      submit();

   }, [text, repositories]);

   function handleInputChange(e) {
      setText(e.target.value);
      setAlert(null);
   }

   const handleDelete = useCallback((repo) => {
      const find = repositories.filter(r => r.name !== repo);
      setRepositories(find);

   }, [repositories]);

   return (
      <>
         <Header />

         <div className={styles.container}>
            <span>
               <h1>Encontre repositórios</h1>
               <img src={githubLogo} alt="github" width={30} height={30} />
            </span>
            <hr /> 

            <div className={styles.searchBox}>
               <img src={githubLogo} alt="github" width={30} height={30} />

               <span>
                  <form onSubmit={handleSubmit} error={alert}>
                     {alert ? <input
                        type="text"
                        className={styles.errorInput}
                        placeholder="Adicionar repositórios"
                        value={text}
                        onChange={handleInputChange}
                     /> :
                        <input
                           type="text"
                           placeholder="Adicionar repositórios"
                           value={text}
                           onChange={handleInputChange}
                        />
                     }

                     {loading ?
                        <button className={styles.buttonOff} type="submit" disabled>
                           <FaSpinner size={20} color="var(--white)" />
                        </button>
                        :
                        <button type="submit">
                           <AiOutlinePlus size={20} color="var(--white)" />
                        </button>
                     }
                  </form>
               </span>
            </div>

            <div className={styles.repositoriesBox}>
               {repositories.map(repo => (
                  <li key={repo.name}>
                     <span>
                        <button type="button" onClick={() => handleDelete(repo.name)}>
                           <FaTrash size={14} color="var(--red-500)" />
                        </button>
                        {repo.name}
                     </span>
                     <a href="">
                        <FaBars size={20} />
                     </a>
                  </li>
               ))}
            </div>
         </div>

         <ChatModal />
      </>
   )
}