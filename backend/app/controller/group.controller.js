var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var Group = db.group;
var EducationalProgram = db.educationalProgram;

// Получение всех групп
exports.findAll = (req, res) => {
    Group.findAll({
        include: [
            {model: EducationalProgram}
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление группы
exports.create = (req, res) => {
    Group.create({
        educationalProgram_id: req.body.educationalProgram_id,
        name: req.body.name,
        uid_json: req.body.uid_json,
        begin_date: req.body.begin_date
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных группы по id
exports.update = (req, res) => {
    Group.update({
            educationalProgram_id: req.body.educationalProgram_id,
            name: req.body.name,
            uid_json: req.body.uid_json,
            begin_date: req.body.begin_date
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

// Удаление группы по id
exports.delete = (req, res) => {
    Group.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение данных группы по id
exports.findById = (req, res) => {
    Group.findByPk(req.params.id, {
        include: [
            {model: EducationalProgram}
        ]
    })
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение списка групп по id направления
exports.findByEducationalProgramId = (req, res) => {
    Group.findAll({
        where: {
            educationalProgram_id: req.params.educationalProgram_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Загрузка групп из файла (и направлений)
exports.downloadGroups = async (req, res) => {
    try {
        // создаём объект для чтения данных, переданных со стороны клиента (передавали объект FormData)
        var form = new multiparty.Form();

        // читаем данные
        await form.parse(req, async (err, fields, files) => {
            const file = files.file[0];
            const data = JSON.parse(fs.readFileSync(file.path, 'utf-8'));

            // заполняем таблицу educationalProgram
            for (const item of data.hs_json.Output.Data) {
                await EducationalProgram.findOrCreate({
                    where: { name: item.СпециальностьНаименование }
                });
            }

            // заполняем таблицу group
            for (const item of data.hs_json.Output.Data) {
                const educationalProgram = await EducationalProgram.findOne({
                    where: { name: item.СпециальностьНаименование }
                });

                const groupName = item.Группа.name;
                const groupUidJson = item.Группа.uid;
                const year = new Date().getFullYear() - parseInt(groupName.substring(2, 3));
                const beginDate = new Date(year, 8, 1); // 8 = September

                await Group.findOrCreate({
                    where: { uid_json: groupUidJson },
                    defaults: {
                      name: groupName,
                      educationalProgram_id: educationalProgram.id,
                      uid_json: groupUidJson,
                      begin_date: beginDate
                    }
                });
            }
            res.status(200).json({ message: 'Data uploaded successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading data' });
    }
};