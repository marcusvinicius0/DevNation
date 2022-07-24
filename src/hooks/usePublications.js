import { createContext, useContext, useState } from 'react';

import firebase from 'firebase/app';
import { toast }  from 'react-toastify';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const PublicationsContext = createContext({});

export default function PublicationsProvider({children}) {
	const [publications, setPublications] = useState([]);

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
						setPublications(arrayPublications)
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
		 }).then( async (result) => {
			if (result.isConfirmed) {
				await firebase.firestore().collection('publications')
				.doc(id)
				.delete()
				.then( (res) => {
					loadPublications();
					toast.success('Publicação deletada com sucesso.')
				})
			}
		 })
	}

	return (
		<>
			<PublicationsContext.Provider value={{ publications, loadPublications, handleDeletePublication }}>
				{children}
			</PublicationsContext.Provider>
		</>
	)
}

export function usePublications() {
	const context = useContext(PublicationsContext)
	return context;
}