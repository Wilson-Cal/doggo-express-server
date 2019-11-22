const bcrypt = require('bcrypt');
const uuidAPIKey = require('uuid-apikey');

const { createUser } = require('./users.js');
const dbRequest = require('../utilities/db_request.js');

const login = async (req, res) => {
    const { email, password } = req.body;
    const getQuery = `GET password FROM user WHERE email = ${email}`;
    const hashedPassword = await dbRequest(getQuery);
    if (hashedPassword) {
        // Check Hashed password against sent password
        const match = await bcrypt.compare(password, hashedPassword);
        if (match) {
            // Generate temp cookie value
            const cookieValue = uuidAPIKey.create();
            // Write the temp cookie value to the database
            const updateQuery = '';
            await dbRequest(updateQuery);
            // Send success to the user
            res.contentType('application/json');
            res.send(JSON.stringify({ match, cookieValue: cookieValue.apiKey }));
        } else {
            // Send failure to user
            res.contentType('application/json');
            res.send(JSON.stringify({ match }));
        }
    } else {
        // Send failure to user
        res.contentType('application/json');
        res.send({ match: false });
    }
};

const signup = async (req, res) => {
    await createUser(req, res);
};

module.exports = { login, signup };