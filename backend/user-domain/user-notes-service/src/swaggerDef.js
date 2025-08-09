// src/swaggerDef.js
export default {
  openapi: '3.0.0',
  info: {
    title: 'User Notes Service API',
    version: '1.0.0',
    description: 'Swagger docs for User Notes Service'
  },
  servers: [
    { url: 'http://localhost:3009/api', description: 'Local QA' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    },
    schemas: {
      UserNote: {
        type: 'object',
        required: ['userId', 'content'],
        properties: {
          userId: {
            type: 'string',
            description: 'ID of the user who owns the note',
            example: '64a3f9b7e1a4c9d3f0b7e4a'
          },
          content: {
            type: 'string',
            description: 'Text content of the note',
            example: 'Remember to review the project design.'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the note was created',
            example: '2025-07-05T14:00:00Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the note was last updated',
            example: '2025-07-05T15:30:00Z'
          }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }]
};
