import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

import logo from "../../../assets/zenvia-logo.jpg";
import { Link } from "react-router-dom";

import { MdOutlinePlace } from "react-icons/md"


export function Opportunitie() {
	return (
		<Link to="/" className={styles.contentOpportunitie}>
			<img src={logo} />
			<div className={styles.contentInfoOpportunitie}>
				<h1>Desenvolvedor Front End Júnior</h1>
				<div className={styles.infos}>
					<span><MdOutlinePlace /> <p>Turim</p></span>
					<span><MdOutlinePlace /> <p>Turim</p></span>
					<span><MdOutlinePlace /> <p>Turim</p></span>
					<span><MdOutlinePlace /> <p>Turim</p></span>
					<span><MdOutlinePlace /> <p>Turim</p></span>
					<span><MdOutlinePlace /> <p>Turim</p></span>
				</div>
				<div className={styles.stacks}>
					<span>HTML</span>
					<span>CSS</span>
					<span>JavaScript</span>
				</div>
			</div>
		</Link> 
	)
}