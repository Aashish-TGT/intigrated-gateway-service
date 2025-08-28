# Base image
FROM node:18

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the code
COPY . .

# Expose port (default: 3000)
EXPOSE 3000

# Start service
CMD ["npm", "server"]
