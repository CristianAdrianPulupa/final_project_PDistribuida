// src/swaggerDef.js
export default {
  openapi: '3.0.0',
  info: {
    title: 'User Status Service API',
    version: '1.0.0',
    description: 'Swagger docs for User Status Service'
  },
  servers: [
    { url: 'http://localhost:3008/api', description: 'Local QA' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    },
    schemas: {
      UserStatus: {
        type: 'object',
        required: ['userId','status'],
        properties: {
          userId: {
            type: 'string',
            description: 'Unique identifier of the user',
            example: '64a3f9b7e1a4c9d3f0b7e4a'
          },
          status: {
            type: 'string',
            description: 'Current status message of the user',
            example: 'Online'
          },
          lastUpdated: {
            type: 'string',
            format: 'date-time',
            description: 'ISO timestamp of last status update',
            example: '2025-07-05T13:45:00Z'
          }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }]
};
