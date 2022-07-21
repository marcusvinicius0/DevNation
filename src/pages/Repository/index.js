import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Header from "../../components/Header";

import { FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Repository({ match }) {
   const [repository, setRepository] = useState({});
   const [issues, setIssues] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {

      async function load() {
         const repoName = decodeURIComponent(match.params.repository);

         const [dataRepository, dataIssues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
               params: {
                  state: 'open',
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

   if (loading) {
      return (
         <div>
            <h1>Carregando...</h1>
         </div>
      )
   }

   return (
      <>
         <Header />

         <div className={styles.container}>

            <Link to="/repositories">
               <FaArrowLeft color="var(--black)" size={30} />
            </Link>

            <div className={styles.ownerBox}>
               <img src={repository.owner.avatar_url} alt={repository.owner.login} />
               <h1>{repository.name}</h1>
               <p>{repository.description}</p>
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
         </div>
      </>
   )
}