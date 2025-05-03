# eye-glasses-management-server

Welcome to the Eye Glasses Management Dashboard Server (backend) repository – a comprehensive solution for efficiently managing eyeglasses inventory, tracking sales, and analyzing sales history. This dashboard provides a user-friendly interface with advanced features to streamline eyeglasses management.

## Live Demo

Explore the live demo of the Eye Glasses Management Server API at [Live Demo URL](https://eye-glasses-server.vercel.app).

## Features

1. **Authentication:** Secure user authentication ensures data privacy and access control, allowing authorized personnel to manage the system.

2. **CRUD Operations:** Perform Create, Read, Update, and Delete operations seamlessly to manage eyeglasses inventory with ease.

3. **State Management:** The dashboard employs efficient state management to keep track of real-time changes in the eyeglasses database, providing a dynamic user experience.

4. **Real-time UI Updates:** Enjoy a responsive user interface with real-time updates, ensuring immediate visibility of changes in the dashboard.

5. **Eyeglasses Filtering:** Utilize advanced filtering options to search and categorize eyeglasses based on various criteria such as brand, type, and price range.

## Technology Used

-   **Node.js:** The server-side logic is powered by Node.js, providing a scalable and efficient runtime environment.

-   **Express.js:** This web application framework for Node.js facilitates the development of robust and modular server-side architecture.

-   **MongoDB:** The database of choice, MongoDB, ensures flexibility and scalability in managing eyeglasses data.

-   **Mongoose:** Mongoose is an Object Data Modeling (ODM) library for MongoDB.

-   **JWT:** JSON Web Tokens (JWT) are used for authentication and authorization.

-   **bcrypt:** The bcrypt module is used for password hashing and salting.

-   **dotenv:** The dotenv module is used to load environment variables from a .env file.

-   **TypeScript:** TypeScript is used for type checking and development.

-   **ESLint:** ESLint is used for code quality and linting.

-   **Prettier:** Prettier is used for code formatting and readability.

-   and more

## Getting Started

Follow these steps to set up and run the Eye Glasses Management Dashboard (server):

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/MuzakkirHossainMinhaz/eye-glasses-management.git
    ```

2. **Navigate to the Server Directory:**

    ```bash
    cd eye-glasses-management-server
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Configure Environment Variables:**

    ```js
    PORT=5000 or as_your_choice
    NODE_ENV=DEVELOPMENT
    DATABASE_URL='your_database_url'
    BCRYPT_SALT_ROUNDS=10 or as_your_choice
    JWT_ACCESS_SECRET='your_jwt_access_secret'
    JWT_ACCESS_EXPIRES_IN=10d or as_your_choice
    ```

5. **Run the Server:**

    ```bash
    npm run start:dev
    ```

6. **Test the Server:**

    Go to http://localhost:5000 or http://127.0.0.1:5000 (change the port number if needed) to test the server.

## Contribution Guidelines

We welcome contributions to enhance the Eye Glasses Management Dashboard. If you have suggestions, improvements, or bug fixes, please let us know.

Feel free to reach out to us with any questions or issues. Let's build a robust Eye Glasses Management Dashboard together!
