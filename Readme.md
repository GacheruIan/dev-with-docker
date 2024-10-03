# <u>DockerDemo</u>

DockerDemo is a basic application that connects an HTML and JavaScript front end to a backend running on Docker, utilizing MongoDB for data storage. This project demonstrates how to set up and communicate between different Docker containers for a web application.

## <u> Technologies Used </u>
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Docker**: Containerization platform

## Development Setup;-

### <u>Prerequisites</u>
- Docker installed on your machine
- Node.js installed (for local development)
- pull mongo and mongo-express from docker hub

### Running MongoDB and Express in Docker

**<u> Create a Docker network** </u>
 For running MongoDB and mongo-express containers:- 
 keeping your Express application and MongoDB on the same Docker network streamlines communication, enhances security, and simplifies configuration and maintenance. It is a best practice in containerized application development to ensure that services that need to communicate with each other are connected to the same network. This setup fosters a more efficient, reliable, and secure application architecture..

 ### e.g....

 **docker network create <your-network>**
 docker run -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=<overwite-mongo-username> \
  -e MONGO_INITDB_ROOT_PASSWORD=<overwite-mongo-pass> \
  --name <your-desired-name> \
  --net <n/w-you-created> \
  mongo

docker run -d \
  -p 8081:8081 \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=<mongo-username> \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=<mongo-pass> \
  --name <your-desired-name> \
  --net <n/w-you-created> \
  -e ME_CONFIG_MONGODB_SERVER=mongodb \
  mongo-express


 # <u> Running the Application </u>
git clone 
cd DockerDemo
npm install
npm start

