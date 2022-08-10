import { useState } from 'react';

import styles from './styles.module.scss';

import { FaGithubSquare } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

export default function ContributorsBox(info) {
   const [contributorsContent, setContributorsContent] = useState(false);


   function contributorInformations() {
      setContributorsContent(!contributorsContent)
   };

   return (
      <>
         {contributorsContent ?
            <div className={styles.containerOn} onClick={contributorInformations}>
               <div className={styles.box}>
                  <img src={info.img} alt="contribuidor" />
                  <span className={styles.contributorInfo}>
                     <p><strong>{info.name}</strong></p>
                  </span>
               </div>

               {contributorsContent ? <AiOutlineArrowUp size={30} /> : < AiOutlineArrowDown size={30} />}
            </div>
            :
            <div className={styles.container} onClick={contributorInformations}>
               <div className={styles.box}>
                  <img src={info.img} alt="contribuidor" />
                  <span className={styles.contributorInfo}>
                     <p><strong>{info.name}</strong></p>
                  </span>
               </div>

               {contributorsContent ? <AiOutlineArrowUp size={30} /> : < AiOutlineArrowDown size={30} />}
            </div>}

         {contributorsContent ?
            <div className={styles.contributorInfoBox} onClick={contributorInformations}>
               <p className={styles.contributorRole}><b>{info.role}</b></p>
               <p className={styles.aboutTheContributor}>{info.aboutMe}</p>
               <span className={styles.contactBox}>
                  <p>Contato:</p>
                  <a href={info.linkGH} target="_blank" rel="noreferrer">
                     <FaGithubSquare color="var(--black)"
                        size={30} />
                  </a>
                  <a href={info.linkIn} target="_blank" rel="noreferrer">
                     <BsLinkedin color="var(--blue-500)" size={26} />
                  </a>
               </span>
            </div>
            :
            ""
         }


      </>
   )



}