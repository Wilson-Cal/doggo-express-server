const uuidAPIKey = require('uuid-apikey');

const dbRequest = require('./db_request.js');

const authenticate = async (req, res, next) => {
    var token = req.headers.authorization;
    if (token) {
        try {
            const their_uuid = uuidAPIKey.toUUID(token);
            const selectQuery = `SELECT * FROM api_key WHERE uuid = '${their_uuid}'`;
            const uuids = await dbRequest(selectQuery);
            const our_uuid = uuids[0] ? uuids[0].uuid : null;
            if (their_uuid === our_uuid) {
                next();
            } else {
                return res.status(403).send(JSON.stringify({
                    success: false,
                    message: 'Invalid token provided.'
                }));
            }
        } catch (err) {
            if (err.message.includes('not a valid apiKey')) {
                return res.status(403).send(JSON.stringify({
                    success: false,
                    message: 'Invalid token provided.'
                }));
            } else {
                return res.status(500).send(err.message);
            }
        }

    } else {
        return res.status(403).send(JSON.stringify({
            success: false,
            message: 'No token provided.'
        }));
    }
};

module.exports = authenticate;