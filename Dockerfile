FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3001
CMD npx sequelize-cli db:migrate && NODE_OPTIONS="--openssl-legacy-provider" npm run start