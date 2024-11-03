import { config } from 'dotenv';

const PORT = process.env.PORT || 9000

config();
const basicInfo = {
    openapi: "3.0.0",
    info: {
      title: "Twende API",
      version: "1.0.0",
      description: "This is the APIs documentation for Twende Platform"
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server"
      },
      {
        url: "https://twende-server.vercel.app/",
        description: "Production server (HTTPS)"
      }
    ],
    tags: [
      {
        name: "Location",
        description: "APIs for managing locations for buses, passengers and stages"
      },
      {
        name: "Booking",
        description: "APIs for managing Booking of seats, checking availability and getting all seats"
      }, 
      {
        name: "Authentication",
        description: "APIs for managing registration and login of users"
      }, 
      {
        name: "Payment",
        description: "APIs for managing registration and login of users"
      },
      {
        name: "Company",
        description: "APIs for managing companies - restricted fully to admin users"
      },
      {
        name: "Bus",
        description: "APIs for managing buses"
      },
    ],
    components: {
        securitySchemes: {
            Bearer: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header'
            }
          }
    },
    security: [
      {
        Bearer: []
      }
    ]
  };
  
  export default basicInfo;