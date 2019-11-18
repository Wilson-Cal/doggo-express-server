let swagger_config = {
    swaggerDefinition: {
        info: {
            description: 'REST API for the Doggo App',
            version: '1.0.0',
        },
        host: 'doggo-express-server.herokuapp.com',
        basePath: '/api/v1',
        produces: [
            "application/json"
        ],
        schemes: ['https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./*.js'] //Path to the API handle folder
};

module.exports = swagger_config;