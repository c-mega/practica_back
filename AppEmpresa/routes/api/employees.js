const router = require('express').Router();
const { getAll, getById, create } = require('../../models/employee');


//RECUPERO CON GET

router.get('/', async (req, res) => {
    try {
        const employees = await getAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//CREO NEW EMPLOYEE CON POST

router.post('/', async (req, res) => {
    try {
        req.body.fecha_inc = new Date();
        const result = await create(req.body);
        if (result['affectedRows'] === 1) {
            //Recupero el new employee
            const newEmployee = await getById(result['insertId']);
            res.status(201).json({ success: 'A new employee has been inserted into the database', employee: newEmployee });
        } else {
            res.status(422).json({ error: 'A mistake appear and the new employee has not been inserted correctly' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;