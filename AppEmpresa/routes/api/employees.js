const router = require('express').Router();
const { getAll, getById, create, update, remove } = require('../../models/employee');


//GET ALL EMPLOYEES WITH GET

router.get('/', async (req, res) => {
    try {
        const employees = await getAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//CREATE NEW EMPLOYEE WITH POST

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


// EDIT AN EMPLOYEE WITH PUT

router.put('/', async (req, res) => {
    try {
        const result = await update(req.body);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'An employee has been edited' });
        } else {
            res.status(422).json({ error: 'The changes in the database has not been committed' });
        }
    } catch (error) { //servidor tiene algún tipo de error, no el usuario
        res.status(500).json({ error: error.message });
    }
});



// DELETE AN EMPLOYEE WITH DELETE

router.delete('/', async (req, res) => {
    try {
        const result = await remove(req.body.id);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'The employee selected has been removed from the database' });
        } else {
            res.json({ error: 'The employee has not been removed correctly. Please, review the ID' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;