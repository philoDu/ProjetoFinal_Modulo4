# TaskFlow — Gerenciador de Tarefas

Aplicação web de gerenciamento de tarefas inspirada no Jira, desenvolvida como projeto final do **Módulo 4 — Introdução ao Vue.js e Desenvolvimento de Componentes** do curso técnico do Senac.

O projeto é uma refatoração completa, em Vue.js, da interface entregue no Módulo 3 (HTML5 e CSS3), agora com navegação entre páginas, estado compartilhado, persistência local e fluxo de autenticação funcional.

🔗 **Acesse online:** https://philodu.github.io/ProjetoFinal_Modulo4/

---

## Funcionalidades

- **Autenticação simulada:** cadastro de conta, login e logout, com proteção das páginas internas.
- **Quadro Kanban:** tarefas organizadas em quatro colunas (A fazer, Em andamento, Em revisão, Concluída), com busca por título e filtro "Só minhas tarefas".
- **Detalhes da tarefa:** descrição, responsáveis, prioridade, datas, tarefas vinculadas e troca rápida de status.
- **Criação e edição de tarefas:** formulário compartilhado, com validação de campos e de datas.
- **Exclusão de tarefas:** com confirmação e remoção automática dos vínculos em outras tarefas.
- **Indicação de atraso:** tarefas não concluídas com data de entrega vencida aparecem destacadas.
- **Persistência:** usuários e tarefas ficam salvos no `localStorage` do navegador e sobrevivem ao recarregamento da página.

## Contas de teste

| Nome | E-mail | Senha |
|---|---|---|
| Alexandre | alexandre@exemplo.com | 123456 |
| Ana Souza | ana@exemplo.com | 123456 |
| Bruno Lima | bruno@exemplo.com | 123456 |
| Carla Dias | carla@exemplo.com | 123456 |

Também é possível criar uma conta nova pela tela de cadastro.

## Telas e rotas

| Tela | Rota | Acesso |
|---|---|---|
| Login | `/login` | Público |
| Cadastro | `/cadastro` | Público |
| Quadro (Dashboard) | `/` | Requer login |
| Nova tarefa | `/tarefas/nova` | Requer login |
| Detalhes da tarefa | `/tarefas/:id` | Requer login |
| Edição da tarefa | `/tarefas/:id/editar` | Requer login |

## Tecnologias

- **[Vue.js 3](https://vuejs.org/)** com `<script setup>` (Composition API)
- **[Vite](https://vite.dev/)** — servidor de desenvolvimento com HMR e build de produção
- **[Vue Router](https://router.vuejs.org/)** — navegação entre páginas e guarda de rotas
- **[Pinia](https://pinia.vuejs.org/)** — gerenciamento de estado (sucessor oficial do Vuex)
- **[Tailwind CSS 4](https://tailwindcss.com/)** — estilização *mobile-first* com classes utilitárias
- **ESLint** e **Prettier** — padronização e qualidade do código

## Como executar localmente

Pré-requisito: [Node.js](https://nodejs.org/) na versão LTS (recomenda-se instalar com o [nvm](https://github.com/nvm-sh/nvm)).

```sh
# Clonar o repositório
git clone https://github.com/philoDu/ProjetoFinal_Modulo4.git
cd ProjetoFinal_Modulo4

# Instalar as dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev
```

A aplicação ficará disponível no endereço exibido no terminal (por padrão, `http://localhost:5173`).

Para gerar a versão de produção:

```sh
npm run build
```

## Estrutura do projeto

```
src/
├── assets/
│   └── main.css             # Tailwind, foco visível e classes reutilizáveis (@apply)
├── components/
│   ├── AppHeader.vue        # Cabeçalho com navegação e logout
│   ├── AuthLayout.vue       # Layout das telas de login e cadastro (com slot)
│   ├── AvatarUsuario.vue    # Avatar com as iniciais do usuário
│   ├── BadgePrioridade.vue  # Etiqueta colorida de prioridade
│   ├── TarefaCard.vue       # Card de tarefa do quadro Kanban
│   └── TarefaForm.vue       # Formulário compartilhado entre criar e editar
├── router/
│   └── index.js             # Rotas e guarda de autenticação
├── stores/
│   ├── auth.js              # Usuários, login, cadastro e logout
│   └── tarefas.js           # Tarefas: criar, buscar, atualizar e excluir
├── utils/
│   ├── datas.js             # Formatação de datas e verificação de atraso
│   ├── opcoes.js            # Rótulos e cores de status e prioridade
│   └── storage.js           # Leitura segura do localStorage
├── views/                   # Uma view por página
├── App.vue                  # Moldura da aplicação (cabeçalho + RouterView)
└── main.js                  # Ponto de entrada: cria o app e registra Router e Pinia
```

## Decisões de arquitetura

- **Estado centralizado:** os dados de usuários e tarefas ficam em dois stores. As views nunca alteram os dados diretamente: toda mudança passa pelas actions do store.
- **Persistência automática:** cada store observa os próprios dados com `watch` e os grava no `localStorage` a cada alteração.
- **Guarda de rota:** um `router.beforeEach` redireciona visitantes não autenticados para o login, guardando a página de destino para retornar a ela depois de entrar.
- **Componentes reutilizáveis:** o mesmo formulário atende às telas de criação e edição. Ele comunica o resultado por eventos (`emit`), e cada view decide o que fazer com os dados.
- **Formulário com cópia local:** a edição trabalha sobre uma cópia da tarefa. O store só é alterado quando o usuário confirma, o que permite cancelar sem efeitos colaterais.

## Responsividade e acessibilidade

- Layout *mobile-first*: no celular, as colunas do quadro rolam na horizontal com encaixe; em telas grandes, formam uma grade de quatro colunas.
- HTML semântico (`header`, `main`, `nav`, `section`, `aside`, `article`, `dl`, `fieldset`).
- Navegação completa pelo teclado, com foco visível e link "Pular para o conteúdo".
- Rótulos associados a todos os campos, mensagens de erro anunciadas por leitores de tela (`role="alert"`) e textos alternativos para elementos visuais.

## Limitações conhecidas

Por se tratar de um projeto acadêmico sem *backend*:

- A autenticação é **simulada**: usuários e senhas ficam no `localStorage`, legíveis por quem tiver acesso ao navegador. Em produção, as senhas seriam armazenadas no servidor, protegidas por *hash*.
- Os dados existem apenas no navegador em que foram criados.
- O envio de **anexos** não foi implementado, pois exigiria armazenamento em servidor.

## Autor

**Felipe Duarte** — [github.com/philoDu](https://github.com/philoDu)

Projeto desenvolvido no Módulo 4 do Curso Programador Web EaD - 2º/2026 - Noturno, da Escola Técnica do Guará-DF.
