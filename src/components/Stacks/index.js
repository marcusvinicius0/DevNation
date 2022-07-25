import styles from './styles.module.scss';
import { FiPlus } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';

import { allStacks } from './stacks.js'

import firebase from 'firebase/app'
import ModalStacks from '../ModalStacks';
import { AuthContext } from '../../contexts/auth';

export default function Stacks() {
	const { user } = useContext(AuthContext);
	const [stacks, setStacks] = useState([]);
	const [modalStacksIsActive, setModalStacksIsActive] = useState(false);

	useEffect( () => {
		loadStacks()
	}, [])

	async function loadStacks() {
		await firebase.firestore().collection('users')
		.doc(user.uid)
		.get()
		.then( (snap) => {
			const stacks = snap.data().stacks
			let array = [];
			allStacks.forEach( (item) => {
				if(stacks.indexOf(item.stack) > -1) {
					array.push(item)
				}
			})
			setStacks(array)
		})
	}

	return (
		<div className={styles.containerStacks}>
			<header>
				<h1>Minhas stacks</h1>
				<button onClick={() => setModalStacksIsActive(true)}>
					<FiPlus />
					<span>Adicionar stack</span>
				</button>
			</header>
			{stacks.length > 0 ? (
			<div className={styles.allStacks}>
					{stacks.map( (stack, index) => (
						<div className={styles.stack} key={index} style={{background: stack.color}}>
							<div>{stack.icon}</div>
							<span>{stack.stack}</span>
						</div>
					))}
			</div> ) : (
				<p>Sem stacks.</p>
			)}

			{modalStacksIsActive === true && <ModalStacks handleCloseModal={() => setModalStacksIsActive(false)} allStacks={allStacks} reloadStacks={loadStacks} />}
		</div>
	)
}