const router = require('express').Router();
const { getAll, create, getById, update, remove } = require('../../models/department');


//GET ALL DEPARTMENTS WITH GET

router.get('/', async (req, res) => {
    try {
        const departments = await getAll();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//CREATE NEW DEPARTMENT WITH POST

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


//UPDATE A DEPARTMENT WITH PUT 

router.put('/', async (req, res) => {
    try {
        const result = await update(req.body);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'This department has been edited' });
        } else {
            res.status(422).json({ error: 'The changes in the table department have not been committed' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// REMOVE A DEPARTMENT WITH DELETE

router.delete('/', async (req, res) => {
    try {
        const result = await remove(req.body.id);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'The department selected has been removed from the database' });
        } else {
            res.json({ error: 'The department has not been removed properly. Please, review the ID department' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;