import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import { BiBookmark, BiHeart, BiMessageRounded, BiShare } from 'react-icons/bi';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

import avatar from '../../assets/avatar.png';
import { UserSignedProps } from '../../contexts/types';
import { usePublications } from '../../hooks/usePublications';

import { PublicationObject } from '../../hooks/types';

interface PublicationsProfileProps {
  publications: PublicationObject[];
  user: UserSignedProps | null;
}

export default function PublicationsProfile({ publications, user }: PublicationsProfileProps) {
  const { likeOrDeslikePublication } = usePublications();

  return (
    <div className={styles.publicationsProfile}>
      <h3>Minhas publicações</h3>
      {publications.map((publication) => (
        <div key={publication.id} className={styles.post}>
          <header>
            <img
              src={user?.imageUserUrl === null ? avatar : user?.imageUserUrl}
              alt="Avatar foto"
            />
            <div>
              <span>{user?.name}</span>
              <p>{user?.role}</p>
              <time>
                {format(new Date(publication.createdAt), "EEEE ' • 'd' de 'MMMM' • 'k'h'mm'", {
                  locale: ptBR,
                })}
              </time>
            </div>
          </header>
          <div className={styles.contentPost}>
            <p>{publication.publication}</p>
          </div>
          {publication.imagePublicationUrl && (
            <div className={styles.mediaPost}>
              <img src={publication.imagePublicationUrl} alt="Foto post" />
            </div>
          )}

          <footer>
            <button
              onClick={() =>
                likeOrDeslikePublication({ userId: user?.id || '', publicationId: publication.id })
              }
            >
              <BiHeart />
              <span>0</span>
            </button>
            <button onClick={() => toast.warning('Em breve...')}>
              <BiMessageRounded />
              <span>0</span>
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
        </div>
      ))}
      {publications.length === 0 && <p>Sem publicações.</p>}
    </div>
  );
}
