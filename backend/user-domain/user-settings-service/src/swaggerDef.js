// swaggerDef.js
module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'User Settings Service API',
    version: '1.0.0',
    description: 'Swagger docs for User Settings Service'
  },
  servers: [
    { url: 'http://localhost:3007/api', description: 'Local QA' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      UserSettings: {
        type: 'object',
        required: ['userId','theme','language'],
        properties: {
          userId: {
            type: 'string',
            description: 'Unique identifier of the user',
            example: '64a3f9b7e1a4c9d3f0b7e4a'
          },
          theme: {
            type: 'string',
            enum: ['light','dark'],
            description: 'UI theme preference',
            example: 'dark'
          },
          language: {
            type: 'string',
            description: 'Preferred language',
            example: 'es'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
            example: '2025-07-05T14:30:00Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
            example: '2025-07-05T15:00:00Z'
          }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }]
};
