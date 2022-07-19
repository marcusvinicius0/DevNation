import { useContext, useEffect, useState } from "react";
import styles from './styles.module.scss';

import firebase from 'firebase';
import { AuthContext } from '../../contexts/auth';

import { BsThreeDots } from 'react-icons/bs';
// import { isPast, format } from "date-fns";
// import ptBR from 'date-fns/locale/pt-BR';

export default function Feed() {
	const [publications, setPublications] = useState([])
	const { user } = useContext(AuthContext);

	useEffect(() => {

		async function loadPublications() {

			await firebase.firestore().collection('publications')
				.orderBy('created', 'desc')
				.get()
				.then((snapshot) => {
					let arrayPublications = [];

					snapshot.forEach(async (doc) => {
						await firebase.firestore().collection('users')
							.doc(doc.data().user_id)
							.get()
							.then((snap) => {
								let data = {
									created: doc.data().created,
									publication: doc.data().publication,
									user_id: doc.data().user_id,
									user_name: snap.data().name,
									user_role: snap.data().role,
									avatarUrl: snap.data().avatarUrl,
									bannerUrl: snap.data().bannerUrl,
									id: doc.id
								}
								arrayPublications.push(data)
							})
					})
					setPublications(arrayPublications)
				})
		}

		loadPublications();

	}, []);

	return (
		<div className={styles.feed}>

			{publications.map((publication) => {
				return (
					<div key={publication.id} className={styles.post}>
						<header>
							<img src={publication.avatarUrl} alt="Avatar foto" />
							<div>
								<span >{publication.user_name}</span>
								<p>{publication.user_role}</p>
								<time>Há 1h</time>
							</div>
						</header>
						<div className={styles.contentPost}>
							<p>{publication.publication}</p>
						</div>
					</div>
				)
			})}

		</div>
	)
}