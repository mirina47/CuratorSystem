var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Contact = db.contact;

// Получение всех контактов
exports.findAll = (req, res) => {
    Contact.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление контакта
exports.create = (req, res) => {
    Contact.create({
        student_id: req.body.student_id,
        telephone: req.body.telephone,
        email: req.body.email,
        address: req.body.address,
        relationship: req.body.relationship,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        middlename: req.body.middlename
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление контакта по id
exports.update = (req, res) => {
    Contact.update({
            student_id: req.body.student_id,
            telephone: req.body.telephone,
            email: req.body.email,
            address: req.body.address,
            relationship: req.body.relationship,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            middlename: req.body.middlename
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

// Удаление контакта по id
exports.delete = (req, res) => {
    Contact.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение контакта по id
exports.findById = (req, res) => {
    Contact.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение контакта по id студента
exports.findByStudentId = (req, res) => {
    Contact.findOne({
        where: {
            student_id: req.params.student_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};