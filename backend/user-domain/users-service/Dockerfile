FROM node:18-alpine

WORKDIR /app

# 1) Instala sólo producción
COPY package*.json ./
RUN npm install --production

# 2) Copia tu código completo (incluye swaggerDef.js en src/)
COPY src ./src
COPY server.js .     

EXPOSE 3001

CMD ["node", "server.js"]
