import { FiSearch } from 'react-icons/fi'
import styles from './style.module.scss'

export default function MenuModal() {
	return(
		<div className={styles.containerModal}>
			<div className={styles.contentModal}>
				<div className={styles.inputSearchUsers}>
						<FiSearch className={styles.searchIcon} size={20} />
						<input
							type="text"
							placeholder="Pesquisar..."
							// value={text}
							// onChange={(e) => searchValue(e)}
							// onClick={() => setSearchBarBox(!searchBarBox)}
						/>
						{/* <div onMouseLeave={() => setSearchBarBox(!searchBarBox)} className={searchBarBox || text !== "" ? styles.searchBox : styles.searchBoxOff}>
							{hiddingContent()}
						</div> */}
				</div>

			</div>
		</div>
	)
}