FROM node:20-alpine
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD npx sequelize-cli db:migrate && NODE_OPTIONS="--openssl-legacy-provider" npm run start
# CMD npx sequelize-cli db:migrate && npm run start