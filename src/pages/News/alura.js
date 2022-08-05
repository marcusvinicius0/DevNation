import { useEffect } from 'react';
import styles from './styles.module.scss';

import Header from '../../components/Header';

import { FaArrowLeft } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import aluraCurso from '../../assets/alura-curso.png';

export default function NewsAlura() {

    useEffect(() => {

        const goTop = () => { window.scrollTo({ top: 0, left: 0, behavior: 'auto'})};
  
        goTop();
  
     }, []);
  

    return (
        <>
            <Header />
            <div className={styles.container}>
                <Link className={styles.buttonBack} to="/dashboard">
                    <FaArrowLeft color="var(--soft-blue)" size={30} />
                </Link>
                <img src={aluraCurso} alt="tela-com-código" />

                <div className={styles.informationBox}>
                    <h1>• Alura abre 30 mil vagas para curso gratuito de Java</h1>

                    <p>
                        Segundo índice da TIOBE Programming Community, que mede a popularidade das linguagens de programação, Java é a mais utilizada no mundo por pessoas desenvolvedoras de software.
                        <br />
                        <br />
                        De olho nisso, a Alura, unidade de negócios do Grupo Alura, comunidade de aprendizado em tecnologia, está abrindo inscrições para a sua primeira Imersão <strong>Java</strong>.
                    </p>

                    <p>
                        Serão cinco aulas gratuitas, entre os dias 18 e 23 de julho, para pessoas em nível iniciante aprenderem a construir do zero seu primeiro projeto em <strong>Java</strong>, adicioná-los em seu portfólio e dar um upgrade na carreira. A expectativa é atrair cerca de 30 mil inscritos.
                        <br />
                        <br />
                        Esta é a primeira imersão <strong>back-end</strong> sobre o tema promovida pela Alura, mas neste ano a edtech já promoveu uma Imersão em Dev, além da Imersão de Dados.  Ao todo, mais de 500 mil pessoas foram impactadas pelas imersões da Alura, que iniciou o projeto no começo da pandemia.
                        <br />
                        <br />
                        As pessoas inscritas terão conhecimentos de como iniciar sua carreira em <strong>Java</strong>, incluindo aprendizados como: construir uma aplicação do zero, entender como melhorar o código para torná-lo mais flexível e fácil, utilizar banco de dados NoSQL, tornar uma aplicação acessível por qualquer profissional e finalizar um projeto completo para utilizá-lo em um portfólio profissional.
                        <br />
                        <br />
                        "Essa imersão é especial, afinal, a Alura nasceu de um fórum de usuários de <strong>Java</strong> (GUJ) e, posteriormente, o tema se tornou uma série de apostilas, utilizada até hoje. Essa linguagem de programação dá início à história da empresa, quando ela ainda se chamava Caelum, mas segue como referência nos dias de hoje”, diz Paulo Silveira, CEO do Grupo Alura.
                        <br />
                        <br />
                        Além Silveira, bacharel em Ciência da Computação e Mestre pela USP em Geometria computacional, a grade da Imersão <strong>Java</strong> conta com um time experiente de profissionais. São eles: Jacqueline Oliveira, engenheira de Software formada em Ciência da Computação e pós-graduada em Arquitetura e Engenharia de Software ee Alexandre Aquiles, desenvolvedor de software desde 2005 e professor de programação desde 2013.
                        <br />
                        <br />
                        As inscrições para a Imersão <strong>Java</strong> já estão abertas e os interessados podem se inscrever de forma gratuita, basta acessar o site da Alura e incluir informações como nome completo e e-mail.
                    </p>

                    <a href="https://www.alura.com.br/imersao-java?version=java2" target="_blank">
                        Acessar site da Alura
                    </a>
                </div>
            </div>
        </>
    )
}