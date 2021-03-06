const dbRequest = require('../utilities/db_request.js');

const getDog = async (req, res) => {
    const { id } = req.params;
    try {
        const selectQuery = `SELECT * FROM dog WHERE id = ${id}`;
        const dogs = await dbRequest(selectQuery);
        const dog = dogs[0] ? dogs[0] : {};
        res.contentType('application/json');
        res.send(JSON.stringify(dog));
    } catch (err) {
        res.contentType('application/json');
        res.status(500);
        res.send(JSON.stringify(err));
    }
};

const getDogs = async (req, res) => {
    const { user_id } = req.params;
    try {
        const selectQuery = `SELECT * FROM dog WHERE owner_id = ${user_id}`;
        const dogs = await dbRequest(selectQuery);
        res.contentType('application/json');
        res.send(JSON.stringify(dogs));
    } catch (err) {
        res.contentType('application/json');
        res.status(500);
        res.send(JSON.stringify(err));
    }
};

const updateDog = (req, res) => {
    const { id } = req.params;
    res.contentType('application/json');
    res.send(JSON.stringify({ id }));
};

const createDog = async (req, res) => {
    const { owner_id, name, type, sex, age, available, price, color, weight, height } = req.body;
    const insertQuery = `INSERT INTO dog(owner_id, dog_name, type_of_dog, sex, age, available, price, color, dog_weight, dog_height) VALUES('${owner_id}', '${name}', '${type}', '${sex}', '${age}', '${available}', '${price}', '${color}', '${weight}', '${height}') RETURNING *`;
    try {
        const newDog = await dbRequest(insertQuery);
        res.contentType('application/json');
        res.send(JSON.stringify(newDog[0]));
    } catch (err) {
        res.contentType('application/json');
        res.status(500);
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
        res.status(500);
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