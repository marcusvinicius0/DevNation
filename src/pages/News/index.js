import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

import aprendaProgramar from '../../assets/images/aprenda-programar.png';
import qualLinguagem from '../../assets/images/qual-linguagem.png';
import qualLinguagemEscolher from '../../assets/images/qual-utilizar.png';
import Header from '../../components/Header';

export default function NewsPage() {
  useEffect(() => {
    const goTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    goTop();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <img src={aprendaProgramar} alt="aprende-programar" />
        <Link className={styles.buttonBack} to="/dashboard">
          <FaArrowLeft color="var(--soft-blue)" size={30} />
        </Link>

        <div className={styles.informationBox}>
          <h1>• 5 passos para aprender a programar</h1>

          <p>
            Está começando agora a sua carreira como programador? Ou então nem começou mas precisa
            de um “empurrãozinho” para dar o ponto de partida? Então da uma olhada nessas dicas que
            farão toda a diferença para você trilhar a sua jornada!
          </p>

          <h2>1 - Escolha uma linguagem de programação.</h2>
          <p>
            Em diversos grupos, redes sociais ou em qualquer tipo de comunidade de
            estudantes/programadores uma das maiores dúvidas de qualquer pessoa que está começando
            é:
          </p>

          <img className={styles.qualLinguagem} src={qualLinguagem} alt="qual-linguagem-escolher" />

          <p>
            Para esse tipo de pergunta, é bem comum obtermos diversas respostas, como por exemplo,
            C, Java, C#, C++, Ruby, Python, PHP, JavaScript entre diversas linguagens que temos
            atualmente.
            <br />
            <br />
            Entretanto, quando estamos começando, a linguagem em si não importa, pois a lógica é a
            mesma para todas as linguagens!
            <br />
            <br />
            Nesse exato momento, você pode estar se perguntando:
          </p>

          <img
            className={styles.qualEscolher}
            src={qualLinguagemEscolher}
            alt="qual-linguagem-escolher"
          />

          <p>
            Teoricamente sim, porém, na prática, recomendo fortemente que escolha uma linguagem que
            tenha menos barreiras na curva de aprendizagem.
            <br />
            <br />
            Em outras palavras, linguagens como por exemplo o JavaScript, que pode ser escrito em
            qualquer editor de texto e executado em qualquer navegador (até mesmo o IE em versões
            não tão antigas), é uma ótima escolha, pelos seguintes motivos:
            <br />
            <br />
            • Não precisa instalar uma ferramenta específica para codificar.
            <br />
            <br />• É uma linguagem de fácil aprendizagem.
          </p>

          <a
            href="https://sujeitoprogramador.com/5-passos-para-aprender-programar/"
            target="_blank"
            rel="noreferrer"
          >
            Ler mais
          </a>
        </div>
      </div>
    </>
  );
}
