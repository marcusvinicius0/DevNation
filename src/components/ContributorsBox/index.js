import styles from './styles.module.scss';

import { FaGithubSquare } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';

export default function ContributorsBox(info) {
   return (
      <>
         <div className={styles.box}>
            <img src={info.img} alt="contribuidor" />
            <span className={styles.contributorInfo}>
               <p>{info.name}</p>
               <p>{info.role}</p>
            </span>
         </div>

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
      </>
   )



}