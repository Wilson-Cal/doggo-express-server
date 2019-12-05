const bcrypt = require('bcrypt');
const uuidAPIKey = require('uuid-apikey');

const { createUser } = require('./users.js');
const dbRequest = require('../utilities/db_request.js');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const getQuery = `SELECT user_password FROM user_app WHERE email = '${email}'`;

        const hashedPasswordData = await dbRequest(getQuery);
        const hashedPassword = hashedPasswordData[0].user_password ? hashedPasswordData[0].user_password : false;
        if (hashedPassword) {
            // Check Hashed password against sent password
            const match = await bcrypt.compare(password, hashedPassword);
            if (match) {
                // Generate temp cookie value
                const cookieValue = uuidAPIKey.create();
                // Write the temp cookie value to the database
                const updateQuery = `UPDATE user_app SET temp_auth = '${cookieValue.uuid}' WHERE email = '${email}'`;
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
            res.send(JSON.stringify({ match: false }));
        }
    } catch (err) {
        console.log(err);
        res.contentType('application/json');
        res.status(500);
        res.send(err);
    }
};

const signup = async (req, res) => {
    await createUser(req, res);
};

module.exports = { login, signup };