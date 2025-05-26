# Usar a imagem oficial do Node.js v18
FROM node:18-slim

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto (index.js, etc)
COPY . .

# Expor a porta 3000 para o mundo externo
EXPOSE 3000

# O comando para iniciar a aplicação quando o container rodar
CMD [ "node", "index.js" ]