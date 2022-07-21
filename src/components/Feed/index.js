import { useContext, useEffect, useState } from "react";
import styles from './styles.module.scss';

import firebase from 'firebase';
import { AuthContext } from '../../contexts/auth';

import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { MdFavoriteBorder } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ITEM_HEIGHT = 48;

export default function Feed(key) {
	const [publications, setPublications] = useState([]);
	const [popoverIsActive, setPopoverIsActive] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
  	const open = Boolean(anchorEl);

  	const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  	};
  	const handleClose = () => {
    setAnchorEl(null);
  	};

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
								}
								arrayPublications.push(data)
							})
							setPublications(arrayPublications)
					})
				})		
		}

		loadPublications();

	}, []);

	return (
		<div className={styles.feed}>
			{publications.map((publication) => (
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
					<IconButton
						aria-label="more"
						id="long-button"
						aria-controls={open ? 'long-menu' : undefined}
						aria-expanded={open ? 'true' : undefined}
						aria-haspopup="true"
						onClick={handleClick}
						className={styles.buttonToSeeActions}
      			>
        				<IoEllipsisHorizontalSharp />
      			</IconButton>
				</div>
			))}
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch',
					},
				}}
			>
				<MenuItem><button className={styles.buttonActionMenu}><BiTrash /> Excluir publicação</button></MenuItem>
				<MenuItem><button className={styles.buttonActionMenu}><MdFavoriteBorder /> Favoritar publicação</button></MenuItem>
			</Menu>
		</div>
	)
}