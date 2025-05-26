# SorGrao - Sistema de Gestão para Comércio de Grãos

Este projeto é um sistema completo para gestão de comércio de grãos, incluindo gerenciamento de ofertas, demandas, vendedores, compradores, cálculos de fretes, funrurais e comissões.

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

- **Backend**: API REST desenvolvida com NestJS
- **Frontend**: Interface de usuário desenvolvida com React

## Requisitos

- Node.js 14+
- PostgreSQL 12+
- Docker e Docker Compose (opcional)

## Configuração

### Método 1: Sem Docker

#### Backend:

1. Navegue até a pasta do backend:
   \`\`\`bash
   cd backend
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure as variáveis de ambiente:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Edite o arquivo `.env` com as configurações do seu banco de dados.

4. Execute as migrações:
   \`\`\`bash
   npm run migration:run
   \`\`\`

5. Inicie o servidor:
   \`\`\`bash
   npm run start:dev
   \`\`\`

#### Frontend:

1. Navegue até a pasta do frontend:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure as variáveis de ambiente:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Edite o arquivo `.env` com a URL da API.

4. Inicie o servidor de desenvolvimento:
   \`\`\`bash
   npm start
   \`\`\`

### Método 2: Com Docker Compose

1. Configure as variáveis de ambiente:
   \`\`\`bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   \`\`\`
   Edite os arquivos `.env` conforme necessário.

2. Inicie os containers:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

3. Acesse:
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000
   - API Docs: http://localhost:3000/api

## Funcionalidades

- Autenticação e autorização
- Gerenciamento de vendedores
- Gerenciamento de compradores
- Gerenciamento de ofertas
- Gerenciamento de demandas
- Cálculos de fretes
- Cálculos de funrurais
- Cálculos de comissões
- Relatórios

## Tecnologias Utilizadas

### Backend:
- NestJS
- TypeORM
- PostgreSQL
- JWT
- Swagger

### Frontend:
- React
- Material UI
- React Router
- Axios
- Context API
- React Hooks

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
\`\`\`

Vamos criar um arquivo docker-compose.yml na raiz do projeto:
