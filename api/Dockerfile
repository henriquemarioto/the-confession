FROM node:20

WORKDIR /api

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3009

CMD ["npm", "run", "dev"]
