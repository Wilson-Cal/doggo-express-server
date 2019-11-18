const express = require("express");
const swaggerConfig = require('./swagger_config');

const usersRouter = require('./src/endpoints/users.js');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(usersRouter);

app.get(`/`, (req, res) => {
    res.redirect('/api-docs')
});

expressSwagger(swaggerConfig)
app.listen(port, () => { console.log(`Doggo Express Server Listening on port ${port}!`) })