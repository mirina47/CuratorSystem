var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Hobby = db.hobby;

// Получение всех хобби
exports.findAll = (req, res) => {
    Hobby.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление хобби
exports.create = (req, res) => {
    Hobby.create({
        name: req.body.name,
        category_id: req.body.category_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление хобби по id
exports.update = (req, res) => {
    Hobby.update({
            name: req.body.name,
            category_id: req.body.category_id
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

// Удаление хобби по id
exports.delete = (req, res) => {
    Hobby.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение хобби по id
exports.findById = (req, res) => {
    Hobby.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение списка хобби по id категории
exports.findByCategoryId = (req, res) => {
    Hobby.findAll({
        where: {
            category_id: req.params.category_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
