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

module.exports = { getAll, create, getById };