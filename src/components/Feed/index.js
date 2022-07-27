import { useContext, useEffect, useState } from "react";
import styles from './styles.module.scss';

import avatar from "../../assets/avatar.png";

import firebase from '../../services/firebaseConnection';

import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { BiTrash, BiMessageRounded, BiHeart, BiShare, BiBookmark } from 'react-icons/bi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { HiSpeakerphone } from 'react-icons/hi';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

import { usePublications } from "../../hooks/usePublications";
import { AuthContext } from "../../contexts/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;

export default function Feed() {
	const [popoverActive, setPopoverActive] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const { user } = useContext(AuthContext)
	const { publications, loadPublications, handleDeletePublication, loadingPublications, likePublication } = usePublications()

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	async function handleDelete() {
		await handleDeletePublication(popoverActive.publication_id);
	}

	function handleReportPublication() {
		toast.success("Denuncia enviada com sucesso.");
		console.log(publications);
	}

	function handleSavePublication(){
		toast.success("Em breve...")
	};

	// async function handleSavePublication(id) {
	// 	await firebase.firestore().collection('users')
	// 	.doc(user.uid)
	// 	.update({
	// 		savedPublications: 
	// 	})

	// 	await firebase.firestore().collection('savedPublications')
	// 	.add({
	// 		user_name: user.name,
	// 		user_id: user.uid,
	// 		publication: 
	// 	})
	// 	.then(() => {
	// 		toast.success("Publicação salva com sucesso!");
	// 	})
	// 	.catch((error) => {
	// 		// console.log(error);
	// 		toast.error("Oops, algo deu errado. Tente novamente mais tarde.");
	// 		return null;
	// 	})
	// }

	useEffect(() => {
		loadPublications();

		setTimeout(() => {
			loadPublications();
		}, 500)
	}, []);

	if (loadingPublications) {
		return (
			<div className={styles.loading}>
				<CircularProgress />
			</div>
		)
	}

	return (
		<div className={styles.feed}>
			{publications.length > 0 && (
				publications.map((publication, index) => (
					<div key={index} className={styles.post}>
						<header>
							{publication.avatarUrl === null ?
								<img src={avatar} alt="foto avatar" />
								:
								<img src={publication.avatarUrl} alt="Avatar foto" />
							}
							<div>
								<Link to={`/user/${publication.user_id}`}>
									<span>{publication.user_name}</span>
									{publication.userIsVerified && <MdVerified />}
								</Link>
								<p>{publication.user_role}</p>
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
							<button onClick={() => likePublication(publication.user_id, publication.id)}><BiHeart /><span>{publication.likes ? publication.likes?.length : 0}</span></button>
							<button onClick={() => toast.warning("Em breve...")}><BiMessageRounded /><span>0</span></button>
							<button onClick={() => toast.warning("Em breve...")}><BiShare /><span>0</span></button>
							<button onClick={() => toast.warning("Em breve...")}><BiBookmark /><span>0</span></button>
						</footer>
						<IconButton
							aria-label="more"
							id="long-button"
							aria-controls={open ? 'long-menu' : undefined}
							aria-expanded={open ? 'true' : undefined}
							aria-haspopup="true"
							onClick={(e) => {
								handleClick(e)
								setPopoverActive({ publication_id: publication.id, user_id: publication.user_id })
							}}
							className={styles.buttonToSeeActions}
						>
							<IoEllipsisHorizontalSharp />
						</IconButton>
					</div>
				)))}
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
						width: '22ch',
					},
				}}>
				{user.uid === popoverActive.user_id && (
					<MenuItem>
						<button
							className={styles.buttonActionMenu}
							onClick={handleDelete}
						>
							<BiTrash /> Excluir publicação
						</button>
					</MenuItem>
				)}
				<MenuItem>
					<div className={styles.actionsBox}>
						<button onClick={handleReportPublication} className={styles.buttonActionMenu}>
							<HiSpeakerphone /> <p>Denunciar publicação</p>
						</button>
					</div>
				</MenuItem>

				<MenuItem>
					<div className={styles.actionsBox}>
						<button onClick={handleSavePublication} className={styles.buttonActionMenu}>
							<BsFillBookmarkFill /> <p>Salvar</p>
						</button>
					</div>
				</MenuItem>
			</Menu>
		</div>
	)
}