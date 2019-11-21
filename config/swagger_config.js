const swagger_config = {
    swaggerDefinition: {
        info: {
            description: 'REST API for the Doggo App',
            title: 'Doggo API',
            version: '0.1.0',
        },
        host: 'localhost:5000',
        basePath: '/api/v1',
        produces: [
            'application/json'
        ],
        schemes: ['http'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: '',
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['../src/endpoints/*.js'] //Path to the API handle folder
};

module.exports = swagger_config;