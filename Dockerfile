# Use official Node.js LTS image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install system dependencies (for Prisma and MariaDB client)
RUN apt-get update && \
    apt-get install -y mariadb-client && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install --production=false

# Copy the rest of the application code
COPY . .

# Build TypeScript
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
