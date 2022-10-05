import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from './styles.module.scss';

import bannerTecno from '../../assets/banners/banner-tecno.jpg';
import Header from '../../components/Header';
import { Opportunitie } from './Opportunitie';
import { SelectComponent } from './Select';

const levels = ['Júnior', 'Pleno', 'Sênior', 'Tech Leader'];
const places = ['Remoto', 'Home office', 'Híbrido'];
const types = ['Integral', 'Meio período', 'Contrato', 'Freelancer', 'Estágio'];

export default function Opportunities() {
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
        <div className={styles.headerOpportunities}>
          <img src={bannerTecno} alt="Banner tecnologia" />
          <div className={styles.textHeaderOpportunities}>
            <h1>Vagas na área de tecnologia!</h1>
            <p>
              Está na busca de um novo emprego na área de tecnologia? Vem que a gente da Dev Social
              Network te ajuda!
            </p>
          </div>
        </div>

        <div className={styles.contentOpportunities}>
          <div className={styles.opportunityFilter}>
            <form>
              <input placeholder="Pesquisar por cargo" />
              <button>
                <AiOutlineSearch /> Procurar vagas
              </button>
            </form>
            <div className={styles.selectFilters}>
              <SelectComponent title="Experiência" options={levels} />
              <SelectComponent title="Presencial/remoto" options={places} />
              <SelectComponent title="Tipo de vaga" options={types} />
            </div>
          </div>

          <div className={styles.opportunities}>
            <Opportunitie />
            <Opportunitie />
            <Opportunitie />
            <Opportunitie />
          </div>
        </div>
      </div>
    </>
  );
}
