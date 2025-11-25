# Imagen base oficial de Node
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY . .

# Tomar el puerto que Back4App asigna
ENV PORT=3000
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
