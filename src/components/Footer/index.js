import styles from './styles.module.scss';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


export default function Footer() {
   return (
      <footer className={styles.footer}>
         <Link to="/documentation">Sobre o projeto</Link>
         <Link to="/contributors">Contribuidores</Link>
         <span>
            <img src={logo} alt="logo" width={100} height={40} />
            <p>DevSocial Corporation © 2022</p>
         </span>
      </footer>
   )
}