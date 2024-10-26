# Twende

Twende is a web application designed to revolutionize bus transportation by offering an Uber-like experience for passengers. It allows users to book seats, track buses in real-time, and make payments seamlessly, all from the comfort of their devices. 

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Interface and Frontend Development**: 
  - User-friendly wireframes and mockups.
  - Responsive component creation for seamless user experience.

- **API and Database Development**:
  - User authentication for secure access.
  - Integration with PostgreSQL using Sequelize ORM for efficient database management.

- **Real-Time GPS Tracking and Mapping Integration**:
  - Live tracking of buses with real-time updates.
  - Mapping functionality to visualize routes and locations.

- **Booking System and Payment Integration**:
  - Check seat availability and book seats directly from the app.
  - Multiple payment options including cash and M-Pesa's STK for easy transactions.
  - Confirmation and ticketing system for hassle-free travel.

### Use Case

Many passengers prefer a convenient bus service that picks them up at the nearest location rather than waiting at traditional bus stations. Twende empowers users to:
- Book the next available bus.
- Track the bus location in real-time.
- Enjoy cashless payments for an enhanced experience.

## Tech Stack

- **Frontend**: 
  - React
  - Redux (for state management)
  - React Router (for routing)

- **Backend**: 
  - Node.js
  - Express.js
  - PostgreSQL (database)
  - Sequelize (ORM)

- **Real-Time Updates**: 
  - Socket.io (for real-time GPS tracking)
  
- **Payment Integration**:
  - M-Pesa API

## Folder Structure

```
twende/
├── client/                  # Frontend codebase (React)
│   ├── public/              # Static files
│   ├── src/                 # Application source files
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── services/            # API service calls
│   └── App.js               # Main application file
│
└── server/                  # Backend codebase (Node.js)
    ├── config/              # Server configuration files
    ├── controllers/         # Route controllers
    ├── middlewares/         # Middleware functions
    ├── routes/              # API routes
    ├── services/            # Business logic
    ├── utils/               # Utility functions
    ├── database/            # Database related files
    │   ├── migrations/      # Database migrations(may be empty)
    │   ├── models/          # Sequelize models
    │   ├── config/          # Database configuration
    │   └── seeders/         # Database seeders
    ├── migrations           # Working Database migrations
    └── server.js            # Main entry point for the server
```

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL (installed and running)

### Setting Up the Server

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory to configure your environment variables. Use the `.env.example` file as a reference.

4. Run database migrations to set up the PostgreSQL database:
   ```bash
   npm run migrate
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Setting Up the Client

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the client application:
   ```bash
   npm start
   ```

## Usage

Once both the server and client are running, you can access the application through your browser at [http://localhost:3000](http://localhost:3000). 

- **Registration**: Create an account to start booking.
- **Login**: Access your account to book seats, track buses, and manage your bookings.

## Contributing

We welcome contributions! If you'd like to help out, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your branch.
5. Create a pull request describing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
