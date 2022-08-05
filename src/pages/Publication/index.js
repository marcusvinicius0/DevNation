import { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import styles from './styles.module.scss';

import avatar from "../../assets/avatar.png";

import Header from '../../components/Header';
import Sidebox from '../../components/Sidebox';
import JoinDiscord from '../../components/JoinDiscord';
import PostOnDetails from '../../components/PostOnDetails';

import { usePublications } from "../../hooks/usePublications"
import { AuthContext } from "../../contexts/auth"

export default function Publication() {
	const { id } = useParams();
	const { loadPublicationById, publication } = usePublications();
	const { user } = useContext(AuthContext);

	useEffect(() => {

		const goTop = () => { window.scrollTo({ top: 0, left: 0, behavior: 'auto'})};

		goTop();

	}, []);

	useEffect(() => {
		loadPublicationById(id)
	}, [id])

	return (
		<>
			<Header />
			<div className={styles.containerPublication}>
				<Sidebox />
				<div className={styles.publication}>
					{publication && <PostOnDetails publication={publication} />}
				</div>
				<div className={styles.infoUser}>
					{publication.avatarUrl === null ?
						<img src={avatar} alt="foto avatar" />
						:
						<img src={publication.avatarUrl} alt="Avatar foto" />
					}
					<p>{publication.user_role}</p>
					<Link to={`/user/${publication.user_id}`}>Ver perfil completo</Link>
				</div>
			</div>
		</>
	)
}