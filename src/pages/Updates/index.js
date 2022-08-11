import { useEffect } from 'react';
import { MdNewReleases } from 'react-icons/md';
import styles from './styles.module.scss';

import Header from '../../components/Header';
import Accordion from './accordion';
import { allUpdates } from './updates';

export default function Updates() {
  useEffect(() => {
    const goTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    goTop();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.containerUpdates}>
        <header>
          <h1>Últimas atualizações da rede</h1>
          <MdNewReleases size={30} color="var(--black)" />
        </header>
        <div>
          {allUpdates.map((update, index) => (
            <Accordion update={update} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
