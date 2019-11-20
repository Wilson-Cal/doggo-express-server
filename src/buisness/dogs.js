const dbRequest = require('./db_request.js');

const getDog = async (req, res) => {
    const { id } = req.params;
    const selectQuery = `SELECT * FROM dog WHERE id = ${id}`;
    const dog = await dbRequest(selectQuery);
    res.contentType('application/json');
    res.send(JSON.stringify(dog[0]));
};

const getDogs = async (req, res) => {
    const { user_id } = req.params;
    const selectQuery = `SELECT * FROM dog WHERE owner_id = ${user_id}`;
    const dogs = await dbRequest(selectQuery);
    res.contentType('application/json');
    res.send(JSON.stringify(dogs));
};

const updateDog = (req, res) => {
    const { id } = req.params;
    res.contentType('application/json');
    res.send(JSON.stringify({ id }));
};

const createDog = async (req, res) => {
    const { owner_id, name, type, age, available, price, color, weight, height } = req.body;
    const insertQuery = `INSERT INTO dog(owner_id, dog_name, type_of_dog, age, available, price, color, dog_weight, dog_height) VALUES('${owner_id}', '${name}', '${type}', '${age}', '${available}', '${price}', '${color}', '${weight}', '${height}') RETURNING *`;
    try {
        const newDog = await dbRequest(insertQuery);
        res.contentType('application/json');
        res.send(JSON.stringify(newDog[0]));
    } catch (err) {
        res.contentType('application/json');
        res.sendStatus(500);
        res.send(JSON.stringify(err));
    }
};

const deleteDog = async (req, res) => {
    const { id } = req.params;
    const deleteQuery = `DELETE from dog WHERE id = ${id}`;
    try {
        await dbRequest(deleteQuery);
        res.contentType('application/json');
        res.send(JSON.stringify({ id }));
    } catch (err) {
        res.contentType('application/json');
        res.sendStatus(500);
        res.send(JSON.stringify(err));
    }
};

module.exports = {
    getDog,
    getDogs,
    updateDog,
    createDog,
    deleteDog
};