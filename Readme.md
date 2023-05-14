# Postman Learning Backend 

This is a backend project created for the purpose of learning Postman. The project is designed to have multiple endpoints with different request options, to provide a comprehensive understanding of how Postman works.

Technologies Used
- Node.js
- Express.js
- MongoDB

## Installation

Clone this repository to your local machine.	

Install the necessary dependencies by running `npm install`.

Create a .env file with the following variables:

```
PORT=3000
DB_URI=mongodb://localhost:27017/postman_learning
```

Start the server by running npm start.
## Endpoints
1. /users
	This endpoint is used to manage users. It supports the following request methods:

	- GET: Retrieve a list of all users.
	- POST: Create a new user.
	- PUT: Update an existing user.
	- DELETE: Delete an existing user.
2. /products
	This endpoint is used to manage products. It supports the following request methods:

	- GET: Retrieve a list of all products.
	- POST: Create a new product.
	- PUT: Update an existing product.
	- DELETE: Delete an existing product.
3. /orders
	This endpoint is used to manage orders. It supports the following request methods:

	- GET: Retrieve a list of all orders.
	- POST: Create a new order.
	- PUT: Update an existing order.
	- DELETE: Delete an existing order.
4. /payments
	This endpoint is used to manage payments. It supports the following request methods:

	- GET: Retrieve a list of all payments.
	- POST: Create a new payment.
	- PUT: Update an existing payment.
	- DELETE: Delete an existing payment.
## Authentication
This project uses **JSON Web Tokens** (JWT) for authentication. To access any of the endpoints, you will need to provide a valid JWT token in the Authorization header of your requests.

To obtain a token, make a **POST** request to `/auth/login` with valid user credentials. This will return a token that can be used to access the other endpoints.

Note: Tokens are valid for a limited time period and will need to be refreshed periodically. To refresh a token, make a **POST** request to `/auth/refresh` with the existing token in the Authorization header.

## Conclusion
This project is a basic example of a backend API that can be used to learn Postman. Feel free to experiment with different request options and test the various endpoints.
