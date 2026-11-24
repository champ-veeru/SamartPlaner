# SmartFin - Dockerfile for Production Deployment
FROM node:22-alpine

WORKDIR /app

# Copy dependency specifications
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose server port
ENV PORT=8085
EXPOSE 8085

# Define volume for persistent SQLite database
VOLUME ["/app/db"]

# Start the application server
CMD ["npm", "start"]
