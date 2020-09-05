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
        db.query('INSERT into empleados(nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, jefe_id) values (?,?,?,?,?,?,?,?)',
            [nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, jefe_id], (err, result) => {
                if (err) {
                    reject(err);
                } resolve(result);
            }
        )
    });
}


//UPDATE- ACTUALIZO los datos de un empleado de la database

const update = ({ nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, jefe_id, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE empleados SET nombre = ?, dni = ?, sexo = ?, fecha_nac = ?, fecha_inc = ?, salario = ?, cargo = ?, jefe_id = ? WHERE id = ?', [nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, jefe_id, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}


//REMOVE- BORRO los datos de un empleado de la database

const remove = (pEmployeeId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE from empleados WHERE id = ?', [pEmployeeId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}



module.exports = { getAll, getById, create, update, remove };