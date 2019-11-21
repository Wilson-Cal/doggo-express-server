const uuidAPIKey = require('uuid-apikey');

const dbRequest = require('../utilities/db_request.js');

const createApiKey = async (req, res) => {
    const { user_id } = req.body;
    const apiKey = uuidAPIKey.create();
    const insertQuery = `INSERT INTO api_key(uuid, user_id) VALUES('${apiKey.uuid}', '${user_id}')`;
    await dbRequest(insertQuery);
    res.contentType('application/json');
    res.send(JSON.stringify({ api_key: apiKey.apiKey }));
};

const deleteApiKey = (req, res) => {
    const { id } = req.params;
    res.contentType('application/json');
    res.send(JSON.stringify({ id }));
};

module.exports = {
    createApiKey,
    deleteApiKey
};