const express = require("express");
const swaggerConfig = require('./swagger_config');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);

const port = process.env.PORT || 5000;
const baseUri = '/api/v1';

/**
 * @route GET /
 * @group Test - Testing...
 * @returns {object} 200 - Hello World
 * @returns {Error}  default - Unexpected error
 */
app.get(`/`, (req, res) => {
    res.redirect('/api-docs')
});

expressSwagger(swaggerConfig)
app.listen(port, () => { console.log(`Doggo Express Server Listening on port ${port}!`) })