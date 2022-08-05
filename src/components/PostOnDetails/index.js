import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from './styles.module.scss';

import avatar from "../../assets/avatar.png";
import firebase from "firebase/app"

import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { BiTrash, BiMessageRounded, BiShare, BiBookmark } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import { HiSpeakerphone, HiHeart, HiOutlineHeart, HiOutlineEmojiHappy } from 'react-icons/hi';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import CommentModal from "../../components/CommentModal"
import Comment from "./Comment"

import { usePublications } from "../../hooks/usePublications";
import { AuthContext } from "../../contexts/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;

export default function PostOnDetails({ publication }) {
	const { id } = useParams()
	const [popoverActive, setPopoverActive] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [typeHeart, setTypeHeart] = useState("desliked");
	const [numberOfLikes, setNumberOfLikes] = useState(publication.likes && publication.likes.length);
	const [modalCommentIsActive, setModalCommentIsActive] = useState(false);
	const [commentsOnPublication, setCommentsOnPublication] = useState([]);

	const open = Boolean(anchorEl);

	const { user } = useContext(AuthContext)
	const { handleDeletePublication, loadingPublications, likeOrDeslikePublication, loading } = usePublications()

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => {
		setAnchorEl(null)
		setModalCommentIsActive(false)
	};

	useEffect(() => {
		verifyButtonLike({ publication_id: publication.id, likes: publication.likes });
		setCommentsOnPublication([])
		loadComments();
	}, [publication, id])


	async function handleDelete() {
		await handleDeletePublication(popoverActive.publication_id);
		handleClose()
	}

	function handleReportPublication() {
		toast.success("Denuncia enviada com sucesso.");
		handleClose()
	}

	function handleSavePublication() {
		toast.warning("Em breve...")
		handleClose()
	};

	async function handleLike({ user_id, publication_id, likes }) {
		const res = await likeOrDeslikePublication({ user_id, publication_id })
		verifyButtonLike({ publication_id, likes: res.likes })
		if (res.type === "like") {
			setTypeHeart("liked")
			setNumberOfLikes(numberOfLikes + 1)
		}
		if (res.type === "deslike") {
			setTypeHeart("desliked")
			setNumberOfLikes(numberOfLikes - 1)
		}
	}

	function verifyButtonLike({ publication_id, likes }) {
		let array = []
		if (likes?.length > 0) {
			likes.forEach((item) => array.push(item.user_id))

			if (array.indexOf(user.uid) > -1) {
				setTypeHeart("liked")
			} else {
				setTypeHeart("desliked")
			}
		} else {
			setTypeHeart("desliked")
		}
	}

	async function loadComments() {
		let array = []
		publication.comments?.forEach(async (item) => {
			await firebase.firestore().collection("users")
				.doc(item.user_id)
				.get()
				.then((res) => {
					let data = {
						comment: item.comment,
						created_at: item.created_at,
						user_id: item.user_id,
						publication_id: item.publication_id,
						id: item.id,
						user_name: res.data().name,
						user_role: res.data().role,
						user_avatar_url: res.data().avatarUrl
					}
					array.push(data)
				})
				setCommentsOnPublication(array)
		})
	}

	function newComment(comment) {
		setCommentsOnPublication([comment, ...commentsOnPublication])
	}

	if (loading) {
		return (
			<div className={styles.loading}>
				<CircularProgress />
			</div>
		)
	}

	return (
		<>
			<div className={styles.post}>
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
						<time>
							{/* {format(new Date(publication.created_at), "EEEE ' • 'd' de 'MMMM' • 'k'h'mm'", {
								locale: ptBR
							})} */}
						</time>
					</div>
				</header>
				<div className={styles.contentPost}>
					<div className={styles.description}>
						{publication.publication}
					</div>
				</div>
				{publication.imagePublicationUrl && (
					<div className={styles.mediaPost}>
						<img src={publication.imagePublicationUrl} alt="Foto post" />
					</div>)}
				<footer>
					<button onClick={() => handleLike({ user_id: user.uid, publication_id: publication.id, likes: publication.likes })}>
						{typeHeart === "liked" ? (
							<>
								<HiHeart color="var(--red-500)" /><span>{publication.likes?.length || 0}</span>
							</>
						) : (
							<>
								<HiOutlineHeart /><span>{publication.likes?.length || 0}</span>
							</>
						)}
					</button>
					<button onClick={() => setModalCommentIsActive(true)}><BiMessageRounded /><span>{publication.comments?.length || 0}</span></button>
					<button onClick={() => console.log(commentsOnPublication)}><BiShare /><span>0</span></button>
					<button onClick={() => toast.warning("Em breve...")}><BiBookmark /><span>0</span></button>
				</footer>
				<div className={styles.comments}>
					{commentsOnPublication.map( (comment, index) => (
						<Comment key={index} comment={comment} />
					))}
				</div>
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
						<div className={styles.actionsBox}>
							<button onClick={handleDelete} className={styles.buttonActionMenu}>
								<BiTrash /> Excluir publicação
							</button>
						</div>
					</MenuItem>
				)}
				<MenuItem>
					<div className={styles.actionsBox}>
						<button onClick={handleReportPublication} className={styles.buttonActionMenu}>
							<HiSpeakerphone /> <p>Denunciar publicação</p>
						</button>
					</div>
				</MenuItem>
			</Menu>
			{modalCommentIsActive && <CommentModal closeModal={handleClose} publication={publication} newComment={newComment} />}
		</>
	)
}