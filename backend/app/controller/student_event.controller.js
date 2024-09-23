var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var StudentEvent = db.student_event;
var Event = db.event;
var Student = db.student;
var Category = db.category;

// Получение всех мероприятий студента
exports.findAll = (req, res) => {
    StudentEvent.findAll({
        include: [
            {model: Event},
            {model: Student}
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление мероприятия студента
exports.create = (req, res) => {
    StudentEvent.create({
        student_id: req.body.student_id,
        event_id: req.body.event_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление мероприятия студента по id
exports.update = (req, res) => {
    StudentEvent.update({
            student_id: req.body.student_id,
            event_id: req.body.event_id
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

// Удаление мероприятия студента по id
exports.delete = (req, res) => {
    StudentEvent.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение мероприятия студента по id
exports.findById = (req, res) => {
    StudentEvent.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
