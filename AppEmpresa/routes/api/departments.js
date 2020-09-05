const router = require('express').Router();
const { getAll, create, getById } = require('../../models/department');


//RECUPERO LOS DEPARTAMENTOS CON GET

router.get('/', async (req, res) => {
    try {
        const departments = await getAll();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//CREO NEW DEPARTMENT CON POST

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        if (result['affectedRows'] === 1) {
            //Recupero el new department
            const newDepartment = await getById(result['insertId']);
            res.status(201).json({ success: 'A new department has been added into this database', department: newDepartment });
        } else {
            res.status(422).json({ error: 'The new department has not been inserted properly' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;