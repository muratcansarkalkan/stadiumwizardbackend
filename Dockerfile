# Dockerfile for backend part
# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16
# Set the working directory to /app inside the container
WORKDIR /app
# Copy files
COPY ./package.json ./package.json
COPY ./server.js ./server.js
COPY ./models ./models
COPY ./routes ./routes
# Install dependencies
RUN npm install 
LABEL developer=muratcansarkalkan
CMD ["node", "server.js"]

# docker build . -f Dockerfile.bEnd -t stadiumwizardbend:0.0.1