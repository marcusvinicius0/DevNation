import styles from './styles.module.scss';

import contributorOne from '../../assets/joao.png';
import contributorTwo from '../../assets/matheus.png';
import contributorThree from '../../assets/marcus.jpeg';

import bannerStar from '../../assets/bannerStar.png';

import ContributorsBox from '../../components/ContributorsBox';

export default function Contributors() {

   let contributors = [contributorOne, contributorTwo, contributorThree];

   return (
         <div className={styles.container}>
            <header>
               <h1>Desenvolvedores que fizeram esse projeto tornar realidade</h1>
               <img src={bannerStar} alt="banner" width={150} height={150} />
            </header>

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
               name="Matheus Santos"
               role="Front End Developer | JavaScript | ReactJS | Git "
               linkGH="https://github.com/devMatheus20"
               linkIn="https://www.linkedin.com/in/matheus-santos-souza/"
            />
            <hr />
            <ContributorsBox
               img={contributors[2]}
               name="Marcus Vinícius Begheli Santos"
               role="Desenvolvedor Front-end • NextJS | ReactJS | JavaScript"
               linkGH="https://github.com/marcusvinicius0"
               linkIn="https://www.linkedin.com/in/marcusviniciusbeghelisantos/"
            />

         </div>
   )
}