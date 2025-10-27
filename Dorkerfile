# Usa Node 18 (versión estable)
FROM node:18

# Crea directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el proyecto
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para ejecutar la API
CMD ["node", "index.js"]
