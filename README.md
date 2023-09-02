# Inventory Control System

The Inventory Control System is a robust application designed to streamline the management of inventory items. Each item in the inventory is defined by attributes such as an identifier, description, quantity, and measure unit. This system allows users to create new items, edit existing items, and delete items, all while ensuring error-free data input.

![Main page](./docs/main-page.png)

## Features

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=typescript,angular,nodejs,mongodb,docker" />
  </a>
</p>

- **Item Management:** Create, edit, and delete inventory items with ease.
- **Data Validation:** Robust error handling ensures that only valid attributes are accepted.
- **Database with MongoDB:** Utilizes MongoDB as the database system to securely store and manage inventory data.
- **Docker Container:** Runs MongoDB within a Docker container, providing a consistent and isolated environment.
- **Backend (Node.js, TypeScript):** Utilizes TypeScript and Node.js to provide a reliable and performant server.
- **Frontend (Angular):** The Angular frontend offers an intuitive and user-friendly interface for interacting with the inventory.

## Architecture

The Inventory Control System employs a well-structured architecture:

### Backend (Node.js, TypeScript):

- **Controllers:** Handle incoming HTTP requests and manage the flow of data between the frontend and the database.
- **Repositories:** Interact with the database, abstracting complex database operations to ensure data integrity.
  Routes: Define API endpoints, specifying which controller methods to invoke for each endpoint.

## Frontend (Angular):

- **User Interface:** Provides a clean and intuitive interface for managing inventory items.
- **API Integration:** Communicates with the backend API to perform CRUD (Create, Read, Update, Delete) operations on inventory items.
