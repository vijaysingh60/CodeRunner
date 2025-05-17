# Use official Node.js image
FROM node:18-slim

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy your server code
COPY . .

# Expose port (change if needed)
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
