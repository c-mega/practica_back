const dbConfig = require('../dbConfig');

//GET ALL - RECUPERO DEPARTAMENTOS

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departamento', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    });
}


//CREATE - CREO new department

const create = ({ nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT into departamento(nombre, ciudad) values (?,?)',
            [nombre, ciudad], (err, result) => {
                if (err) {
                    reject(err);
                } resolve(result);
            }
        )
    });
}

//GET BY ID
const getById = (pDepartmentId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from departamento where id = ?', [pDepartmentId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

//UPDATE- ACTUALIZO los departamentos

const update = ({ nombre, ciudad, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE departamento SET nombre = ?, ciudad = ? WHERE id = ?', [nombre, ciudad, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

//REMOVE- BORRO los datos de un departamento de esa tabla

const remove = (pDepartmentId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE from departamento WHERE id = ?', [pDepartmentId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = { getAll, create, getById, update, remove };