// src/swaggerDef.js
module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Users Service API',
    version: '1.0.0',
    description: 'Swagger docs for Users Service'
  },
  servers: [
    { url: '/api/users', description: 'Users Service (vía API-Gateway)' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    }
  },
  security: [{ bearerAuth: [] }]
};
