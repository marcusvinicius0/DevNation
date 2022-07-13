import styles from './styles.module.scss';

import logonews from '../../assets/logonews.png';

import News from '../../pages/News';

import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function NewsBox() {
    return (
        <div className={styles.container}>

            <div className={styles.logoBox}>
                <img src={logonews} alt="logo-news" />
                <hr />
            </div>

            <div className={styles.contentBox}>
                <div className={styles.box}>
                    <p className={styles.title}>• 5 passos para aprender a programar</p>
                    <Link to="/news">
                        <span>
                            <BsFillCalendarCheckFill size={18} color="var(--soft-gray)" />
                            <p>21 de março de 2021</p>
                            <HiOutlinePencilAlt size={18} color="var(--soft-gray)" />
                            <p>sujeito programador</p>
                        </span>
                    </Link>
                </div>

                <div className={styles.box}>
                    <p className={styles.title}>• Alura abre 30 mil vagas para curso gratuito de Java</p>
                    <Link to="/news/alura">
                        <span>
                            <BsFillCalendarCheckFill size={18} color="var(--soft-gray)" />
                            <p>06 de julho de 2022</p>
                            <HiOutlinePencilAlt size={18} color="var(--soft-gray)" />
                            <p>exame.com</p>
                        </span>
                    </Link>
                </div>

                <div className={styles.box}>
                    <p className={styles.title}>
                        • Projeto de lei quer obrigar empresa a informar salário em anúncio de vagas
                    </p>
                    <Link to="/news/law-project">
                        <span>
                            <BsFillCalendarCheckFill size={18} color="var(--soft-gray)" />
                            <p>11 de julho de 2022</p>
                            <HiOutlinePencilAlt size={18} color="var(--soft-gray)" />
                            <p>Ana Prado, redação In notícias</p>
                        </span>
                    </Link>
                </div>

                <div className={styles.box}>
                    <p className={styles.title}>
                        • Metaverso já movimenta R$ 1,3 trilhão, mostra pesquisa
                    </p>
                    <Link to="/news/metaverso">
                        <span>
                            <BsFillCalendarCheckFill size={18} color="var(--soft-gray)" />
                            <p>11 de julho de 2022</p>
                            <HiOutlinePencilAlt size={18} color="var(--soft-gray)" />
                            <p>Luíza Granato, redação In notícias</p>
                        </span>
                    </Link>
                </div>

                <div className={styles.box}>
                    <p className={styles.title}>• 5 razões porque faltam desenvolvedores de softwares no Brasil</p>
                    <Link to="/news/developers-lack">
                        <span>
                            <BsFillCalendarCheckFill size={18} color="var(--soft-gray)" />
                            <p>17 de maio de 2022</p>
                            <HiOutlinePencilAlt size={18} color="var(--soft-gray)" />
                            <p>exame.com</p>
                        </span>
                    </Link>
                </div>

            </div>

        </div>
    )
}