// src/swaggerDef.js
module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Profile Service API',
    version: '1.0.0',
    description: 'Swagger docs for Profile Service'
  },
  servers: [
    { url: 'http://localhost:3006/api', description: 'Local QA' }
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
      Profile: {
        type: 'object',
        required: ['userId','name','email'],
        properties: {
          userId: {
            type: 'string',
            description: 'Unique identifier of the user',
            example: '64a3f9b7e1a4c9d3f0b7e4a'
          },
          name: {
            type: 'string',
            description: 'Full name of the user',
            example: 'Jane Doe'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address',
            example: 'jane.doe@example.com'
          },
          bio: {
            type: 'string',
            description: 'Short biography',
            example: 'Music lover and educator.'
          }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }]
};
