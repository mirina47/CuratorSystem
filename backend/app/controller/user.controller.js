var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var User = db.user;

// Получение всех пользователей
exports.findAll = (req, res) => {
    User.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    User.create({
        login: req.body.login,
        password: req.body.password,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        role: req.body.role
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных пользователя по id
exports.update = (req, res) => {
    User.update({
            login: req.body.login,
            password: req.body.password,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            role: req.body.role
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


// Удаление пользователя по id
exports.delete = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};


// Получение данных пользователя по id
exports.findById = (req, res) => {
    User.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение списка пользователей по login
exports.findByLogin = (req, res) => {
    User.findAll({
        where: {
            login: req.params.login
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Получение списка пользователей по role
exports.findByRole = (req, res) => {
    User.findAll({
        where: {
            role: req.params.role
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Получение списка пользователей по name
exports.findByName = (req, res) => {
    const name = req.params.name;
    User.findAll({
        where: {
            [Op.or]: [
                { lastname: { [Op.like]: `%${name}%` } },
                { firstname: { [Op.like]: `%${name}%` } },
                { middlename: { [Op.like]: `%${name}%` } }
              ]
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};