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
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '64f0c0e2b6e7a2a1b2c3d4e5' },
            matric_number: { type: 'string', example: 'ABC/1234/5678' },
            jambReg: { type: 'string', example: 'JAMB123456' },
            email: { type: 'string', example: 'student@fuoye.edu.ng' },
            password: { type: 'string', example: 'hashedpassword' },
            full_name: { type: 'string', example: 'John Doe' },
            faculty_name: { type: 'string', example: 'Engineering' },
            department_name: { type: 'string', example: 'Computer Engineering' },
            user_type: { type: 'string', example: 'student' },
            university_id: { type: 'string', example: 'UNIV-2025-XYZ123' },
            level: { type: 'integer', example: 100 },
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
