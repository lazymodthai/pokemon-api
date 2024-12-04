# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/main"]