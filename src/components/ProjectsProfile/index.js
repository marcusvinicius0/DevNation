import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

import firebase from 'firebase/app';

import { BsArrowRightShort } from 'react-icons/bs';

import { Link } from 'react-router-dom';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const breakpoints = {
	'320': {
		slidesPerView: 1,
		spaceBetween: 30,
		align: "center"

	},
	'600': {
		slidesPerView: 2,
		spaceBetween: 30,
	},
	'850': {
		slidesPerView: 3,
		spaceBetween: 30,
	}
}

export default function ProjectsProfile({ user_id, state_button }) {
	const [projects, setProjects] = useState([]);
	const swiper = useSwiper();

	useEffect(() => {
		async function loadProjects() {
			await firebase.firestore().collection('projects')
				.get()
				.then((snapshot) => {
					let arrayProjects = [];
					snapshot.forEach((doc) => {
						if (doc.data().user_id === user_id) {
							let data = {
								repo: doc.data().repo,
								user_id: doc.data().user_id,
								imageProjectUrl: doc.data().imageProjectUrl,
								liveLink: doc.data().liveLink,
								description: doc.data().description,
								title: doc.data().title,
								id: doc.id
							}
							arrayProjects.push(data)
						}
					})
					setProjects(arrayProjects);
				})
		}
		loadProjects();
	})

	return (
		<div className={styles.containerMyProjects}>
			<header>
				<h1>Meus projetos</h1>

				{state_button && (
					<div className={styles.projectsPageNavigation}>
						<Link to="/myprojects">
							Ver meus projetos
							<BsArrowRightShort size={22} />
						</Link>
					</div>
				)}

			</header>
			<Swiper
				breakpoints={breakpoints}
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				slidesPerGroup={1}
				spaceBetween={0}
				pagination={{ clickable: true }}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={() => console.log('slide change')}
			>
				<ul className={styles.listProjects}>
					{projects.map(project => (
						<SwiperSlide key={project.id} className={styles.listProjects}>
							<div className={styles.card}>
								<img src={project.imageProjectUrl} alt="Foto projeto" />
								<div className={styles.infosCard}>
									<span>{project.title}</span>
									<p>{project.description}</p>
								</div>
								<div className={styles.buttonsCard}>
									<button><a href={project.liveLink} target="_blank" rel="noreferrer">Ver aplicação</a></button>
									<button><a href={project.repo} target="_blank" rel="noreferrer">Ver repositório</a></button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</ul>
			</Swiper>
			{projects.length === 0 && (
				<p>Sem projetos.</p>
			)}
		</div>
	)
}