import { useState } from 'react'
import styles from './styles.module.scss'

import { MdNewReleases } from 'react-icons/md'

import { Link } from 'react-router-dom'

export default function SeeUpdates() {
	const [popoverIsActive, setPopoverIsActive] = useState(false)

	return (
		<Link to="/updates" className={styles.containerSeeUpdates}>
			<MdNewReleases size={22} />
			<span>Ver atualizações</span>
		</Link>
	)
}