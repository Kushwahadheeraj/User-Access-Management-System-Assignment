# User Access Management System

A full-stack application for managing user access and authentication built with Node.js, Express, TypeORM, and React.

## Features

- User authentication (register/login)
- Role-based access control
- User management (CRUD operations)
- JWT-based authentication
- PostgreSQL database

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database named `user_management`

4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3001
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=user_management
   JWT_SECRET=your_jwt_secret_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Role-based access control
- Protected routes using middleware

## License

MIT 