# Expense Manager Backend - Copilot Instructions

## Overview

This backend application provides a lightweight and fast RESTful API for the Expense Manager UI. It supports fetching expense details and performing CRUD (Create, Read, Update, Delete) operations on expenses.

## Technology Stack

- **Language:** Node.js (TypeScript)
- **Framework:** Express.js (Node.js)
- **Database:** MariaDB (via Docker)
- **ORM:** Prisma (Node.js)
- **Authentication:** JWT (optional, for securing endpoints)

## Setup Instructions

1. **Clone the Repository**
    ```
    git clone <repo-url>
    cd expense-manager-backend
    ```

2. **Install Dependencies**
    - For Node.js (Express.js):
      ```
      npm install
      ```
  
3. **Configure Environment Variables**
    - Create a `.env` file in the project root with the following content for MariaDB running in a Docker container:

    ```
    # .env
    DATABASE_URL="mysql://user:password@mariadb:3306/expense_manager"
    ```

    - Ensure your `docker-compose.yml` includes a MariaDB service and the backend depends on it.

4. **Database Migration**
    - Run migrations to set up the database schema.

5. **Start the Server**
    - For Node.js:
      ```
      npm start
      ```

## API Endpoints

- `GET /expenses` - Fetch all expenses
- `GET /expenses/:id` - Fetch expense by ID
- `POST /expenses` - Create a new expense
- `PUT /expenses/:id` - Update an existing expense
- `DELETE /expenses/:id` - Delete an expense

## Best Practices

- Use async/await for non-blocking operations.
- Validate all incoming data.
- Handle errors gracefully and return appropriate HTTP status codes.
- Keep dependencies minimal for better performance.

## Example Expense Model

| Field       | Type      | Description         |
|-------------|-----------|---------------------|
| id          | integer   | Unique identifier   |
| amount      | float     | Expense amount      |
| category    | string    | Expense category    |
| date        | date      | Date of expense     |
| description | string    | Expense description |

## Testing

- Write unit and integration tests for all endpoints.
- Use tools like Jest (Node.js).

## Deployment

- Use Docker for containerization
- Deploy to raspberry pi running docker

---