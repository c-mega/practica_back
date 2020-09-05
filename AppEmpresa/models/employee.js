const dbConfig = require('../dbConfig');

//GET ALL - RECUPERO
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    });
}


//GET BY ID (para  operar con post, put y delete)
const getById = (pEmployeeId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados where id = ?', [pEmployeeId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

//CREATE - CREO new employee

const create = ({ nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, jefe_id }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into empleados(nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, jefe_id) values (?,?,?,?,?,?,?,?)',
            [nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, jefe_id], (err, result) => {
                if (err) {
                    reject(err);
                } resolve(result);
            }
        )
    });
}



module.exports = { getAll, getById, create };