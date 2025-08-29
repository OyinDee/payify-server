const swaggerJsdoc = require('swagger-jsdoc');

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
        url: 'http://localhost:5000',
        description: 'Local server'
      }
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
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  // Serve Swagger JSON
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Serve Swagger UI using CDN
  app.get('/docs', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Payify API Docs</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"></script>
        <script>
          window.onload = function() {
            SwaggerUIBundle({
              url: '/swagger.json',
              dom_id: '#swagger-ui',
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              layout: 'StandaloneLayout'
            });
          };
        </script>
      </body>
      </html>
    `);
  });
};
