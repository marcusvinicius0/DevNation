import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

import logo from "../../../assets/zenvia-logo.jpg";
import { Link } from "react-router-dom";

import { HiLocationMarker } from "react-icons/hi";
import { BsWalletFill } from "react-icons/bs";
import { FaBuilding, FaRegMoneyBillAlt } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { RiPlaneFill } from "react-icons/ri";

export function Opportunitie() {
	return (
		<Link to="/" className={styles.contentOpportunitie}>
			<img src={logo} />
			<div className={styles.contentInfoOpportunitie}>
				<h1>Desenvolvedor Front End Júnior</h1>
				<div className={styles.infos}>
					<span><BsWalletFill /> <p>MB Labs</p></span>
					<span><HiLocationMarker /> <p>Remoto</p></span>
					<span><FaBuilding /> <p>Pequena/Média empresa</p></span>
					<span><FaRegMoneyBillAlt /> <p>Até R$10.000</p></span>
					<span><GoGraph /> <p>Pleno</p></span>
					<span><CgFileDocument /><p>PJ</p></span>
					<span><RiPlaneFill /><p>Aceita candidatos de fora</p></span>
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