import { useEffect } from 'react';
import styles from './styles.module.scss';

import Header from '../../components/Header';

import { FaArrowLeft } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import developers from '../../assets/developers.jpg';

export default function NewsDevelopers() {

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
                <img src={developers} alt="pessoas-programando" />

                <div className={styles.informationBox}>
                    <h1>• 5 razões porque faltam desenvolvedores de softwares no Brasil</h1>

                    <p>
                        Educação pouco eficaz, poucas (e pequenas) empresas de tecnologia, além de "salários pouco atrativos", são entre as causas, diz desenvolvedor Pedro Moura.
                    </p>

                    <p>
                        Segundo a mais recente pesquisa da Associação das Empresas de Tecnologia da Informação e Comunicação e de Tecnologias Digitais (Brasscom), o Brasil vai ter em breve um grave déficit de <strong>desenvolvedores de softwares.</strong>
                    </p>

                    <p>
                        Para a Brasscom, empregos na área de Tecnologia da Informação e Comunicação (TIC), entre os quais os desenvolvedores de software, cresceram 14,4% em 2021.
                    </p>

                    <p>
                        Uma alta mais do que o dobro do quanto registrado em outros setores econômicos.
                        <br />
                        <br />
                        Até 2025, o Brasil pode enfrentar déficit anual de 159 mil <strong>desenvolvedores de software</strong> e serviços de tecnologia da informação (TI).
                        <br />
                        <br />
                        Isso em um cenário onde esse rápido crescimento da demanda chegará a 800 mil unidades.
                    </p>
                    <br />
                    <h2>Oferta de mão de obra não acompanha a demanda</h2>

                    <p>
                        O problema é muito simples: a oferta de mão de obra não acompanha a demanda por parte do mercado.

                        Há muitos poucos desenvolvedores de software no Brasil em relação ao número necessário.

                        E boa parte desses poucos desenvolvedores de software formados no Brasil acabam preferindo trabalhar fora do país.

                        Principalmente por causa da atração por salários elevados pagos em moedas mais fortes do que o real, como <strong>euro</strong> ou <strong>dólar</strong>.

                        É por isso que muitas empresas estão enfrentando um cenário comum: profissionais de TI que pedem demissão para ir trabalhar no exterior.

                        Ou até para permanecer no Brasil, ganhando em divisa estrangeira.
                    </p>
                    <br />

                    <h2>Fuga de cérebros digitais do Brasil</h2>

                    <p>Mas quais são as causas dessa "fuga de cérebros digitais" do Brasil?</p>

                    <p>
                        Segundo o jovem Pedro Moura, desenvolvedor de São José dos Campos (SP), existem cinco razões para essa escassez de mão de obra qualificada no setor de TI.
                    </p>
                    <br />
                    <h3>1 - Educação pouco eficaz</h3>

                    <p>
                        Até mesmo antes da questão salarial existe um problema educacional.

                        Além dos poucos profissionais formados todos os anos, existe um problema de baixa qualificação dos desenvolvedores de softwares que saem das faculdades brasileiras.

                        "O mercado está cada vez mais se aprimorando, mas o ensino no Brasil permanece estagnado. Com isso, muitos profissionais saem da faculdade totalmente despreparados para o mercado de trabalho", explica Moura.

                        Com isso, a escassez de mão de obra qualificada no setor de TI acaba piorando cada ano mais.
                    </p>
                    <br />

                    <h3>2 - Distância entre a teoria e a prática</h3>

                    <p>
                        As faculdades de tecnologia ou as escolas técnicas muitas vezes permanecem teóricas demais, não conseguindo preparar os alunos para as exigências do mercado.

                        "Existe um abismo no que é ensinado na formação e o que o mercado está buscando. Surgiram vários cursos de curta duração mas que não resolvem o problema", salienta Moura.

                        "Com isso, as empresas são forçadas a suprir internamente a essas falhas. Ou até a buscar profissionais antes da formação e fornecer o ensino do profissional. Eu sei bem disso pois quando estava na faculdade isso acontecia com frequência", salienta Moura.
                    </p>
                    <br />

                    <h3>3 - Salários pouco atrativos</h3>

                    <p>
                        Com a pandemia, ficou claro que desenvolvedor de softwares é extremamente importante para as empresas.

                        Por isso, os salários dos desenvolvedores começaram a subir no mundo inteiro.

                        "Muitos desenvolvedores brasileiros buscam empregos fora do Brasil por questões de experiência e salários, recebendo em euro ou dólar", explica Moura.

                        Nesse caso fica difícil se competitivos com empresas estrangeiras em termos econômicos.

                        "Afinal, quem não quer ganhar em dólar e gastar em reais?", explica o desenvolvedor.
                    </p>
                    <br />

                    <h3>4 - Desenvolvedores parados no tempo</h3>

                    <p>
                        Mas existe um outro fator também relevante e pouco discutido no mercado de trabalho: a falta de interesse dos desenvolvedores de softwares em se atualizar.
                    </p>
                    <p>
                        "Muitos colegas simplesmente não querem se aprimorar. Por ter mais demanda do que mão de obra disponível, muitos desenvolvedores simplesmente param no tempo. Isso também dificulta o cenário. Especialmente em um setor, como o nosso, onde as atualizações não são apenas diárias, são basicamente a cada hora", explica Moura.
                    </p>
                    <br />

                    <h3>5 - Empresas gringas mais avançadas</h3>

                    <p>
                        As maiores empresas dos Estados Unidos ou da Europa são empresas de tecnologia.

                        Elas não somente são mais capitalizadas, mas também desenvolvem os projetos mais interessantes e entusiasmantes para os desenvolvedores.
                    </p>

                    <p>
                        "No Brasil, nossas maiores empresas são produtoras de commodities. E isso obviamente tem um desfecho mais limitado para um profissional de TI. Mais uma razão para os desenvolvedores brasileiros preferirem trabalhar com empresas de fora", conclui Moura.
                    </p>
                </div>
            </div>
        </>
    )
}