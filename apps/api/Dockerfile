FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NX_REJECT_UNKNOWN_LOCAL_CACHE=0

ENV NODE_ENV=production

RUN npm run build:api

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "run", "api:start" ]