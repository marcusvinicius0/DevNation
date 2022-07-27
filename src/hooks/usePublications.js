import { createContext, useContext, useState } from 'react';

import firebase from 'firebase/app';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const PublicationsContext = createContext({});

export default function PublicationsProvider({ children }) {
	const [publications, setPublications] = useState([]);
	const [loadingPublications, setLoadingPublications] = useState(false);
	const [allLikes, setAllLikes] = useState([])

	async function loadLikes() {
		let arrayAllLikes = []
		await firebase.firestore().collection("likes")
			.get()
			.then((print) => {
				print.forEach((item) => {
					let data = {
						user_id: item.data().user_id,
						publication_id: item.data().publication_id
					}
					arrayAllLikes.push(data)
				})
			})
		setAllLikes(arrayAllLikes)
	}

	async function loadPublications() {
		setLoadingPublications(true)
		loadLikes()
		await firebase.firestore().collection('publications')
			.orderBy('created', 'desc')
			.get()

			.then((snapshot) => {
				let arrayPublications = [];

				snapshot.forEach(async (doc) => {
					await firebase.firestore().collection('users')
						.doc(doc.data().user_id)
						.get()
						.then(async (snap) => {

							const likes = allLikes.filter(item => item.publication_id === doc.id)

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
								likes,
								id: doc.id
							}
							arrayPublications.push(data);
						})
					setPublications(arrayPublications);
					setLoadingPublications(false);
				})
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
		let idsLikes = []
		let uidsLikesByFirebase = []
		let idNewLike = user_id + publication_id

		await firebase.firestore().collection("likes")
			.get()
			.then(async (snapshot) => {
				snapshot.forEach(async (doc) => {
					let idLikeOnPublication = doc.data().user_id + doc.data().publication_id
					idsLikes.push(idLikeOnPublication)
					uidsLikesByFirebase.push(doc.id)
				})
				if (idsLikes.indexOf(idNewLike) > -1) {
					let idx = idsLikes.indexOf(idNewLike)
					await firebase.firestore().collection("likes")
						.doc(uidsLikesByFirebase[idx])
						.delete()
						.then(() => {
							console.log("Deletado ")
						})
				} else {
					await firebase.firestore().collection("likes")
						.add({
							user_id,
							publication_id
						})
						.then(() => {
							console.log("Deu like")
						})
				}
			})
	}

	return (
		<>
			<PublicationsContext.Provider value={{ publications, loadPublications, handleDeletePublication, loadingPublications, likePublication }}>
				{children}
			</PublicationsContext.Provider>
		</>
	)
}

export function usePublications() {
	const context = useContext(PublicationsContext);
	return context;
};