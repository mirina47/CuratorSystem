var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var TeacherGroup = db.teacher_group;
var Group = db.group;
var User = db.user;

// Получение всех преподавательских групп
exports.findAll = (req, res) => {
    TeacherGroup.findAll({
        include: [
            {model: Group},
            {model: User}
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление преподавательской группы
exports.create = (req, res) => {
    TeacherGroup.create({ 																			
        group_id: req.body.group_id,
        user_id: req.body.user_id,
        begin_date: req.body.begin_date,
        end_date: req.body.end_date
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных преподавательской группы по id
exports.update = (req, res) => {
    TeacherGroup.update({
            group_id: req.body.group_id,
            user_id: req.body.user_id,
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

// Удаление преподавательской группы по id
exports.delete = (req, res) => {
    TeacherGroup.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение данных преподавательской группы по id
exports.findById = (req, res) => {
    TeacherGroup.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных преподавательской группы по id
exports.findById = (req, res) => {
    TeacherGroup.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение категорий пользователя
exports.findGroupsForUser = (req, res) => {
    TeacherGroup.findAll({
        include: [
            {
                model: User,
                required: true, // INNER JOIN
                where: {
                    id: req.params.user_id
                }
            },
            {
                model: Group,
                required: true, // INNER JOIN
            }
        ],
        where: {
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

// Получение категорий, которые пользователь не выбрал
exports.findGroupsNotUser = async (req, res) => {
    db.sequelize.query(
        'SELECT * FROM `group` WHERE id NOT IN (SELECT group_id FROM teacher_group WHERE end_date IS NULL)',
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.user_id] // подстановка параметров
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
 };


// Добавление массива категорий
exports.createGroups = (req, res) => {
    var groups = req.body.groups;
    var data = [];
    const beginDate = new Date(2022, 8, 1); // 1 сентября 2022
    for (var i = 0; i < groups.length; i++) {
        // сначала добавляем идентификатор категории
        data.push(groups[i]);
        // затем добавляем идентификатор пользователя
        data.push(req.body.user_id);
        // затем добавляем дату, когда пользователь стал куратором группы
        data.push(beginDate);
    }
    var placeholders = groups.map(() => '(?,?,?)').join(',');
    db.sequelize.query(
        `INSERT INTO teacher_group(group_id, user_id, begin_date) VALUES ` + placeholders,
        {
            type: db.sequelize.QueryTypes.INSERT,
            replacements: data // подстановка параметров
        })
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

// Удаление группы пользователя
exports.deleteGroupForUser = (req, res) => {
    TeacherGroup.update({
        end_date: new Date()
    },
    {
        where: {
            id: req.params.user_group_id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        console.log(err);
        globalFunctions.sendError(res, err);
    });
};