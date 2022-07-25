import styles from './styles.module.scss';

import Header from '../../components/Header';

import Footer from "../../components/Footer";

export default function About() {
   return (
      <>
         <Header />
         <div className={styles.aboutContainer}>
            <Footer />
         </div>
      </>
   )
}