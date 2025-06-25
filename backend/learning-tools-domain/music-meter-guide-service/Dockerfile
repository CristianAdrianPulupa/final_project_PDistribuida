# Usar imagen base oficial de Node.js
FROM node:18

# Crear directorio de la app
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto definido por la app
EXPOSE 3020

# Comando por defecto
CMD ["npm", "start"]