# Gateway Dockerfile
FROM node:18-alpine

# working directory
WORKDIR /app

# package.json copy
COPY package*.json ./

# dependencies install
RUN npm install

# baaki code copy
COPY . .

# jo port gateway run karta hai (agar 3000 hai to 3000, agar aur hai to change kar le)
EXPOSE 3000

# app start karne ka command
CMD ["npm", "start"]
