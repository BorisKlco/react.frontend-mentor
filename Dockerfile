FROM node:16-alpine

WORKDIR /app

COPY paackage.json .

RUN npm install

COPY . .

RUN npm run build 

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", “run” ,"start"]