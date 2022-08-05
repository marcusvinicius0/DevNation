import { useEffect } from 'react';
import styles from './styles.module.scss';

import Header from '../../components/Header';

import contributorOne from '../../assets/joao.png';
import contributorTwo from '../../assets/marcus.jpeg';
import contributorThree from '../../assets/rafa.jpg';
import contributorFour from '../../assets/pedro.jpg';
import contributorFifth from '../../assets/matheus.png';

import bannerStar from '../../assets/bannerStar.png';

import ContributorsBox from '../../components/ContributorsBox';

export default function Contributors() {

   useEffect(() => {

      const goTop = () => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) };

      goTop();

   }, []);


   let contributors = [contributorOne, contributorTwo, contributorThree, contributorFour, contributorFifth];

   return (
      <>
         <Header />
         <div className={styles.container}>
            <header>
               <h1>Desenvolvedores que fizeram esse projeto se tornar realidade</h1>
               <img src={bannerStar} alt="banner" width={150} height={150} />
            </header><br />
            <h3>Criadores:</h3><br />

            <ContributorsBox
               img={contributors[0]}
               name="João Guilherme Souza Lima"
               role="Desenvolvedor Front End | JavaScript | VueJS | TypeScript | NextJS | ReactJS | NodeJS"
               linkGH="https://github.com/jguilhermesl"
               linkIn="https://www.linkedin.com/in/jguilhermesl/"
            />
            <hr />
            <ContributorsBox
               img={contributors[1]}
               name="Marcus Vinícius Begheli Santos"
               role="Desenvolvedor Front-end • NextJS | ReactJS | JavaScript"
               linkGH="https://github.com/marcusvinicius0"
               linkIn="https://www.linkedin.com/in/marcusviniciusbeghelisantos/"
            />
            <hr />
            <h3>Ideias, Revisão de código e Implementação de Funcionalidades:</h3><br />
            <ContributorsBox
               img={contributors[2]}
               name="Rafael Yokoyama 👋"
               role="Desenvolvedor Front End ReactJS | JavaScript | Typescript"
               linkGH="https://github.com/Rafael-Yokoyama"
               linkIn="https://www.linkedin.com/in/rafael-yokoyama/"
            />
            <hr />
            <ContributorsBox
               img={contributors[3]}
               name="Pedro Henrique da Silva "
               role="Desenvolvedor Front End | JavaScript | ReactJs | TypeScript | NodeJs | Redux"
               linkGH="https://github.com/Dev-Pedrosv"
               linkIn="https://www.linkedin.com/in/pedroh-dev/"
            />

            <hr />

            <h3>Ideias e ajuda no layout:</h3><br />

            <ContributorsBox
               img={contributors[4]}
               name="Matheus Santos"
               role="Front End Developer | JavaScript | ReactJS | Git "
               linkGH="https://github.com/devMatheus20"
               linkIn="https://www.linkedin.com/in/matheus-santos-souza/"
            />
         </div>
      </>
   )
}