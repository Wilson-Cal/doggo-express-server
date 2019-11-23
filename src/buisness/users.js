const bcrypt = require('bcrypt');

const dbRequest = require('../utilities/db_request.js');

const saltRounds = 10;

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const selectQuery = `SELECT id, username, email FROM user_app WHERE id = ${id}`;
        const users = await dbRequest(selectQuery);
        const user = users[0] ? users[0] : {};
        res.contentType('application/json');
        res.send(JSON.stringify(user));
    } catch (err) {
        res.contentType('application/json');
        res.status(500);
        res.send(JSON.stringify(err));
    }
};

const updateUser = (req, res) => {
    const { id } = req.params;
    res.contentType('application/json');
    res.send(JSON.stringify({ id }));
};

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const insertQuery = `INSERT INTO user_app(username, email, user_password) VALUES('${username}', '${email}', '${hashedPassword}') RETURNING id, username, email`;
        const users = await dbRequest(insertQuery);
        const user = users[0] ? users[0] : {};
        res.contentType('application/json');
        res.send(JSON.stringify(user));
    } catch (err) {
        res.contentType('application/json');
        res.status(500);
        res.send(JSON.stringify(err));
    }

};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteQuery = `DELETE from user_app WHERE id = ${id}`;
        await dbRequest(deleteQuery);
        res.contentType('application/json');
        res.send(JSON.stringify({ id }));
    } catch (err) {
        res.contentType('application/json');
        res.status(500);
        res.send(JSON.stringify(err));
    }

};

module.exports = {
    getUser,
    updateUser,
    createUser,
    deleteUser
};