import { createContext, useContext, useState } from 'react';

import firebase from 'firebase/app';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const PublicationsContext = createContext({});

export default function PublicationsProvider({ children }) {
	const [publications, setPublications] = useState([]);
	const [loadingPublications, setLoadingPublications] = useState(false);
	const [likes, setLikes] = useState([])

	async function loadPublications() {
		setLoadingPublications(true)
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
								imagePublicationUrl: doc.data().imagePublicationUrl,
								userIsVerified: snap.data().verified,
								likes: doc.data().likes,
								id: doc.id
							}
							arrayPublications.push(data);
						})
					setPublications(arrayPublications);
					setLoadingPublications(false);
				})
			})
	}

	async function handleSaveUserPublication(doc) {

		await firebase.firestore().collection('publications')
			.doc(doc.data().user_id)
			.get()
			.then(() => {
				let savedPubs = [];

				let data = {
					created: doc.data().created,
					publication: doc.data().publication,
					user_id: doc.data().user_id,
				}
				savedPubs(data);
				console.log(data);
			})


	}

	async function handleDeletePublication(id) {
		Swal.fire({
			title: 'Você tem certeza?',
			text: "A publicação será deletada!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#399BE5',
			cancelButtonColor: 'rgb(253, 33, 33)',
			confirmButtonText: 'Sim, deletar!'
		}).then(async (result) => {
			if (result.isConfirmed) {
				await firebase.firestore().collection('publications')
					.doc(id)
					.delete()
					.then(() => {
						loadPublications();
						toast.success('Publicação deletada com sucesso.')
					})
			}
		})
	};

	async function likePublication(user_id, publication_id) {
		console.log(user_id, publication_id)
		let arrayUsersLikes = []
		await firebase.firestore().collection("likes")
			.get()
			.then((snapshot) => {
				snapshot.forEach(async (doc) => {
					if (doc.data().user_id === user_id && doc.data().publication_id === publication_id) {
						await firebase.firestore().collection("likes")
							.doc(doc.id)
							.delete()
							.then(() => {
								console.log("Deletou")
							})
						return
					} 
					// if(doc.data().user_id !== user_id ){
					// 	await firebase.firestore().collection("likes")
					// 		.add({
					// 			publication_id,
					// 			user_id
					// 		})
					// 		.then(() => {
					// 			console.log("Deu like agora")
					// 		})
					// }
				})
			})
		// await firebase.firestore().collection("publications")
		// .doc(publication_id)
		// .get()
		// .then( async (snap) => {
		// 	let arrayUsersLikes = [];
		// 	if(snap.data().likes === undefined || snap.data().likes.length === 0) {
		// 		arrayUsersLikes.push(user_id)
		// 	} else {
		// 		await firebase.firestore().collection("publications")
		// 		.doc(publication_id)
		// 		.get()
		// 		.then( (res) => {
		// 			res.data().likes.forEach( (user_id_like) => {
		// 				if(user_id_like === user_id) {
		// 					// TODO: Desfazer like
		// 					const filterLikes = res.data().likes.filter( (like) => like !== user_id)
		// 					arrayUsersLikes = filterLikes
		// 				} else {
		// 					arrayUsersLikes.push(user_id)
		// 				}
		// 			})
		// 		})
		// 	}
		// 	setLikes(arrayUsersLikes)
		// 	console.log(likes)
		// 	await firebase.firestore().collection("publications")
		// 	.doc(publication_id)
		// 	.update({
		// 		likes: likes
		// 	})
		// 	.then( () => {
		// 		setLikes([])
		// 	})
		// })

	}

	return (
		<>
			<PublicationsContext.Provider value={{ publications, loadPublications, handleDeletePublication, loadingPublications, handleSaveUserPublication, likePublication }}>
				{children}
			</PublicationsContext.Provider>
		</>
	)
}

export function usePublications() {
	const context = useContext(PublicationsContext);
	return context;
};