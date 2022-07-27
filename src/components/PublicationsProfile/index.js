import styles from './styles.module.scss';

import { BiMessageRounded, BiHeart, BiShare, BiBookmark } from 'react-icons/bi';

import avatar from '../../assets/avatar.png';

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "react-toastify";

import { usePublications } from '../../hooks/usePublications';

export default function PublicationsProfile({ publications, user }) {
	const { likePublication } = usePublications();

	return (
		<div className={styles.publicationsProfile}>
			<h3>Minhas publicações</h3>
			{publications.map((publication) => (
				<div key={publication.id} className={styles.post}>
					<header>
						<img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Avatar foto" />
						<div>
							<span>{user.name}</span>
							<p>{user.role}</p>
							<time>{format(new Date(publication.created.seconds * 1000), "EEEE ' • 'd' de 'MMMM' • 'k'h'mm'", {
								locale: ptBR
							})}</time>
						</div>
					</header>
					<div className={styles.contentPost}>
						<p>{publication.publication}</p>
					</div>
					{publication.imagePublicationUrl && (
						<div className={styles.mediaPost}>
							<img src={publication.imagePublicationUrl} alt="Foto post" />
						</div>)}

					<footer>
						<button onClick={() => likePublication(user.uid, publication.id)}><BiHeart /><span>0</span></button>
						<button onClick={() => toast.warning("Em breve...")}><BiMessageRounded /><span>0</span></button>
						<button onClick={() => toast.warning("Em breve...")}><BiShare /><span>0</span></button>
						<button onClick={() => toast.warning("Em breve...")}><BiBookmark /><span>0</span></button>
					</footer>
				</div>
			))}
			{publications.length === 0 && (
				<p>Sem publicações.</p>
			)}
		</div>
	)
}