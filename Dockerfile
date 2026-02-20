# Node 20 LTS - projeto usa Node 20
FROM node:20-alpine

WORKDIR /app

# Dependências do sistema úteis para Expo/React Native
RUN apk add --no-cache bash

# Copiar apenas arquivos de dependência primeiro (melhor cache de camadas)
COPY package.json package-lock.json* ./

# Instalar dependências (produção + dev para rodar expo start)
# npm install tolera package-lock.json desatualizado; use npm ci após "npm install" local
RUN npm install

# Copiar o resto do projeto
COPY . .

# Portas: Metro (8081), Expo dev server (19000, 19001, 19002)
EXPOSE 8081 19000 19001 19002

# Padrão: iniciar o servidor Expo (web funciona direto; mobile pode usar --tunnel)
CMD ["npm", "start"]
