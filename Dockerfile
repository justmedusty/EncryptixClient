# Use a Node.js base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the src directory into the container
COPY . .

EXPOSE 3000

# Expose the port the app runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]