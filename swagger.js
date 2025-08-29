const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payify Student Payment API',
      version: '1.0.0',
      description: 'API documentation for the Payify student payment system. This helps you understand and test the endpoints.'
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://payify-server.vercel.app'
          : 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Local server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '64f0c0e2b6e7a2a1b2c3d4e5' },
            email: { type: 'string', example: 'student@fuoye.edu.ng' },
            full_name: { type: 'string', example: 'Oyindamola Ajala' },
            created_at: { type: 'string', format: 'date-time', example: '2025-08-29T12:00:00.000Z' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCssUrl: 'https://unpkg.com/swagger-ui-dist/swagger-ui.css',
      customJs: [
        'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
        'https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js',
      ],
    })
  );
};
