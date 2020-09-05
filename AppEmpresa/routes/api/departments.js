const router = require('express').Router();
const { getAll } = require('../../models/department');


//RECUPERO LOS DEPARTAMENTOS CON GET

router.get('/', async (req, res) => {
    try {
        const departments = await getAll();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;