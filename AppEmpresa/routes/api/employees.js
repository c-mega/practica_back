const router = require('express').Router();
const { getAll } = require('../../models/employee');


//Recupero con get

router.get('/', async (req, res) => {
    try {
        const employees = await getAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;