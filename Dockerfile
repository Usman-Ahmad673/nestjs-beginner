FROM node:20.18.0

WORKDIR /src

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN npx prisma generate

RUN pnpm run build



CMD [ "pnpm", "run", "start:prod" ]