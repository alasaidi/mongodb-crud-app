# Simple CRUD App

This is a simple CRUD (Create, Read, Update, Delete) application built with Node.js, Express, and MongoDB.

## Project Structure

```
simple-crud-app/
├── controllers/
│   ├── product.controller.js
│   └── users.controller.js
├── middleware/
│   └── verifyToken.js
├── models/
│   ├── product.model.js
│   └── users.model.js
├── routes/
│   ├── product.route.js
│   └── user.route.js
├── utils/
│   └── hashPassword.js
├── .env
├── .gitignore
├── index.js
├── package-lock.json
└── package.json
```

## Features

- User registration and authentication
- CRUD operations for products
- JWT-based authentication
- Password hashing

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=<your_port>
   USER_NAME=<your_mongodb_username>
   DATABASE_URL=<your_mongodb_url>
   API_KEY=<your_mongodb_api_key>
   TOKEN_ACCESS_SECRET=<your_jwt_secret>
   ```

## Usage

To start the server in development mode:

```
npm run dev
```

To start the server in production mode:

```
npm run serve
```

## API Endpoints

### Users

- `POST /users/api`: Register a new user
- `POST /users/api/login`: User login
- `GET /users/api/logout`: User logout

### Products

- `POST /products/api`: Create a new product
- `DELETE /products/api`: Delete a product
- `PUT /products/api/product/:id`: Update a product
- `PUT /products/api/:id`: Update product name by ID
- `GET /products/api/`: Get all products
- `GET /products/api/:id`: Get a product by ID

## Dependencies

- express
- mongoose
- dotenv
- jsonwebtoken
- bcryptjs
- cookie-parser

## Dev Dependencies

- nodemon

## License

This project is licensed under the MIT License.
