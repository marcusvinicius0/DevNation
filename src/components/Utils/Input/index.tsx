import React, { useState } from "react";

import styles from "./styles.module.scss"

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface InputProps {
	label: string, 
	itsPassword?: boolean,
	[x: string]: any
}

export function Input({ label, itsPassword, ...rest }: InputProps, ) {
	const [isHidden, setIsHidden] = useState<boolean>(itsPassword ? true : false)

	return (
		<div className={styles.input}>
			<p>{label}</p>
			<input type={isHidden ? "password" : ""} {...rest} />
			{itsPassword && (
				<button onClick={() => setIsHidden(!isHidden)} type="submit">
					{isHidden ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
				</button>
			)}
		</div>
	)
}