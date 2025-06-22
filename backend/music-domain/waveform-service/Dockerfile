# backend/music-domain/waveform-service/Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3013
CMD ["npm", "start"]
