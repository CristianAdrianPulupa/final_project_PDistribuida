# Use an official Node.js image
FROM node:18

# Create the working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code (includes server.js and src/)
COPY . .

# Expose the port that the service will use
EXPOSE 3001

# Default command to run the microservice
CMD ["node", "server.js"]

