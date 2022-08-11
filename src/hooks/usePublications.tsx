import React, { createContext, useContext, useState, ReactNode } from 'react';

import firebase from 'firebase/app';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

import { PublicationObject, HandleCreatePublicationRequest, LikeOrDeslikeRequest, LikesObject, IChildren, CommentsObject } from "./types"

import apiDsn from '../services/apiDsn'

const PublicationsContext = createContext({});


 
export default function PublicationsProvider({ children }: IChildren) {
	const [publications, setPublications] = useState<PublicationObject[] | any[]>([]);
	const [userPublications, setUserPublications] = useState<PublicationObject[] | []>([]);
	const [loadingPublications, setLoadingPublications] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [publication, setPublication] = useState<PublicationObject | []>([]);

	async function loadPublications() {
		setLoadingPublications(true);
		await apiDsn.get("/publications").then((res) => {
			setPublications(res.data)
			console.log(publications[4])
		}).catch((err) => {
			console.log(err)
		})
		setLoadingPublications(false)
	}

	async function loadUserPublications(user_id: string) {
		await apiDsn.get("/user/publications", { params: { user_id } }).then((res) => {
			setUserPublications(res.data)
		})
	}

	async function handleCreatePublication({ publication, user, image_publication_url }: HandleCreatePublicationRequest) {
		let data: PublicationObject = {
			id: "",
			publication: String(publication),
			user_id: user.uid, 
			image_publication_url,
			user_name: user.name, 
			user_role: user.role, 
			user_is_verified: user.isVerified, 
			user_avatar_url: user.avatarUrl,
			created_at: new Date(),
			updated_at: new Date(),
			likes: [],
			comments: []
		}
		await apiDsn.post("/publications", data ).then((res) => {
			setPublications([data, ...publications])
		})
	}

	async function handleDeletePublication(publication_id: string) {
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

	async function likeOrDeslikePublication({user_id, publication_id}: LikeOrDeslikeRequest) {
		const res = await apiDsn.post("/likes", { user_id, publication_id}).then( (res) => {
			let arrayPublicationsIds: string[] = []

			publications.forEach( (item) => arrayPublicationsIds.push(item.id) )
			const idx: number = arrayPublicationsIds.indexOf(publication_id)

			let dataLike: LikesObject = {
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

				const index = array[idx].likes.findIndex( (item: { user_id: string; publication_id: string; }) => item.user_id === user_id && item.publication_id === publication_id)
				array[idx].likes.splice(index, 1)
				setPublications(array);
				return { type: "deslike", likes: array[idx].likes }
			}

		}).catch( (err) => {
			console.log(err)
		})
		return res
	}

	async function loadPublicationById(publication_id:string) {
		setLoading(true)
		const res = await apiDsn.get("/publications/details", { params: { publication_id } });
		if(res.data) {
			await firebase.firestore().collection("users")
					.doc(res.data.user_id)
					.get()
					.then((snap) => {
						let dataPublication = {
							user_name: snap.data()?.name,
							user_role: snap.data()?.role,
							user_id: res.data.user_id,
							user_is_verified: snap.data()?.verified,
							publication: res.data.publication,
							image_publication_url: res.data.image_publication_url,
							id: res.data.id,
							user_avatar_url: snap.data()?.avatarUrl,
							created_at: res.data.created_at,
							likes: res.data.likes,
							comments: res.data.comments,
							updated_at: ''
						}
						setPublication(dataPublication)
						setLoading(false)
					})
		}
		setLoading(false)
	}

	async function registerNewComment({comment, publication_id, user_id, user_name, user_role, user_avatar_url, user_is_verified}:CommentsObject) {
		let data = {
			comment, 
			publication_id, 
			user_id,
			user_name,
			user_role,
			user_avatar_url, 
			user_is_verified
		}
		await apiDsn.post("/comments", data).then( (res) => {
			console.log(res)
		}).catch( (err) => {
			console.log(err)
		})
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
				likeOrDeslikePublication,
				loadPublicationById,
				publication,
				registerNewComment,
				loading
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