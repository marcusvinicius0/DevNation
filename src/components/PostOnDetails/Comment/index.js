import avatar from "../../../assets/avatar.png";
import styles from './styles.module.scss';

export default function Comment({ comment }) {
	return (
		<div className={styles.containerComment}>
			<header>
				{comment.user_avatar_url === null ?
					<img src={avatar} alt="foto avatar" />
					:
					<img src={comment.user_avatar_url} alt="Avatar foto" />
				}
				<div className={styles.infoUser}>
					<span>{comment.user_name} - <p> 4 de ago</p></span>
					<p>{comment.user_role}</p>
					<p className={styles.comment}>{comment.comment}</p>
				</div>
				<p>{comment.comment}</p>
			</header>
		</div>
	)
}