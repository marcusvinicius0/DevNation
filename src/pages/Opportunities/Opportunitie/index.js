import { Link } from 'react-router-dom';

import { BsWalletFill } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { FaBuilding, FaRegMoneyBillAlt } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { HiLocationMarker } from 'react-icons/hi';
import { RiPlaneFill } from 'react-icons/ri';
import logo from '../../../assets/logo/zenvia-logo.jpg';
import styles from './styles.module.scss';

export function Opportunitie() {
  return (
    <Link to="/" className={styles.contentOpportunitie}>
      <img src={logo} alt="logo" />
      <div className={styles.contentInfoOpportunitie}>
        <h1>Desenvolvedor Front End Júnior</h1>
        <div className={styles.infos}>
          <span>
            <BsWalletFill /> <p>MB Labs</p>
          </span>
          <span>
            <HiLocationMarker /> <p>Remoto</p>
          </span>
          <span>
            <FaBuilding /> <p>Pequena/Média empresa</p>
          </span>
          <span>
            <FaRegMoneyBillAlt /> <p>Até R$10.000</p>
          </span>
          <span>
            <GoGraph /> <p>Pleno</p>
          </span>
          <span>
            <CgFileDocument />
            <p>PJ</p>
          </span>
          <span>
            <RiPlaneFill />
            <p>Aceita candidatos de fora</p>
          </span>
        </div>
        <div className={styles.stacks}>
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
        </div>
      </div>
    </Link>
  );
}
