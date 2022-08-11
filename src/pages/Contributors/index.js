import { useEffect } from 'react';
import styles from './styles.module.scss';

import bannerStar from '../../assets/bannerStar.png';
import contributorOne from '../../assets/joao.png';
import contributorTwo from '../../assets/marcus.jpeg';
import contributorFifth from '../../assets/matheus.png';
import contributorFour from '../../assets/pedro.jpg';
import contributorThree from '../../assets/rafa.jpg';
import ContributorsBox from '../../components/ContributorsBox';
import Header from '../../components/Header';

export default function Contributors() {
  useEffect(() => {
    const goTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    goTop();
  }, []);

  const contributors = [
    contributorOne,
    contributorTwo,
    contributorThree,
    contributorFour,
    contributorFifth,
  ];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <header>
          <h1>Desenvolvedores que fizeram esse projeto se tornar realidade</h1>
          <img src={bannerStar} alt="banner" width={150} height={150} />
        </header>
        <br />
        <h3>Fundadores:</h3>
        <br />

        <ContributorsBox
          img={contributors[0]}
          name="João Guilherme Souza Lima"
          roles="Desenvolvedor Front End | JavaScript | VueJS | TypeScript | NextJS | ReactJS | NodeJS"
          linkGH="https://github.com/jguilhermesl"
          linkIn="https://www.linkedin.com/in/jguilhermesl/"
          aboutMe="Desenvolvedor Full-Stack:
               👨‍💻 Possuo experiência na área de Full-Stack, com as tecnologias de 𝙎𝘼𝙎𝙎, 𝙏𝙮𝙥𝙚𝙎𝙘𝙧𝙞𝙥𝙩, 𝙍𝙚𝙖𝙘𝙩𝙅𝙎, 𝙉𝙚𝙭𝙩𝙅𝙎, 𝙉𝙤𝙙𝙚𝙅𝙎 e 𝙑𝙪𝙚𝙅𝙎, aplicando em projetos para a criação de sites e aplicações conforme o requisitado. Atuação com 𝙚𝙢𝙥𝙧𝙚𝙨𝙖𝙨 𝙙𝙚 𝙖𝙨𝙨𝙞𝙨𝙩𝙚̂𝙣𝙘𝙞𝙖 𝙩𝙚́𝙘𝙣𝙞𝙘𝙖, 𝙚𝙢𝙥𝙧𝙚𝙨𝙖 𝙙𝙚 𝙨𝙤𝙡𝙪𝙘̧𝙤̃𝙚𝙨 𝙩𝙚𝙘𝙣𝙤𝙡𝙤́𝙜𝙞𝙘𝙖𝙨, 𝙖𝙜𝙚̂𝙣𝙘𝙞𝙖𝙨 𝙙𝙚 𝙢𝙖𝙧𝙠𝙚𝙩𝙞𝙣𝙜, 𝙖𝙙𝙫𝙤𝙘𝙖𝙘𝙞𝙖𝙨 𝙚 𝙘𝙤𝙣𝙩𝙖𝙗𝙞𝙡𝙞𝙙𝙖𝙙𝙚𝙨 𝙣𝙤 𝙙𝙚𝙨𝙚𝙣𝙫𝙤𝙡𝙫𝙞𝙢𝙚𝙣𝙩𝙤 𝙙𝙚 𝙡𝙖𝙣𝙙𝙞𝙣𝙜 𝙥𝙖𝙜𝙚𝙨 e 𝙨𝙞𝙨𝙩𝙚𝙢𝙖𝙨."
        />
        <hr />
        <ContributorsBox
          img={contributors[1]}
          name="Marcus Vinícius Begheli Santos"
          roles="Desenvolvedor Front-end • ReactJS | Typescript | Javascript"
          linkGH="https://github.com/marcusvinicius0"
          linkIn="https://www.linkedin.com/in/marcusviniciusbeghelisantos/"
          aboutMe="👇 +08 meses de experiência na área de desenvolvimento. Sou fascinado pelo impacto que a tecnologia causa sobre nossa sociedade em todos os âmbitos. Amo desenvolver aplicações que me desafiam a estar sempre buscando novas soluções, pensando fora da caixa e agregando mais valor ainda para a experiência final do usuário.
               "
        />
        <hr />
        <h3>Ideias, Revisão de código e Implementação de Funcionalidades:</h3>
        <br />
        <ContributorsBox
          img={contributors[2]}
          name="Rafael Yokoyama 👋"
          roles="Desenvolvedor Front End ReactJS | JavaScript | Typescript"
          linkGH="https://github.com/Rafael-Yokoyama"
          linkIn="https://www.linkedin.com/in/rafael-yokoyama/"
          aboutMe="Profissional com mais de um ano de experiência nas áreas de programação, desenvolvimento frontend de sistemas web e mobile, manutenções e aplicações destes sistemas , auxílio na especificação e desenvolvimento de novos sistemas em ambientes virtuais em empresas de médio e grande porte dos segmentos de saúde, fintech, varejo e ensino."
        />
        <hr />
        <ContributorsBox
          img={contributors[3]}
          name="Pedro Henrique da Silva "
          roles="Desenvolvedor Front End | JavaScript | ReactJs | TypeScript | NodeJs | Redux"
          linkGH="https://github.com/Dev-Pedrosv"
          linkIn="https://www.linkedin.com/in/pedroh-dev/"
          aboutMe="2 anos de experiência em desenvolvimento.
               Trabalho como desenvolvedor Front End utilizando ReactJs, estou alocando em um projeto para faturação do sistema legado e também desenvolvendo novas funcionalidades para aplicação de uma grande corretora de câmbio no Brasil que suporta transações multimilionárias diariamente."
        />

        <hr />

        <h3>Ideias e ajuda no layout:</h3>
        <br />

        <ContributorsBox
          img={contributors[4]}
          name="Matheus Santos"
          roles="Front End Developer | JavaScript | ReactJS | Git "
          linkGH="https://github.com/devMatheus20"
          linkIn="https://www.linkedin.com/in/matheus-santos-souza/"
          aboutMe="➡️ Desenvolvedor 𝗙𝗿𝗼𝗻𝘁-𝗘𝗻𝗱, com noções de 𝗕𝗮𝗰𝗸-𝗲𝗻𝗱, e com foco em ser 𝗙𝘂𝗹𝗹-𝗦𝘁𝗮𝗰𝗸.

               Atualmente possuo experiência na área de 𝗙𝗿𝗼𝗻𝘁-𝗘𝗻𝗱, com as tecnologias: 𝐇𝐓𝐌𝐋, 𝐂𝐒𝐒, 𝐉𝐚𝐯𝐚𝐒𝐜𝐫𝐢𝐩𝐭, 𝐆𝐢𝐭/𝐆𝐢𝐭𝐡𝐮𝐛, 𝐑𝐞𝐚𝐜𝐭𝐉𝐒, 𝗦𝘁𝘆𝗹𝗲𝗱-𝗖𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁𝘀, 𝗦𝗰𝗿𝘂𝗺, entre outras, aplicando em projetos para a criação de sites e aplicações conforme o requisitado."
        />
      </div>
    </>
  );
}
