# Oncology Management System - [Back-End]

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [License](#license)
    
## Overview

This is an overview of server-side implementation for the Oncology Management System . The server-side component, developed using Node.js and Express.js, manages data interactions, handles requests from clients, and ensures the security and integrity of the database. MySQL is used as the database management system, and Sequelize is employed as the ORM to build database tables and relations. Authentication and encryption of users are implemented using bcrypt for password hashing and JWT for authentication tokens.

## Technologies Used

- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A web application framework for Node.js, used for building APIs and handling HTTP requests.
- **MySQL**: A relational database management system used for storing and managing data.
- **Sequelize**: An ORM for Node.js, used to interact with the MySQL database and define models, relationships, and migrations.
- **bcrypt**: A library for hashing passwords to enhance security.
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **dotenv**: A zero-dependency module that loads environment variables from a .env file into process.env.


## Project Structure

The project follows a well-structured organization of folders:

- **controllers**: Contains controller functions that handle incoming requests and return appropriate responses.
- **routes**: Defines the routes for different API endpoints, mapping them to their corresponding controller functions.
- **models**: Contains Sequelize models that represent database tables and define their schemas and relationships.
- **middleware**: Houses custom middleware functions used for request processing, authentication, and error handling.
- **utils**: Contains utility functions used throughout the application for various tasks.
- **configs**: Holds configuration files for setting up the server, database connections, and other application settings.


## Setup

### Prerequisites
- [git](https://git-scm.com/) - v2.13 or greater
- [NodeJS](https://nodejs.org/en/) - v16 or greater
- [npm](https://www.npmjs.com/) - v6 or greater
- MySQL database server installed and running

### Installation
To install and run the Oncology Management System Back-End, follow these steps:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/m-emadeddin/chemotherapy-management-system.git
    ```

2. Navigate to the client-side directory:
    ```bash
    cd chemotherapy-management-system/server-side
    ```

3. Install dependencies using npm:
    ```bash
    npm install
    ```
    
4. Define environment variables in the `.env` file according to your configuration. Example:
   ```bash
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   JWT_SECRET=yourSecretKey
   ```
   
5. Ensure the `.env` file is listed in your `.gitignore` file to prevent sensitive information from being committed to version control.

### Running-the-Application

1. Start the server: `npm start` or `node.index.js`

## License
The Oncology Management System Front-End is licensed under the MIT License. See the [MIT License](https://www.gnu.org/licenses/gpl-3.0) page for more information.



