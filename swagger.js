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
      { url: 'http://localhost:5000', description: 'Local server' },
      { url: 'https://payify-server.vercel.app', description: 'Production server' }
    ],
    components: { /* your schemas */ }
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
