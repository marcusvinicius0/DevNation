import styles from './styles.module.scss';
import { FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';

import { allStacks } from './stacks.js'

import firebase from 'firebase/app'
import ModalStacks from '../ModalStacks';
import { RiPencilLine } from 'react-icons/ri';

export default function Stacks({ user_id, state_button }) {
	const [stacks, setStacks] = useState([]);
	const [modalStacksIsActive, setModalStacksIsActive] = useState(false);

	useEffect(() => {
		setStacks([])
		loadStacks();
	}, [user_id]);

	async function loadStacks() {
		await firebase.firestore().collection('users')
			.doc(user_id)
			.get()
			.then((snap) => {
				const stacks = snap.data().stacks
				let array = [];
				allStacks.forEach((item) => {
					if (stacks.indexOf(item.stack) > -1) {
						array.push(item)
					}
				})
				setStacks(array);
			})
	}

	return (
		<div className={styles.containerStacks}>
			<header>
				<h1>Minhas stacks</h1>
				{state_button && (
					<button onClick={() => setModalStacksIsActive(true)}>
						{stacks >= [0] ? (
							<>
								<RiPencilLine />
								<span> Editar stacks</span>
							</>)
							:
							(
								<>
									<FiPlus />
									<span>Adicionar stacks</span>
								</>
							)}
					</button>)}
			</header>
			{stacks.length > 0 ? (
				<div className={styles.allStacks}>
					{stacks.map((stack, index) => (
						<div className={styles.stack} key={index} style={{ background: stack.color }}>
							{stack.icon}
							<span>{stack.stack}</span>
						</div>
					))}
				</div>) : (
				<p>Sem stacks.</p>
			)}

			{modalStacksIsActive === true && <ModalStacks handleCloseModal={() => setModalStacksIsActive(false)} allStacks={allStacks} reloadStacks={loadStacks} />}
		</div>
	)
}