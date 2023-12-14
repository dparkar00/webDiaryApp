webDiaryApp 

Project Setup
This project consists of two main parts: a React-based frontend (notes-app-ui) and a Node.js-based backend (notes-app-server). Additionally, it utilizes a PostgreSQL database. Follow the steps below to set up the project.

Prerequisites
Git
Node.js
Yarn or npm
PostgreSQL
Prisma CLI (npm install -g prisma)

Clone the Repository
git clone <repository-url> react-node-web-diary-app

cd react-node-web-diary-app

Setting Up the Database
Create a PostgreSQL Database

Create a new PostgreSQL database for the application on your local machine or a remote server.

Add Connection String to .env File

Navigate to the notes-app-server directory and create a .env file with the following content:

DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>?schema=public"
Replace <username>, <password>, <host>, <port>, and <dbname> with your actual PostgreSQL database credentials and information.

Run Prisma Migrations

Navigate to the notes-app-server directory and run the following commands:

npx prisma migrate dev --name init
OR, if you encounter a "shadow db" error with the above command, you can force push/sync your DB:

npx prisma db push 
This command will apply the Prisma migrations to your database and generate the Prisma client.

Setting Up and Running the Server
Navigate to the Server Directory

cd notes-web-diary-app
Install Dependencies

npm install
Start the Server

npm start
The server will start, and it will connect to the PostgreSQL database using the provided connection string.

Setting Up and Running the UI
Navigate to the UI Directory

cd web-diary-app-ui
Install Dependencies

npm install
Start the React App

npm start
The React app will start, and it should connect to the Node.js server.

Accessing the Application
Once both the UI and the server are running, you can access the application by navigating to:

http://localhost:3000
The API will be hosted on

http://localhost:5000
Adjust the port if your configuration is different. Happy coding!
