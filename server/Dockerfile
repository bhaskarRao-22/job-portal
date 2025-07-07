# Use Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install
COPY package*.json ./
RUN npm install

# Copy all backend files
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "index.js"]
