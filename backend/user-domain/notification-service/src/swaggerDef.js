// src/swaggerDef.js
module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Notification Service API',
    version: '1.0.0',
    description: 'Swagger docs for Notification Service'
  },
  servers: [
    { url: 'http://localhost:3003/api', description: 'Local QA' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    },
    schemas: {
      Notification: {
        type: 'object',
        required: ['userId','message','type'],
        properties: {
          userId: {
            type: 'string',
            description: 'ID of the user to notify',
            example: '64a3f9b7e1a4c9d3f0b7e4a'
          },
          message: {
            type: 'string',
            description: 'Notification text',
            example: 'Your order has been shipped.'
          },
          type: {
            type: 'string',
            enum: ['success','warning','error'],
            description: 'Notification category',
            example: 'success'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'When the notification was created',
            example: '2025-07-05T14:45:00Z'
          }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }]
};
