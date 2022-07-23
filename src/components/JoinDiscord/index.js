import styles from './styles.module.scss'

import bannerDiscord from '../../assets/bannerDiscord.png'

export default function JoinDiscord() {
	return(
		<div className={styles.containerDiscord}>
			<img src={bannerDiscord} alt="Entrar no discord" />
		</div>
	)
}