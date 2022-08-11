import styles from './styles.module.scss';

import bannerDiscord from '../../assets/bannerDiscord.png';

export default function JoinDiscord() {
  return (
    <a href="https://discord.gg/Etr3waVrhS" target="_blank" rel="noreferrer">
      <div className={styles.containerDiscord}>
        <img src={bannerDiscord} alt="Entrar no discord" />
      </div>
    </a>
  );
}
