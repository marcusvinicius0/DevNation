import { useContext } from 'react';
import styles from './styles.module.scss';

import { AuthContext } from '../../../contexts/auth';


export default function Button({...rest}){
    const { loadingAuth } = useContext(AuthContext)

    return(
        <button 
        className={styles.button} 
        disabled={loadingAuth}
        {...rest} 

        />
    )
}