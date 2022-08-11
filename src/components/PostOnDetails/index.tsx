/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react';
import { BiBookmark, BiMessageRounded, BiShare, BiTrash } from 'react-icons/bi';
import { HiHeart, HiOutlineHeart, HiSpeakerphone } from 'react-icons/hi';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { MdVerified } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { usePublications } from '../../hooks/usePublications';
import CommentModal from '../CommentModal';
import Comment from './Comment';
import styles from './styles.module.scss';
import { CommentsProps, LikesProps, PublicationProps } from "./types";

const ITEM_HEIGHT = 48;

export default function PostOnDetails(publicationInfo: PublicationProps) {
  const { id } = useParams();
  const [publication, setPublication] = useState<PublicationProps | null>(null);
  const [popoverActive, setPopoverActive] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [typeHeart, setTypeHeart] = useState<"desliked" | "liked">('desliked');
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [modalCommentIsActive, setModalCommentIsActive] = useState<boolean>(false);
  const [commentsOnPublication, setCommentsOnPublication] = useState<CommentsProps[]>([]);

  const open = Boolean(anchorEl);

  const { user } = useContext(AuthContext);
  const { handleDeletePublication, likeOrDeslikePublication, loading } = usePublications();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setModalCommentIsActive(false);
  };

  function verifyButtonLike(likes: LikesProps) {
    const array: string[] = [];
    if (likes?.length > 0) {
      likes.forEach( (item) => array.push(item.user_id));

      if (array.indexOf(user?.uid) > -1) {
        setTypeHeart('liked');
      } else {
        setTypeHeart('desliked');
      }
    } else {
      setTypeHeart('desliked');
    }
  }

  async function loadComments() {
    setCommentsOnPublication(publicationInfo?.comments);
  }

  useEffect(() => {
    setPublication(publicationInfo);
    console.log(publication);
    verifyButtonLike({ publication_id: publication?.id, likes: publication?.likes });
    setCommentsOnPublication([]);
    loadComments();
    setNumberOfLikes(publicationInfo.likes?.length);
  }, [publicationInfo, id]);

  async function handleDelete() {
    await handleDeletePublication(popoverActive.publication_id);
    handleClose();
  }

  function handleReportPublication() {
    toast.success('Denuncia enviada com sucesso.');
    handleClose();
  }

  async function handleLike(user_id: string, publication_id: string, likes: LikesProps) {
    console.log(likes);
    const res = await likeOrDeslikePublication({ user_id, publication_id });
    verifyButtonLike(likes: res.likes);

    if (res.type === 'like') {
      setTypeHeart('liked');
      setNumberOfLikes(numberOfLikes + 1);
    }
    if (res.type === 'deslike') {
      setTypeHeart('desliked');
      setNumberOfLikes(numberOfLikes - 1);
    }
  }

  function newComment(comment) {
    setCommentsOnPublication([comment, ...commentsOnPublication]);
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className={styles.post}>
        <header>
          {publication.user_avatar_url === null ? (
            <img src={avatar} alt="foto avatar" />
          ) : (
            <img src={publication.user_avatar_url} alt="Avatar foto" />
          )}
          <div>
            <Link to={`/user/${publication.user_id}`}>
              <span>{publication.user_name}</span>
              {publication.user_is_verified && <MdVerified />}
            </Link>
            <p>{publication.user_role}</p>
            <time>
              {/* {format(publication.created_at, "EEEE ' • 'd' de 'MMMM' • 'k'h'mm'", {
								locale: ptBR
							})} */}
            </time>
          </div>
        </header>
        <div className={styles.contentPost}>
          <div className={styles.description}>{publication.publication}</div>
        </div>
        {publication.imagePublicationUrl && (
          <div className={styles.mediaPost}>
            <img src={publication.image_publication_url} alt="Foto post" />
          </div>
        )}
        <footer>
          <button
            onClick={() =>
              handleLike({
                user_id: user.uid,
                publication_id: publication.id,
                likes: publication.likes,
              })
            }
          >
            {typeHeart === 'liked' ? (
              <>
                <HiHeart color="var(--red-500)" />
                <span>{numberOfLikes || 0}</span>
              </>
            ) : (
              <>
                <HiOutlineHeart />
                <span>{numberOfLikes || 0}</span>
              </>
            )}
          </button>
          <button onClick={() => setModalCommentIsActive(true)}>
            <BiMessageRounded />
            <span>{publication.comments?.length || 0}</span>
          </button>
          <button onClick={() => console.log(commentsOnPublication)}>
            <BiShare />
            <span>0</span>
          </button>
          <button onClick={() => toast.warning('Em breve...')}>
            <BiBookmark />
            <span>0</span>
          </button>
        </footer>
        <div className={styles.comments}>
          {commentsOnPublication?.map((comment, index) => (
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
            handleClick(e);
            setPopoverActive({ publication_id: publication.id, user_id: publication.user_id });
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
        }}
      >
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
      {modalCommentIsActive && (
        <CommentModal closeModal={handleClose} publication={publication} newComment={newComment} />
      )}
    </>
  );
}
