const bcrypt = require('bcrypt');

const dbRequest = require('./db_request.js');

const saltRounds = 10;

const getUser = async (req, res) => {
    const { id } = req.params;
    res.contentType('application/json');
    res.send(JSON.stringify({ id }));
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
        const insertQuery = `INSERT INTO user(username, email, user_password) VALUES('${username}', '${email}', '${hashedPassword}') RETURNING id, username, email`;
        const user = await dbRequest(insertQuery);
        res.contentType('application/json');
        res.send(JSON.stringify(user));
    } catch (err) {
        res.contentType('application/json');
        res.sendStatus(500);
        res.send(JSON.stringify(err));
    }

};

const deleteUser = (req, res) => {
    const { id } = req.params;
    res.contentType('application/json');
    res.send(JSON.stringify({ id }));
};

module.exports = {
    getUser,
    updateUser,
    createUser,
    deleteUser
};