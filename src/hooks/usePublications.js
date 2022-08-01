import { useEffect, createContext, useContext, useState } from 'react';

import firebase from 'firebase/app';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import compareAsc from 'date-fns/compareAsc'

import apiDsn from '../services/apiDsn'

const PublicationsContext = createContext({});

export default function PublicationsProvider({ children }) {
	const [publications, setPublications] = useState([]);
	const [userPublications, setUserPublications] = useState([]);
	const [loadingPublications, setLoadingPublications] = useState(false);
	const [allLikes, setAllLikes] = useState([])

	async function loadPublications() {
		setLoadingPublications(true);
		let arrayPublications = [];
		await apiDsn.get("/publications").then((res) => {
			res.data.map(async (item) => {
				await firebase.firestore().collection("users")
					.doc(item.user_id)
					.get()
					.then(async (snap) => {
						let dataUser = {
							user_name: snap.data().name,
							user_role: snap.data().role,
							user_id: item.user_id,
							userIsVerified: snap.data().verified,
							publication: item.publication,
							imagePublicationUrl: item.image_publication_url,
							id: item.id,
							avatarUrl: snap.data().avatarUrl,
							created_at: item.created_at,
							likes: item.likes
						}
						arrayPublications.push(dataUser)
						const newarray = arrayPublications.sort((a, b) => {
							if (a.created_at > b.created_at) return -1
							if (b.created_at > a.created_at) return 1
						})
					})
				setPublications(arrayPublications);
			})
		}).catch((err) => {
			console.log(err)
		})
		setLoadingPublications(false)
	}

	async function loadUserPublications(user_id) {
		await apiDsn.get("/user/publications", { params: { user_id } }).then((res) => {
			let arrayPublications = [];
			res.data.forEach(async (item) => {
				await firebase.firestore().collection("users")
					.doc(item.user_id)
					.get()
					.then((snap) => {
						let dataUser = {
							user_name: snap.data().name,
							user_role: snap.data().role,
							user_id: item.user_id,
							userIsVerified: snap.data().verified,
							publication: item.publication,
							imagePublicationUrl: item.image_publication_url,
							id: item.id,
							avatarUrl: snap.data().avatarUrl,
							created_at: item.created_at,
							likes: item.likes
						}
						arrayPublications.push(dataUser);
					})
				setUserPublications(arrayPublications);
			})
		})
	}

	async function handleCreatePublication({ publication, user, image_publication_url }) {
		await apiDsn.post("/publications", { publication, user_id: user.uid, image_publication_url }).then((res) => {
			let data = {
				publication,
				imagePublicationUrl: image_publication_url,
				user_name: user.name,
				user_role: user.role,
				user_id: user.uid,
				id: res.data.id,
				created_at: res.data.created_at,
				avatarUrl: user.avatarUrl,
				userIsVerified: user.isVerified,
				likes: []
			}
			setPublications([data, ...publications])
		})
	}

	async function handleDeletePublication(publication_id) {
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
				await apiDsn.delete("/publications", { params: { publication_id } }).then(() => {
					toast.success("Publicação deletada com sucesso.")
					const filteredPublications = publications.filter(publication => publication.id !== publication_id)
					setPublications(filteredPublications)
				})
			}
		})
	};

	async function likeOrDeslikePublication({user_id, publication_id}) {
		const res = await apiDsn.post("/likes", { user_id, publication_id}).then( (res) => {
			let arrayPublicationsIds = []
			publications.forEach( (item) => arrayPublicationsIds.push(item.id) )
			const idx = arrayPublicationsIds.indexOf(publication_id)

			let dataLike = {
				id: res.data.id,
				created_at: res.data.created_at,
				publication_id: res.data.publication_id,
				type: res.data.type,
				updated_at: res.data.updated_at,
				user_id: res.data.user_id,
			}

			if(res.data.type === "like") {
				const array = publications
				array[idx].likes.push(dataLike)
				setPublications(array);
				return { type: "like", likes: array[idx].likes }
			} 
			else {
				const array = publications

				const index = array[idx].likes.findIndex( item => item.user_id === user_id && item.publication_id === publication_id)
				array[idx].likes.splice(index, 1)
				setPublications(array);
				return { type: "deslike", likes: array[idx].likes }
			}

		}).catch( (err) => {
			console.log(err)
		})
		return res
	}

	return (
		<>
			<PublicationsContext.Provider value={{
				publications,
				loadPublications,
				handleDeletePublication,
				loadingPublications,
				handleCreatePublication,
				loadUserPublications,
				userPublications,
				likeOrDeslikePublication
			}}>
				{children}
			</PublicationsContext.Provider>
		</>
	)
}

export function usePublications() {
	const context = useContext(PublicationsContext);
	return context;
};