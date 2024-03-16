# Use an official Node.js runtime as a parent image
FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-pip

# Set the working directory to /app
COPY . ./app

WORKDIR /app

# Copy the current directory contents into the container at /app

# Install any needed packages specified in package.json
RUN npm install


# Expose port 4000 for the container
EXPOSE 4000


# Define the command to run the app
ENTRYPOINT ["./entrypoint.sh"]