import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

import { FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Repository({ match }) {
   const [repository, setRepository] = useState({});
   const [issues, setIssues] = useState([]);
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [filters, setFilters] = useState([
      {state: 'all', label: 'Todas', active: true},
      {state: 'open', label: 'Abertas', active: false},
      {state: 'closed', label: 'Fechadas', active: false},
   ])
   const [filterIndex, setFilterIndex] = useState(0);

   useEffect(() => {

      async function load() {
         const repoName = decodeURIComponent(match.params.repository);

         const [dataRepository, dataIssues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
               params: {
                  state: filters.find(f => f.active).state,
                  per_page: 5
               }
            })
         ]);

         setRepository(dataRepository.data);
         setIssues(dataIssues.data);
         setLoading(false);
      }

      load()

   }, [match.params.repository]);

   useEffect(() => {

      async function loadIssue() {
         const repoName = decodeURIComponent(match.params.repository);

         const response = await api.get(`/repos/${repoName}/issues`, {
            params: {
               state: filters[filterIndex].state,
               page,
               per_page: 5
            },
         });

         setIssues(response.data);
      }

      loadIssue();

   }, [filterIndex, filters, match.params.repository, page]);

   function handlePage(action) {
      setPage(action === 'back' ? page - 1 : page + 1)
   }

   function handleFilter(index){
      setFilterIndex(index);
      console.log(filterIndex);
   }

   if (loading) {
      return (
         <div className={styles.loading}>
            <h1>Carregando...</h1>
         </div>
      )
   }

   return (
      <>

         <div className={styles.container}>

            <Link to="/repositories">
               <FaArrowLeft color="var(--black)" size={30} />
            </Link>

            <div className={styles.ownerBox}>
               <img src={repository.owner.avatar_url} alt={repository.owner.login} />
               <h1>{repository.name}</h1>
               <p>{repository.description}</p>
            </div>

            <div className={styles.filterBox}>
               {filters.map((filter, index) => (
                  <button
                  type="button"
                  key={filter.label}
                  onClick={() => handleFilter(index)}
                  >
                     {filter.label}
                  </button>
               ))}
            </div>

            <ul className={styles.issuesBox}>
               {issues.map(issue => (
                  <li key={String(issue.id)}>
                     <img src={issue.user.avatar_url} alt={issue.user.avatar_url} />

                     <div>
                        <strong>
                           <a href={issue.html_url}>{issue.title}</a>

                           {issue.labels.map(label => (
                              <span key={String(label.id)}>{label.name}</span>
                           ))}
                        </strong>

                        <p>{issue.user.login}</p>
                     </div>
                  </li>
               ))}
            </ul>

            <div className={styles.navigateBox}>
               <button
                  type="button"
                  onClick={() => handlePage('back')}
                  disabled={page < 2}
               >
                  Voltar
               </button>
               <button
                  type="button"
                  onClick={() => handlePage('next')}>
                  Proxima
               </button>
            </div>
         </div>
      </>
   )
}