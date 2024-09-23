var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var StudentGroup = db.student_group;
var Group = db.group;
var Student = db.student;

// Получение всех студенческих групп
exports.findAll = (req, res) => {
    StudentGroup.findAll({
        include: [
            {model: Group},
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

// Добавление студенческой группы
exports.create = (req, res) => {
    StudentGroup.create({
        student_id: req.body.student_id,
        group_id: req.body.group_id,
        begin_date: req.body.begin_date,
        end_date: req.body.end_date 			
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных студенческой группы по id
exports.update = (req, res) => {
    StudentGroup.update({
            student_id: req.body.student_id,
            group_id: req.body.group_id,
            begin_date: req.body.begin_date,
            end_date: req.body.end_date
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

// Удаление студенческой группы по id
exports.delete = (req, res) => {
    StudentGroup.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение данных студенческой группы по id
exports.findById = (req, res) => {
    StudentGroup.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение студентов группы
exports.findStudentsForGroup = async (req, res) => {
    const today = new Date();
    StudentGroup.findAll({
        include: [
            {
                model: Group,
                required: true, // INNER JOIN
                where: {
                    id: req.params.group_id
                }
            },
            {
                model: Student,
                required: true, // INNER JOIN
            }
        ],
        where: {
            begin_date: {
                [Op.lte]: today
            },
            end_date: null //{[Op.gte]: today}
        }
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение названия группы, в которой состоит студент на данный момент
exports.findCurrentGroup = (req, res) => {
    const today = new Date();
    StudentGroup.findOne({
        where: {
            student_id: req.params.student_id,
            begin_date: {[Op.lte]: today},
            end_date: null // выбираем запись, у которой end_date равен null, то есть студент находится в группе в настоящее время
        },
        include: [{
            model: Group,
            attributes: ['name'] // выбираем только название группы
        }]
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Получение студентов группы, которые не прошли анкетирование
exports.findStudentsWithoutFormForGroup = (req, res) => {
    const today = new Date();
    StudentGroup.findAll({
        include: [
            {
                model: Group,
                required: true, // INNER JOIN
                where: {
                    id: req.params.group_id
                }
            },
            {
                model: Student,
                required: true, // INNER JOIN
                where: {
                    birthday: null
                }
            }
        ],
        where: {
            begin_date: {
                [Op.lte]: today
            },
            end_date: null
        }
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление студенческой группы
exports.createNewAndUpdateOld = async (req, res) => {
    const oldRecord = await StudentGroup.findOne({
        where: {
            student_id: req.body.student_id,
            end_date: null // выбираем запись, у которой end_date равен null, то есть студент находится в группе в настоящее время
        }
    });

    if (oldRecord && req.body.begin_date < oldRecord.begin_date) {
        res.status(404).send({
            accessToken: null,
            message: "Дата начала новой записи должна быть позже даты начала старой записи"
        });
        return;
    }

    if (oldRecord) {
        const yesterday = new Date(req.body.begin_date);
        yesterday.setDate(yesterday.getDate() - 1);

        await StudentGroup.update({
            end_date: yesterday
        },
        {
            where: {
                id: oldRecord.id
            }
        });
    }

    StudentGroup.create({
        student_id: req.body.student_id,
        group_id: req.body.group_id,
        begin_date: req.body.begin_date,
        end_date: null			
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};