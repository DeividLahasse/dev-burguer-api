# 🍔 DevBurguer - API

API REST para um sistema de delivery de hambúrgueres, desenvolvida como projeto acadêmico/portfólio. Responsável pela autenticação de usuários, gestão de produtos e categorias, processamento de pedidos e simulação de pagamentos.

🔗 **API em produção:** [dev-burguer-api-fuoy.onrender.com](https://dev-burguer-api-fuoy.onrender.com)

🔗 **Frontend do projeto:** [devburguer-interface](https://github.com/DeividLahasse/devburguer-interface)

## 🚀 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/) + [PostgreSQL](https://www.postgresql.org/)
- [Mongoose](https://mongoosejs.com/) + [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/) para autenticação
- [Bcrypt](https://www.npmjs.com/package/bcrypt) para hash de senhas
- [Multer](https://www.npmjs.com/package/multer) para upload de arquivos
- [Stripe](https://stripe.com/) para simulação de pagamentos
- [Docker](https://www.docker.com/)

## 📦 Funcionalidades

- Cadastro e autenticação de usuários (login/JWT)
- CRUD de categorias e produtos (com upload de imagem)
- Listagem pública de produtos e categorias
- Criação e gestão de pedidos
- Rotas protegidas por autenticação e por permissão de administrador
- Simulação de intenção de pagamento via Stripe

## 🔧 Como rodar o projeto localmente

Clone o repositório:

\`\`\`bash
git clone https://github.com/DeividLahasse/dev-burguer-api.git
cd dev-burguer-api
\`\`\`

Instale as dependências:

\`\`\`bash
npm install
\`\`\`

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

\`\`\`env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=123456
DB_DATABASE=dev-burguer-db
DB_DIALECT=postgres

MONGO_URL=mongodb://localhost:27017/devburguer

APP_URL=http://localhost:3001
PORT=3001
\`\`\`

Suba os bancos de dados (PostgreSQL e MongoDB) via Docker, ou aponte para instâncias já existentes.

Rode as migrations:

\`\`\`bash
npx sequelize-cli db:migrate
\`\`\`

Inicie o servidor:

\`\`\`bash
npm run dev
\`\`\`

A API ficará disponível em `http://localhost:3001`.

## 🐳 Rodando com Docker

\`\`\`bash
docker build -t dev-burguer-api .
docker run -p 3001:3001 --env-file .env dev-burguer-api
\`\`\`

## 🌱 Populando o banco (seed)

Este projeto conta com um script auxiliar de seed (`seed-devburger-api`) que popula categorias e produtos de exemplo via requisições à própria API.

## 👨‍💻 Autor

Desenvolvido por **Deivid Santos Lahasse** como parte dos estudos em desenvolvimento Front End.

- GitHub: [@DeividLahasse](https://github.com/DeividLahasse)
- LinkedIn: [linkedin.com/in/deividlahasse](https://linkedin.com/in/deividlahasse)
