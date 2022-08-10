import React from "react";
import { useContext, useState } from 'react';
import styles from './styles.module.scss';

import { Link } from 'react-router-dom';

import { DiCode, DiRedis, DiSizzlejs } from "react-icons/di"

export default function SignIn() {
	return (
		<div className={styles.mainContainer}>
			<div className={styles.logoContainer}>
				<div className={styles.contentContainer}>
					<h1>devsocialnetwork.com</h1>
					<p>devsocialnetwork.com é o melhor lugar para encontrar talentos na área de tecnologia. Nós estamos sempre deixando nosso melhor.</p>
					<span>Vem fazer parte!</span>
				</div>
				<img src="https://fia.com.br/wp-content/uploads/2022/06/tecnologia-na-saude-principais-avancos-tendencias-aplicad.jpg" alt="" />
			</div>

			<div className={styles.selectActionContainer}>
				<header>
					<h1>Acesse a rede</h1>
					<span>Compartilhe suas ideias e encontre desenvolvedores pelo mundo!</span>
				</header>
				<div className={styles.chooseModeToRegister}>
					<h3>Continuar com...</h3>
					<ul>
						<Link to="/signin">
							<DiSizzlejs size={24} />
							<span>Logar como dev ou empresa</span>
						</Link>
						<Link to="/register">
							<DiCode size={24} />
							<span>Cadastrar como dev</span>
						</Link>
						<Link to="/register-company">
							<DiRedis size={24} />
							<span>Cadastrar como empresa</span>
						</Link>
					</ul>
				</div>
				<p className={styles.policy}>Ao registrar, você concorda com os <span>termos e condições da nossa política</span>.</p>
			</div>
		</div>
	)
}
