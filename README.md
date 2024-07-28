# Sistema Integrado de Requerimentos (SIR)

Este é o Sistema Integrado de Requerimentos (SIR), um aplicativo web que permite aos usuários gerenciar solicitações de ajuste de matrícula.

## Estrutura do Projeto

O projeto está organizado seguindo um padrão de Feature-Based Folder Structure (Estrutura de Pasta Baseada em Funcionalidades)


## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js (v12 ou superior)
- npm (v6 ou superior)

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/pipealpha/IntegratedRequestsSystem.git
   cd sir

2. Instale as dependências:
    npm install

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento, execute:
    npm start


## Estrutura de Arquivos

### `src/assets/styles`
Contém os arquivos de estilos globais e específicos dos layouts.

### `src/components/common`
Componentes reutilizáveis que podem ser usados em várias partes da aplicação.

### `src/components/specific`
Componentes específicos que são usados em contextos particulares.

### `src/layouts`
Contém os componentes de layout como Header e Sidebar.

### `src/pages`
Contém os componentes de página, cada um com seus próprios arquivos de estilo e lógica.

### `App.js`
Arquivo principal da aplicação, responsável pela definição das rotas e configuração geral.

### `index.js`
Ponto de entrada da aplicação, onde o React é inicializado.


## Funcionalidades

### Login
Permite que os usuários façam login selecionando seu perfil (Estudante, Coordenador ou RACI).

### Dashboard
Exibe diferentes opções com base no perfil do usuário logado.

### Solicitações
Estudantes podem visualizar e acompanhar o progresso de suas solicitações de ajuste de matrícula.

### Gerenciamento de Disciplinas e Cursos
Coordenadores e RACI podem gerenciar disciplinas e cursos, incluindo a criação, edição e exclusão.

### Análise de Solicitações
Coordenadores e RACI podem analisar e tomar decisões sobre as solicitações de ajuste de matrícula dos estudantes.

### Perfis
Os usuários podem visualizar e atualizar suas informações de perfil.
