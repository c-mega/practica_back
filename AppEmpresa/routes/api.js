const router = require('express').Router();

const employeesRouter = require('./api/employees');
const departmentsRouter = require('./api/departments');

router.use('/employees', employeesRouter);
router.use('/departments', departmentsRouter);

module.exports = router;