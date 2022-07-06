import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import PublicModal from '../../components/PublicationModal';

import { AiFillPicture } from 'react-icons/ai';
import { FiVideo } from 'react-icons/fi';
import { FaUsers, FaUserCircle } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { FaEnvelopeOpenText } from 'react-icons/fa';

import avatar from '../../assets/avatar.png';

import { AuthContext } from '../../contexts/auth';

export default function Dashboard() {
    const [showPostModal, setShowPostModal] = useState(false);

    const { signOut } = useContext(AuthContext);

    function togglePostModal() {
        setShowPostModal(!showPostModal)
    }

    return (
        <>
            <Header />

            <div className={styles.sideBox}>
                <img src={avatar} />
                <p className={styles.userName}>Marcus Vinícius Begheli Santos</p>
                <p className={styles.role}>Desenvolvedor Front-end • React.js</p>
                <hr />

                <div className={styles.routesBox}>

                    <Link to="/profile">
                        <span>
                            <FaUserCircle color="var(--soft-blue)" size={24} />
                            <p>Meu perfil</p>
                        </span>
                    </Link>

                    <span>
                        <FaUsers color="var(--soft-blue)" size={24} />
                        <p>Seguidores</p>
                    </span>

                    <span>
                        <FaEnvelopeOpenText color="var(--soft-blue)" size={22} />
                        <p>Meus projetos</p>
                    </span>

                    <span className={styles.logoutBox} onClick={signOut}>
                        <IoLogOut color="var(--soft-blue)" size={25} />
                        <p>Sair</p>
                    </span>
                </div>
            </div>

            <div className={styles.publicationContainer}>
                <div className={styles.contentBox}>
                    <img src={avatar} />
                    <button
                        onClick={() => togglePostModal()}
                        type="text"
                    >
                        No que você está pensando?
                    </button>
                </div>
                <span>
                    <AiFillPicture size={25} color="var(--soft-blue)" onClick={() => togglePostModal()} />
                    <FiVideo size={25} color="var(--soft-blue)" onClick={() => togglePostModal()} />
                </span>

                <div className={styles.feed}>

                </div>
            </div>



            {showPostModal && (
                <PublicModal
                    close={togglePostModal}
                />
            )}
        </>

    )
}