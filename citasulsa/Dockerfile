# Frontend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto
EXPOSE 5173

# Comando para desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
