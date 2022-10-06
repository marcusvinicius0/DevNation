/* eslint-disable camelcase */
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { BiBookmark, BiMessageRounded, BiShare, BiTrash } from 'react-icons/bi';
import { HiHeart, HiOutlineHeart, HiSpeakerphone } from 'react-icons/hi';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import styles from './styles.module.scss';

import { PublicationInterface } from '../../@types/Publication/types';

import avatar from '../../assets/avatar/avatar.png';

import { AuthContext } from '../../contexts/user';


const ITEM_HEIGHT = 48;

const imagePath = 'https://api-devs-social-network.herokuapp.com/files/';

interface PopoverProps {
  publicationId: string;
  userId: string;
}

interface PostProps {
  publication: PublicationInterface;
}

export default function Post({ publication }: PostProps) {
  const [popoverActive, setPopoverActive] = useState<PopoverProps>({
    publicationId: '',
    userId: '',
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [typeHeart, setTypeHeart] = useState<string>('desliked');
  //   const [numberOfLikes, setNumberOfLikes] = useState<number>(
  //     0 || (publication.likes && publication.likes.length)
  //   );

  const open = Boolean(anchorEl);

  const { user } = useContext(AuthContext);
  // const { handleDeletePublication, loadingPublications, likeOrDeslikePublication } =
  //   usePublications();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  function verifyButtonLike({ likes }: any) {
    const array: any = [];

    if (likes?.length > 0) {
      likes.forEach((item: any) => array.push(item.userId));

      if (array.indexOf(user?.id) > -1) {
        setTypeHeart('liked');
      } else {
        setTypeHeart('desliked');
      }
    } else {
      setTypeHeart('desliked');
    }
  }

  useEffect(() => {
    verifyButtonLike({ publicationId: publication.id, likes: publication.likes });
  }, []);

  //   async function handleDelete() {
  //     await handleDeletePublication(popoverActive.publicationId);
  //     handleClose();
  //   }

  //   async function handleLike({ userId, publicationId }: handleLike) {
  //     const res = await likeOrDeslikePublication({ userId, publicationId });
  //     verifyButtonLike({ publicationId, likes: res.likes });
  //     if (res.type === 'like') {
  //       setTypeHeart('liked');
  //       setNumberOfLikes(numberOfLikes + 1);
  //     }
  //     if (res.type === 'deslike') {
  //       setTypeHeart('desliked');
  //       setNumberOfLikes(numberOfLikes - 1);
  //     }
  //   }

  return (
    <Link to={`/publication/${publication.id}`} className={styles.postAnchor}>
      <div className={styles.post}>
        <header>
          {publication.user.imageUserUrl === null ? (
            <img src={avatar} alt="foto avatar" />
          ) : (
            <img src={publication.user.imageUserUrl} alt="Avatar foto" />
          )}
          <div>
            <Link to={`/user/${publication.userId}`}>
              <span>{publication.user.name}</span>
              {publication.user.isVerified && <MdVerified />}
            </Link>
            <p>{publication.user.role}</p>
            <time>
              {format(new Date(publication.createdAt), "EEEE ' • 'd' de 'MMMM' • 'k'h'mm'", {
                locale: ptBR,
              })}
            </time>
          </div>
        </header>
        <Link to={`/publication/${publication.id}`} />
        <div className={styles.contentPost}>
          <div className={styles.description}>{publication.publication}</div>
        </div>
        {publication.imagePublicationUrl && (
          <div className={styles.mediaPost}>
            <img src={imagePath + publication.imagePublicationUrl} alt="Foto post" />
          </div>
        )}
        <footer>
          <button onClick={() => { }}>
            {typeHeart === 'liked' ? (
              <>
                <HiHeart color="var(--red-500)" />
                <span>{publication.likes?.length || 0}</span>
              </>
            ) : (
              <>
                <HiOutlineHeart />
                <span>{publication.likes?.length || 0}</span>
              </>
            )}
          </button>
          <button>
            <BiMessageRounded />
            <span>{publication.comments?.length}</span>
          </button>
          <button onClick={() => toast.warning('Em breve...')}>
            <BiShare />
            <span>0</span>
          </button>
          <button onClick={() => toast.warning('Em breve...')}>
            <BiBookmark />
            <span>0</span>
          </button>
        </footer>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={(e) => {
            handleClick(e);
            setPopoverActive({ publicationId: publication.id || '', userId: publication.user.id });
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
        {user?.id === popoverActive.userId && (
          <MenuItem>
            <div className={styles.actionsBox}>
              <button onClick={() => { }} className={styles.buttonActionMenu}>
                <BiTrash /> Excluir publicação
              </button>
            </div>
          </MenuItem>
        )}
        <MenuItem>
          <div className={styles.actionsBox}>
            <button onClick={() => alert('Em breve...')} className={styles.buttonActionMenu}>
              <HiSpeakerphone /> <p>Denunciar publicação</p>
            </button>
          </div>
        </MenuItem>
      </Menu>
    </Link>
  );
}
