import styles from './styles.module.scss';

import ChatModal from '../../components/ChatModal';

import { FaArrowLeft } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import projetoLei from '../../assets/projeto-lei.jpg';

export default function NewsLawProject() {
    return (
        <>
            <div className={styles.container}>
                <Link className={styles.buttonBack} to="/dashboard">
                    <FaArrowLeft color="var(--soft-blue)" size={30} />
                </Link>
                <img src={projetoLei} alt="mulher-trabalhando" />

                <div className={styles.informationBox}>
                    <h1>• Projeto de lei quer obrigar empresa a informar salário em anúncio de vagas</h1>

                    <p>
                        Uma das frustrações de muita gente em busca de emprego pode estar chegando ao fim: um projeto de lei (PL 1149/22) em tramitação na Câmara dos Deputados quer tornar obrigatório que as empresas públicas e privadas informem a faixa salarial em seus anúncios de vagas. Em caso de descumprimento, a multa será de cinco salários mínimos. Segundo o UOL, o projeto será analisado pela Comissão de Trabalho, Administração e Serviço Público e pela Comissão de Constituição, Justiça e Cidadania. Se aprovado, segue direto para o Senado.
                    </p>

                    <p>
                        Embora possa agradar os profissionais, advogados ouvidos pelo Valor afirmam que a divulgação dos salários pode causar problemas para as empresas ao expor dados possivelmente estratégicos aos concorrentes. A cidade de Nova York aprovou uma lei semelhante – mas a medida, que entraria em vigor em maio, foi adiada para novembro após pressão das empresas.
                    </p>

                    <a
                        href="https://www.linkedin.com/news/storyprojeto-de-lei-quer-obrigar-empresa-a-informar-sal%C3%A1rio-em-an%C3%BAncio-de-vagas-4830569/" target="_blank"
                    >
                        Ler comentários
                    </a>
                </div>

            </div>

            <ChatModal />
        </>
    )
}