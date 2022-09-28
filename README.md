# Projeto DevNation 💻

<img src="./src/assets/previewsocialdev.gif"/>

>  Uma rede social para desenvolvedores!

Confira a aplicação:  <a href="https://devsocialnetwork.netlify.app/" target="_blank">https://devsocialnetwork.netlify.app/</a>/<br>

## :page_facing_up: Explicação

O projeto se chama Dev Social Networking e foi realizado através de um Pair Programming. Ele é uma rede social direcionada para os desenvolvedores, sendo possível: registrar uma conta, editar o perfil, criar publicações, encontrar repositórios da API do Github, salvar publicações, entre outras funcionalidades.

A tela inicial do projeto é a tela de login que necessita de uma conta criada para ter acesso ao site. Assim, você deve clicar no botão para cadastrar-se e criar uma conta. Após criar a conta, o usuário será direcionado automaticamente para a timeline do site.

Na timeline a pessoa tem acesso a diversas funcionalidades disponíveis.
- Início: a opção de criar uma publicação, acessar as notícias na barra lateral, acessar a nossa comunidade do discord, acessar o menu que apresenta a opção de “meu perfil”, “seguidores”, “meus projetos”, “encontrar repositórios” e “salvos”.
- Perfil: o usuário consegue alterar a imagem do perfil, definir um banner, alterar o nome de usuário, adicionar a função, adicionar localização, adicionar uma biografia, adicionar o link do github e linkedin.
- Meus projetos: a opção de adicionar um projeto que vai abrir um modal para que possa completar as informações, como, por exemplo, imagem do projeto, descrição do projeto, link do projeto e da aplicação.
- Encontrar repositórios: a página consome a API do github com os repositórios de qualquer pessoa que tenha um repo público.
- Notícias: elas são fictícias, mas simulam notícias que o site apresenta na sidebar na timeline.
 
## 📁 Páginas

O site tem no total 13 páginas, sendo elas:

- **SignIn:** página de login.
- **SignUp:** página de cadastro de usuário.
- **Dashboard:** página principal, onde estão as publicações.
- **Contributors:** página dos contribuidores dos projetos.
- **Followers:** página dos seguidores.
- **ForgotPassword:** página para resetar senha.
- **Message:** página de mensagens.
- **MyProjects:** página para registrar e visualizar os projetos do usuário.
- **News:** página de notícias.
- **Profile:** página de perfil do usuário logado.
- **ProfileUser:** página de perfil de algum usuário.
- **Repositories:** página para procurar repositórios de acordo com a API do GitHub.
- **Repository:** página que mostra repositório.
- **NotFound:** página para rotas não encontradas.
 
## :dart: Etapas ##

- [x] Entendimento do projeto 
- [x] Instalação das dependências
- [x] Conexão com o firebase
- [x] Contexto de autentincação 
- [x] Privatização de rotas
- [x] Cadastro de usuário
- [x] Login do usuário
- [x] LogOut do usuário
- [x] Desenvolvimento das páginas: Dashboard, SignIn, SignUp, News e ForgotPassword 
- [x] Estilização 
- [x] Adição de modais na aplicação
- [x] Hook usePublication
- [x] Desenvolvimento das páginas: Profile, Repositories, Repository e MyProjects 
- [x] Implementação da seção "Meus projetos" na página Profile
- [x] Responsividade da página Dashboard
- [x] Variáveis de ambiente
- [x] Implementação da página para visualizar usuário
- [x] Implementação dos componentes NewsBox e JoinDiscord
- [x] Página contribuidores
- [x] Página NotFoundUser

## :dart Versionamento
- [x] Versão 1.0: 

## :rocket: Tecnologias ##

No projeto foram utilizadas as seguintes tecnologias:

- [ReactJs](https://pt-br.reactjs.org/)
- [Sass](https://sass-lang.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Axios](https://www.npmjs.com/package/axios)
- [ContextAPI](https://pt-br.reactjs.org/docs/context.html)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Firebase](https://firebase.google.com/?hl=pt)
- [React Router Dom](https://reactrouter.com/web/guides/quick-start)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Swiper](https://swiperjs.com/)
- [MUI Design](https://mui.com/pt/)

## :closed_book: Requisitos ##

Antes de iniciar :checkered_flag:, você precisa ter [Git](https://git-scm.com) e [Node](https://nodejs.org/en/) instalados.

## :checkered_flag: Começando ##

```bash
# Clone this project
$ git clone https://github.com/jguilhermesl/devs-social-network
# Access
$ cd devs-social-network
# Install dependencies
$ yarn or npm 
# Run the project
$ yarn start or npm start 
# The server will initialize in the <http://localhost:3000>
```
## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://media-exp1.licdn.com/dms/image/C4D03AQEEieIa-_h22g/profile-displayphoto-shrink_800_800/0/1651164045663?e=1658966400&v=beta&t=20osuQdvJ8V16r834e0NxcSHYMEE_1t-okD5LF-wATw" width="160px;" alt="Foto do João Guilherme Lima"/><br>
          <sub>
            <b>João Guilherme</b>
          </sub>
        </a>
      </td>
    <td align="center">
      <a href="#">
        <img src="https://media-exp1.licdn.com/dms/image/C4D03AQFrRUGC6s_pdQ/profile-displayphoto-shrink_800_800/0/1647262353026?e=1663804800&v=beta&t=yXF4Jx_DSsYTFJAagaG3YmBown8_lTd4ZxUvGHcyqLM" width="160px;" alt="Foto do Marcus Begheli"/><br>
          <sub>
            <b>Marcus Begheli</b>
          </sub>
        </a>
      </td>
  </tr>
</table>

## 📝 Licença

Este projeto está sob licença. Consulte o arquivo [LICENSE](LICENSE.md) para obter mais detalhes.

<a href="#top">Volte para o topo</a>
