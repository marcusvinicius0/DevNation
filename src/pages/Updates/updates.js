// types
// novidade --> new
// correcao de bug --> bug
// em breve --> coming
// aviso --> warning

// formatação da data --> DD/MM/AAAA

export const allUpdates = [
  {
    title: 'Funcionalidades de salvar e comentar publicação.',
    type: 'coming',
    description:
      'Em breve as funcionalidades de salvar e comentar nas publicações serão adicionadas',
    version: '1.X.X',
    date: 'XX/08/2022',
  },
  {
    title: 'Scrollbar auto nas páginas.',
    type: 'bug',
    description:
      'Ao navegar pelas páginas depois de ter usado scrollbar na atual, a posição da mesma persistia. Agora volta ao topo da página.',
    version: '1.X.X',
    date: '05/08/2022',
  },
  {
    title: 'Inspecionar publicação.',
    type: 'new',
    description:
      'Ao clicar na publicação, o usuário é redirecionado para uma página onde aparece apenas a publicação clicada.',
    version: '1.2.4',
    date: '04/08/2022',
  },
  {
    title: 'Formatação de campos de texto.',
    type: 'bug',
    description:
      'Algumas formatações de campos de texto foram feitas. Usuários estavam conseguindo postar publicações com quebras de linhas e espaços infinitos.',
    version: '1.2.3',
    date: '31/07/2022',
  },
  {
    title: 'Função de curtida nos posts.',
    type: 'new',
    description:
      'Agora a partir da versão 1.1, o usuário consegue curtir e descurtir os posts de sua preferência a partir do clique no ícone de coração em cada publicação.',
    version: '1.2.2',
    date: '31/07/2022',
  },
  {
    title: 'Publicações resetadas.',
    type: 'warning',
    description:
      'Todas as publicações foram resetadas, pois a Dev Social Network migrou seu banco de dados.',
    version: '1.2.1',
    date: '31/07/2022',
  },
  {
    title: 'Ícones para ver senha ao logar ou cadastrar.',
    type: 'new',
    description: 'Ícones para ver senha ao logar ou cadastrar adicionados.',
    version: '1.1.4',
    date: '29/07/2022',
  },
  {
    title: 'Agrupamento de publicações ao realizar uma nova publicação.',
    type: 'bug',
    description:
      'Quando o usuário realizava uma publicação, todas as publicações dele se agrupavam e bagunçavam a ordenação dos posts no feed.',
    version: '1.1.3',
    date: '29/07/2022',
  },
  {
    title: 'Erro ao renderizar publicações.',
    type: 'bug',
    description: 'Ao carregar o feed nem todas as publicações apareciam pro usuário.',
    version: '1.1.2',
    date: '29/07/2022',
  },
  {
    title: 'Novas stacks adicionadas.',
    type: 'new',
    description:
      'Nas stacks do perfil do usuário foram adicionadas novas stacks: Redux, Prisma, Git, MongoDB e NestJS.',
    version: '1.1.1',
    date: '29/07/2022',
  },
];
