# Dockerfile for Expense Manager Backend (Node.js + TypeScript)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Ensure db directory exists for SQLite
RUN mkdir -p /app/db

# Expose port (default Express port)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
