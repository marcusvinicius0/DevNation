import { useState } from 'react';
import styles from './styles.module.scss'
import firebase from 'firebase';

import Header from '../../components/Header'
import AddProjectModal from '../../components/AddProjectModal'

import { FiPlus } from 'react-icons/fi';

export default function MyProjects() {
   const [modalNewProjectIsOpen, setModalNewProjectIsOpen] = useState(false)

   function handleCloseModalNewProject() {
      setModalNewProjectIsOpen(false)
   }

   function handleOpenModalNewProject() {
      setModalNewProjectIsOpen(true)
   }

   return (
      <>
         <Header />
         <div className={styles.containerMyProjects}>
            <header>
               <h1>Meus projetos</h1>
               <button onClick={handleOpenModalNewProject}>
                  <FiPlus />
                  <span>Adicionar projeto</span>
               </button>
            </header>
         </div> 
      </>
   )
}