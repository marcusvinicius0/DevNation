import { useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';

import { AiFillPicture } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import avatar from '../../assets/avatar/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { usePublications } from '../../hooks/usePublications';
import styles from './styles.module.scss';

export default function CommentModal({ closeModal, publication, newComment }) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const { registerNewComment } = usePublications();

  async function handleNewComment() {
    const commentToRegister = {
      comment,
      publication_id: publication.id,
      user_id: user.uid,
      user_name: user.name,
      user_role: user.role,
      user_avatar_url: user.avatarUrl,
      user_is_verified: user.isVerified,
      created_at: new Date(),
    };
    await registerNewComment(commentToRegister).then(() => {
      setComment('');
      closeModal();
      newComment(commentToRegister);
    });
  }

  return (
    <div className={styles.containerModal}>
      <div className={styles.contentModal}>
        <header>
          <h2>Comentar na publicação do {publication.user_name} </h2>
          <button onClick={closeModal}>
            <FiX />
          </button>
        </header>
        <div className={styles.toComment}>
          {user.avatarUrl === null ? (
            <img src={avatar} alt="foto avatar" />
          ) : (
            <img src={user.avatarUrl} alt="Avatar foto" />
          )}
          <div className={styles.textarea}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Faça seu comentário..."
            />
            <div className={styles.icons}>
              <button>
                <BsEmojiSmile size={22} />
              </button>
              <button>
                <AiFillPicture size={22} />
              </button>
            </div>
          </div>
        </div>
        {comment === '' ? (
          <button className={styles.buttonDisabled} disabled>
            Comentar
          </button>
        ) : (
          <button className={styles.buttonToHandleComment} onClick={handleNewComment}>
            Comentar
          </button>
        )}
      </div>
    </div>
  );
}
