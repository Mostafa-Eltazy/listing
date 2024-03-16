# Use an official Node.js runtime as a parent image
FROM node:20-alpine

RUN apk add --no-cache libc6-compat python3 py3-pip g++ make



# Set the working directory to /app
COPY . ./app

WORKDIR /app

# Copy the current directory contents into the container at /app

# Install any needed packages specified in package.json
RUN npm install


# Expose port 4000 for the container
EXPOSE 3000


# Define the command to run the app
CMD ["npm", "run", "dev"]