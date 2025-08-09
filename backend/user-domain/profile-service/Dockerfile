FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY server.js .  
COPY .env . 
EXPOSE 3006

CMD ["node", "server.js"]
