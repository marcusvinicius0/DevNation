import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

import Hamburguer from '../../components/MenuHamburger';

import ImageDevNation from '../../assets/dev-nation.svg';
import DevSocial from '../../assets/dev-social.svg';
import People from '../../assets/image-home.svg';
import Match from '../../assets/match-perfeito.svg';



export default function NewHome() {

    const history = useHistory()

    const [menuIsOpen, setMenuIsOpen] = useState(false)


    function handleChangeMenuStats(e: any) {
        setMenuIsOpen(!menuIsOpen)
    }


    return (
        <div className={styles.containerHome}>

            <header className={styles.headerHome}>
                <h1>
                    <a href='#logo' className={styles.logo}>logo</a>
                </h1>

                <nav className={menuIsOpen ? styles.listFade : undefined}>
                    <ul>
                        <li>
                            <Link
                                onClick={menuIsOpen ? handleChangeMenuStats : undefined}
                                to='/'>
                                Produtos
                            </Link>
                        </li>

                        <li>
                            <Link
                                onClick={menuIsOpen ? handleChangeMenuStats : undefined}
                                to='/'>
                                Sobre nós
                            </Link>
                        </li>

                        <li>
                            <Link
                                onClick={menuIsOpen ? handleChangeMenuStats : undefined}
                                to='/'>
                                Equipe
                            </Link>
                        </li>

                        <li>
                            <Link
                                onClick={menuIsOpen ? handleChangeMenuStats : undefined}
                                to='/signin'>
                                Login
                            </Link>
                        </li>
                    </ul>

                    <Link
                        className={styles.yourCompany}
                        onClick={menuIsOpen ? handleChangeMenuStats : undefined}
                        to="/register-company"
                    >
                        Sou empresa
                    </Link>
                </nav>

                <Hamburguer onClick={handleChangeMenuStats} boolean={menuIsOpen} />
            </header>

            <section className={styles.sectionOne}>

                <div className={styles.grid}>

                    <div className={styles.infoHome}>
                        <article>
                            <h2>Aproxima-se <br /> da vaga.</h2>

                            <p>Rapido, fácil e certeiro.</p>

                            <div className={styles.buttons}>
                                <button
                                    type='button'
                                    className={styles.user}
                                    onClick={() => history.push('/register')}
                                >
                                    Usuário
                                </button>

                                <button
                                    type='button'
                                    className={styles.company}
                                    onClick={() => history.push('/register-company')}
                                >
                                    Empresa
                                </button>
                            </div>
                        </article>

                        <img src={People} alt="People Home" />
                    </div>

                </div>

            </section>

            <section className={styles.sectionTwo}>

                <div className={styles.grid}>

                    <div className={styles.content}>
                        <article>
                            <h2>Encontre a tão sonhada vaga</h2>

                            <p>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing <br />
                                elit. Aenean commodo ligula eget dolor. Aenean <br />
                                massa. Cum sociis natoque penatibus et magnis dis <br />
                                parturient montes, nascetur ridiculua mus. Donec <br />
                                quam felis, ultricies nec, pellentesque eu, pretium quis, <br />
                                sem. Nulla consequat massa
                            </p>
                        </article>

                        <img src={ImageDevNation} alt="DevNation" />
                    </div>

                </div>

            </section>

            <section className={styles.sectionThree}>

                <div className={styles.grid}>

                    <div className={styles.content}>
                        <img src={Match} alt="Match-Perfeito" />

                        <article>
                            <h2>Seu match <br /> perfeito!</h2>

                            <p>Faça networking e encontre pessoas e <br /> recrutadores ao redor do Brasil.</p>

                            <div className={styles.buttons}>
                                <button
                                    type='button'
                                    className={styles.user}
                                    onClick={() => history.push('/register')}
                                >
                                    Usuário
                                </button>

                                <button
                                    type='button'
                                    className={styles.company}
                                    onClick={() => history.push('/register-company')}
                                >
                                    Empresa
                                </button>
                            </div>
                        </article>
                    </div>

                </div>

            </section>

            <footer className={styles.footer}>

                <div className={styles.grid}>

                    <div className={styles.content}>
                        <div className={styles.column1}>
                            <img src={DevSocial} alt="Dev Social" />

                            <p>A rede social que te <br /> leva pro topo.</p>

                            <span>&copy; Copyright DevNation inc</span>
                        </div>

                        <div className={styles.column2}>
                            <h3>Fale conosco</h3>

                            <a href='#suporte'>Suporte</a>
                            <a href='#tutorial'>Tutorial</a>
                            <a href='#report'>Reportar bugs</a>
                            <a href='#ideias'>Idéias</a>
                        </div>

                        <div className={styles.column2}>
                            <h3>Atualizações</h3>

                            <a href='#oportunidades'>Oportunidades</a>
                            <a href='#match'>Match perfeito</a>
                            <a href='#publi'>Publicações</a>
                            <a href='#cv'>CV Sharing</a>
                        </div>

                        <div className={styles.column2}>
                            <h3>Contato</h3>

                            <a href='#email'>devnation@hotmail.com</a>
                            <a href='#cep'>56080-230</a>
                            <a href='#cidade'>Recife, Brasil</a>
                        </div>

                        <div className={styles.column2}>
                            <h3>Empresa</h3>

                            <a href='#equipe'>Equipe</a>
                            <a href='#sobre'>Sobre nós</a>
                        </div>
                    </div>

                </div>

            </footer>
        </div>
    )
}