var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var EventHobby = db.event_hobby;
var Hobby = db.hobby;
var Event = db.event;

// Получение всех хобби для мероприятия
exports.findAll = (req, res) => {
    EventHobby.findAll({
        include: [
            {model: Hobby},
            {model: Event}
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление хобби для мероприятия
exports.create = (req, res) => {
    EventHobby.create({
        event_id: req.body.event_id,
        hobby_id: req.body.hobby_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление хобби для мероприятия по id
exports.update = (req, res) => {
    EventHobby.update({
            event_id: req.body.event_id,
            hobby_id: req.body.hobby_id
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

// Удаление хобби для мероприятия по id
exports.delete = (req, res) => {
    EventHobby.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение хобби для мероприятия по id
exports.findById = (req, res) => {
    EventHobby.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление нескольких хобби для мероприятия
exports.createMultiple = async (req, res) => { 
    const hobbyIds = req.body.value;

    const promises = hobbyIds.map(hobbyId => {
        return EventHobby.findOrCreate({
            where: { 
                event_id: req.body.event_id,
                hobby_id: hobbyId
            }
        });
    });

    // Дожидаемся завершения всех асинхронных операций
    Promise.all(promises)
        .then(objects => {
        globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
        globalFunctions.sendError(res, err);
        });
};

// Получение хобби мероприятия
exports.findHobbiesForEvent = (req, res) => {
    EventHobby.findAll({
        include: [
            {
                model: Event,
                required: true, // INNER JOIN
                where: {
                    id: req.params.event_id
                }
            },
            {
                model: Hobby,
                required: true, // INNER JOIN
            }
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};