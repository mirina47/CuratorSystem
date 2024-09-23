var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var StudentRating = db.student_rating;
var StudentHobby = db.student_hobby;
var Event = db.event;

// Получение всех записей о рейтинге студента
exports.findAll = (req, res) => {
    StudentRating.findAll({
        include: [
            {model: StudentHobby},
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

// Добавление записи о рейтинге студента
exports.create = (req, res) => {
    StudentRating.create({
        student_hobby_id: req.body.student_hobby_id,
        event_id: req.body.event_id,
        datetime: req.body.datetime,
        type_score: req.body.type_score,
        score: req.body.score,
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление записи о рейтинге студента
exports.update = (req, res) => {
    StudentRating.update({
            student_hobby_id: req.body.student_hobby_id,
            event_id: req.body.event_id,
            datetime: req.body.datetime,
            type_score: req.body.type_score,
            score: req.body.score,
            name: req.body.name
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

// Удаление записи о рейтинге студента по id
exports.delete = (req, res) => {
    StudentRating.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение записи о рейтинге студента по id
exports.findById = (req, res) => {
    StudentRating.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.updateRatingForStudent = async (req, res) => {
    try {
        const student_id = req.params.student_id;
        const studentHobbies = await StudentHobby.findAll({
            where: { student_id: student_id }
        });

        for (const studentHobby of studentHobbies) {
            const sum = await StudentRating.sum('score', {
                where: {
                    student_hobby_id: studentHobby.id
                }
            });

            await StudentHobby.update({ rating: sum }, {
                where: {
                    id: studentHobby.id
                }
            });
        }

        return "Student ratings updated successfully";
    } catch (error) {
        return error;
    }
};

