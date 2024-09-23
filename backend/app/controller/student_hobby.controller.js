var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var StudentHobby = db.student_hobby;
var Hobby = db.hobby;
var Student = db.student;
var Category = db.category;

// Получение всех студенческих хобби
exports.findAll = (req, res) => {
    StudentHobby.findAll({
        include: [
            {model: Hobby},
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

// Добавление студенческого хобби
exports.create = (req, res) => {
    StudentHobby.create({
        student_id: req.body.student_id,
        hobby_id: req.body.hobby_id,
        rating: req.body.rating
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление студенческого хобби по id
exports.update = (req, res) => {
    StudentHobby.update({
            student_id: req.body.student_id,
            hobby_id: req.body.hobby_id,
            rating: req.body.rating
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

// Удаление студенческого хобби по id
exports.delete = (req, res) => {
    StudentHobby.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение студенческого хобби по id
exports.findById = (req, res) => {
    StudentHobby.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление нескольких студенческих хобби
exports.createMultiple = async (req, res) => { 
    const hobbyIds = req.body.value;

    const promises = hobbyIds.map(hobbyId => {
        return StudentHobby.findOrCreate({
            where: { 
                student_id: req.body.student_id,
                hobby_id: hobbyId,
                rating: req.body.rating 
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

// Добавление студентом нового хобби
exports.addNewHobbyAndCategory = async (req, res) => { 
    const categoryName = req.body.category_name;
    const hobbyName = req.body.hobby_name;

    const [category] = await Category.findOrCreate({
        where: { name: categoryName }
    });

    const [hobby] = await Hobby.findOrCreate({
        where: {
            name: hobbyName,
            category_id: category.id
        }
    });

    StudentHobby.findOrCreate({
        where: {
            student_id: req.body.student_id,
            hobby_id: hobby.id,
            rating: req.body.rating
        }
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Получение списка хобби студента
exports.findHobbiesForStudent = (req, res) => {
    StudentHobby.findAll({
        where: { student_id: req.params.student_id },
        include: [{model: Hobby, include: [{model: Category}]},],
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};