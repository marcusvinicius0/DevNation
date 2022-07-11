import styles from './styles.module.scss';

import logonews from '../../assets/logonews.png';

import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';

export default function NewsBox() {
    return (
        <div className={styles.container}>

            <div className={styles.logoBox}>
                <img src={logonews} alt="logo-news" />
                <hr />
            </div>

            <div className={styles.contentBox}>
                <div className={styles.box}>
                    <p>• 5 passos para aprender a programar</p>
                    <span>
                        <BsFillCalendarCheckFill size={18} color="var(--soft-gray)" />
                        <p>21 de março de 2021</p>
                        <HiOutlinePencilAlt size={18} color="var(--soft-gray)"/>
                        <p>sujeito programador</p>
                    </span>
                </div>
                <div className={styles.box}>
                    <p>• 5 passos para aprender a programar</p>
                    <span>
                        <BsFillCalendarCheckFill size={18} color="var(--soft-gray)" />
                        <p>21 de março de 2021</p>
                        <HiOutlinePencilAlt size={18} color="var(--soft-gray)"/>
                        <p>sujeito programador</p>
                    </span>
                </div>
                <div className={styles.box}>
                    <p>• 5 passos para aprender a programar</p>
                    <span>
                        <BsFillCalendarCheckFill size={18} color="var(--soft-gray)" />
                        <p>21 de março de 2021</p>
                        <HiOutlinePencilAlt size={18} color="var(--soft-gray)"/>
                        <p>sujeito programador</p>
                    </span>
                </div>
                <div className={styles.box}>
                    <p>• 5 passos para aprender a programar</p>
                    <span>
                        <BsFillCalendarCheckFill size={18} color="var(--soft-gray)" />
                        <p>21 de março de 2021</p>
                        <HiOutlinePencilAlt size={18} color="var(--soft-gray)"/>
                        <p>sujeito programador</p>
                    </span>
                </div>
                <div className={styles.box}>
                    <p>• 5 passos para aprender a programar</p>
                    <span>
                        <BsFillCalendarCheckFill size={18} color="var(--soft-gray)" />
                        <p>21 de março de 2021</p>
                        <HiOutlinePencilAlt size={18} color="var(--soft-gray)"/>
                        <p>sujeito programador</p>
                    </span>
                </div>
                
            </div>

        </div>
    )
}