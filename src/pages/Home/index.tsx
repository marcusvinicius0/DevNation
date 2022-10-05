import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

import Hamburguer from '../../components/MenuHamburger';

import People from '../../assets/images/image-home.svg';
import Match from '../../assets/images/match-perfeito.svg';
import ImageDevNation from '../../assets/logo/dev-nation.svg';

export default function NewHome() {
  const history = useHistory();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleChangeMenuStats() {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <div className={styles.containerHome}>


      <header className={styles.headerHome}>
        <div className={styles.grid}>
          <nav>
            <h1>
              <a href="#logo" className={styles.logo}>
                logo
              </a>
            </h1>

            <div className={menuIsOpen ? styles.listFade : styles.menuLinks}>
              <ul>
                <li>
                  <Link to="/">Produtos</Link>
                </li>

                <li>
                  <Link to="/">Sobre nós</Link>
                </li>

                <li>
                  <Link to="/">Equipe</Link>
                </li>

                <li>
                  <Link to="/signin">Login</Link>
                </li>
              </ul>

              <Link className={styles.yourCompany} to="/register-company">
                Sou empresa
              </Link>
            </div>

            <Hamburguer onClick={handleChangeMenuStats} boolean={menuIsOpen} />
          </nav>
        </div>
      </header>


      <section className={styles.sectionOne}>
        <div className={styles.grid}>
          <div className={styles.infoHome}>
            <article>
              <h2>
                Aproxime-se <br /> da vaga.
              </h2>

              <p>Rápido, fácil e certeiro.</p>

              <div className={styles.buttons}>
                <button
                  type="button"
                  className={styles.user}
                  onClick={() => history.push('/register')}
                >
                  Usuário
                </button>

                <button
                  type="button"
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
              <h2>Seu match perfeito!</h2>

              <p>
                Faça networking e encontre pessoas e <br /> recrutadores ao redor do Brasil.
              </p>

              <div className={styles.buttons}>
                <button
                  type="button"
                  className={styles.user}
                  onClick={() => history.push('/register')}
                >
                  Usuário
                </button>

                <button
                  type="button"
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
              <strong>
                Dev<span>Nation</span>
              </strong>

              <p>A rede social que te leva pro topo.</p>
            </div>

            <ul className={styles.listFooter}>
              <div className={styles.itemListFooter}>
                <h3>Fale conosco</h3>

                <a href="#suporte">Suporte</a>
                <a href="#tutorial">Tutorial</a>
                <a href="#report">Reportar bugs</a>
                <a href="#ideias">Idéias</a>
              </div>

              <div className={styles.itemListFooter}>
                <h3>Atualizações</h3>

                <a href="#oportunidades">Oportunidades</a>
                <a href="#match">Match perfeito</a>
                <a href="#publi">Publicações</a>
                <a href="#cv">CV Sharing</a>
              </div>

              <div className={styles.itemListFooter}>
                <h3>Contato</h3>

                <a href="#email">Email</a>
                <a href="#cep">56080-230</a>
                <a href="#cidade">Recife, Brasil</a>
              </div>

              <div className={styles.itemListFooter}>
                <h3>Empresa</h3>

                <a href="#equipe">Equipe</a>
                <a href="#sobre">Sobre nós</a>
              </div>
            </ul>
          </div>
          <span className={styles.copyright}>&copy; Copyright DevNation inc</span>
        </div>
      </footer>
    </div>
  );
}
