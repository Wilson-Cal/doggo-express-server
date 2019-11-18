// Modules
const express = require("express");

// Config Files
const swaggerConfig = require('./config/swagger_config.js');

// Routes
const usersRouter = require('./src/endpoints/users.js');
const dogsRouter = require('./src/endpoints/dogs.js');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);

const port = process.env.PORT || 5000;

expressSwagger(swaggerConfig)

app.use(express.json());

app.use(usersRouter);
app.use(dogsRouter);

app.get(`/`, (req, res) => {
    res.redirect('/api-docs')
});

app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => { console.log(`Doggo Express Server Listening on port ${port}!`) })