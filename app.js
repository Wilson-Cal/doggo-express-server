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
app.get(`${baseUri}/`, (req, res) => {
    res.status(200);
    res.contentType('application/json');
    res.send(JSON.stringify({ hello: "there" }));
});

expressSwagger(swaggerConfig)
app.listen(port, () => { console.log(`Doggo Express Server Listening on port ${port}!`) })