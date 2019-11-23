// Modules
const express = require('express');
const cors = require('cors');

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

app.use(cors());
app.user(express.json());

// Endpoints that do not require authentication
app.use(accountsRouter);

// Authenticate requests
app.use(appConfig.baseUri, authenticate);

// Endpoints that require authentication
app.use(dogsRouter);
app.use(usersRouter);
app.use(api_keysRouter);

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => { console.log(`Doggo Express Server Listening on port ${port}!`); });