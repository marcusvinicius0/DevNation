import styles from './styles.module.scss';

import Header from '../../components/Header';

import NewsBox from '../../components/NewsBox';
import ChatModal from '../../components/ChatModal';

import { FaArrowLeft } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import metaVerso from '../../assets/metaverso.jpg';

export default function NewsMetaVerso() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <Link className={styles.buttonBack} to="/dashboard">
                    <FaArrowLeft color="var(--soft-blue)" size={30} />
                </Link>
                <img src={metaVerso} alt="mulher-no-metaverso" />

                <div className={styles.informationBox}>
                    <h1>• Metaverso já movimenta R$ 1,3 trilhão, mostra pesquisa</h1>

                    <p>
                        Apesar da experiência do metaverso ainda estar em formação e continuar distante da realidade de muita gente, indústrias e produtos relacionados à imersão virtual já movimentam R$ 1,3 trilhão, segundo pesquisa da consultoria Boston Consulting Group (BCG). Embora não exista um ambiente único que defina o metaverso, produtos digitais em videogames, como o “skin”, ou visual, de personagens, e NFTs (em inglês, a sigla significa tokens não fungíveis) são alguns dos ativos mais negociados atualmente. Marcas também têm apostado em estratégias de imersão virtual para relacionamento com os consumidores. O grupo Alpargatas, dono da marca Havaianas, por exemplo, lançou uma coleção de NFTs e criou uma ilha em formato de chinelo no jogo Fortnite. No estudo do BCG, há estimativa de mais de R$ 2 trilhões em negociações relacionadas ao metaverso até 2025.
                    </p>

                    <a href="https://www.linkedin.com/news/story/metaverso-j%C3%A1-movimenta-r-13-trilh%C3%A3o-mostra-pesquisa-4832545/" target="_blank">
                        Ler comentários
                    </a>
                </div>
            </div>

            <ChatModal />
        </>
    )
}