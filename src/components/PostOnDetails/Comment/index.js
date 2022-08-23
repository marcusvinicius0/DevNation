import avatar from '../../../assets/avatar.png';
import styles from './styles.module.scss';

export default function Comment({ comment }) {
  return (
    <div className={styles.containerComment}>
      <header>
        {comment.userAvatarUrl === null ? (
          <img src={avatar} alt="foto avatar" />
        ) : (
          <img src={comment.userAvatarUrl} alt="Avatar foto" />
        )}
        <div className={styles.infoUser}>
          <span>
            {comment.userName} - <p> 4 de ago</p>
          </span>
          <p>{comment.userRole}</p>
          <p className={styles.comment}>{comment.comment}</p>
        </div>
      </header>
    </div>
  );
}
