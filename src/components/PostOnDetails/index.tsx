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

import avatar from '../../assets/avatar/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { usePublications } from '../../hooks/usePublications';
import CommentModal from '../CommentModal';
import Comment from './Comment';
import styles from './styles.module.scss';

import {
  CommentsProps,
  HandleLikeRequest,
  ParamsProps,
  PopoverActiveProps,
  PublicationProps,
  VerifyButtonLike
} from './types';

const ITEM_HEIGHT = 48;

export default function PostOnDetails(publicationInfo: PublicationProps) {
  const { id } = useParams<ParamsProps>();
  const [publication, setPublication] = useState<PublicationProps | null>(null);
  const [popoverActive, setPopoverActive] = useState<PopoverActiveProps | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [typeHeart, setTypeHeart] = useState<'desliked' | 'liked'>('desliked');
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [modalCommentIsActive, setModalCommentIsActive] = useState<boolean>(false);
  const [commentsOnPublication, setCommentsOnPublication] = useState<CommentsProps[] | []>([]);

  const open = Boolean(anchorEl);

  const { user } = useContext(AuthContext);
  const { handleDeletePublication, likeOrDeslikePublication, loading, resLikeOrDeslike } =
    usePublications();

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setModalCommentIsActive(false);
  };

  function verifyButtonLike({ likes }: VerifyButtonLike) {
    const array: string[] = [];
    if (likes?.length > 0) {
      likes.forEach((item) => array.push(item.userId));

      if (array.indexOf(user?.id || '') > -1) {
        setTypeHeart('liked');
      } else {
        setTypeHeart('desliked');
      }
    } else {
      setTypeHeart('desliked');
    }
  }

  async function loadComments() {
    setCommentsOnPublication(publicationInfo?.comments || []);
  }

  useEffect(() => {
    setPublication(publicationInfo);
    verifyButtonLike({ likes: publication?.likes || [] });
    setCommentsOnPublication([]);
    loadComments();
    setNumberOfLikes(publicationInfo.likes?.length || 0);
  }, [publicationInfo, id]);

  async function handleDelete() {
    await handleDeletePublication(popoverActive?.publicationId || '');
    handleClose();
  }

  function handleReportPublication() {
    toast.success('Denuncia enviada com sucesso.');
    handleClose();
  }

  async function handleLike({ userId, publicationId }: HandleLikeRequest) {
    await likeOrDeslikePublication({ userId, publicationId });
    verifyButtonLike({ likes: resLikeOrDeslike?.likes });
    if (resLikeOrDeslike?.type === 'like') {
      setTypeHeart('liked');
      setNumberOfLikes(numberOfLikes + 1);
    }
    if (resLikeOrDeslike?.type === 'deslike') {
      setTypeHeart('desliked');
      setNumberOfLikes(numberOfLikes - 1);
    }
  }

  function newComment(comment: CommentsProps) {
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
          {publication?.userAvatarUrl ? (
            <img src={publication?.userAvatarUrl} alt="Avatar foto" />
          ) : (
            <img src={avatar} alt="foto avatar" />
          )}
          <div>
            <Link to={`/user/${publication?.userId}`}>
              <span>{publication?.userName}</span>
              {publication?.userIsVerified && <MdVerified />}
            </Link>
            <p>{publication?.userRole}</p>
            <time>
              {/* {format(publication.created_at, "EEEE ' • 'd' de 'MMMM' • 'k'h'mm'", {
								locale: ptBR
							})} */}
            </time>
          </div>
        </header>
        <div className={styles.contentPost}>
          <div className={styles.description}>{publication?.publication}</div>
        </div>
        {publication?.imagePublicationUrl && (
          <div className={styles.mediaPost}>
            <img src={publication?.imagePublicationUrl} alt="Foto post" />
          </div>
        )}
        <footer>
          <button
            onClick={() =>
              handleLike({
                userId: user?.id || '',
                publicationId: publication?.id || '',
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
            <span>{publication?.comments?.length || 0}</span>
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
            setPopoverActive({
              publicationId: publication?.id || '',
              userId: publication?.userId || '',
            });
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
        {user?.id === popoverActive?.userId && (
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
