// Modules
const express = require('express');

// Config Files
const appConfig = require('./config/app_config.js');
const swaggerConfig = require('./config/swagger_config.js');

// Authentication
const authenticate = require('./src/utilities/authenticate.js');

// Routes
const dogsRouter = require('./src/endpoints/dogs.js');
const usersRouter = require('./src/endpoints/users.js');
const accountsRouter = require('./src/endpoints/accounts.js');
const api_keysRouter = require('./src/endpoints/api_keys.js');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);

const port = process.env.PORT || 5000;

expressSwagger(swaggerConfig);

app.use(express.json());

//app.use(appConfig.baseUri, authenticate);

app.use(dogsRouter);
app.use(usersRouter);
app.use(accountsRouter);
app.use(api_keysRouter);

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => { console.log(`Doggo Express Server Listening on port ${port}!`); });