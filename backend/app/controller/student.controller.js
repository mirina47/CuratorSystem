var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var uuid = require('uuid');
var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var Student = db.student;
var Group = db.group;
var StudentGroup = db.student_group;
var Place = db.place;
var StudentHobby = db.student_hobby;
var Hobby = db.hobby;
var Achievement = db.achievement;
var Category = db.category;

// Получение всех студентов
exports.findAll = (req, res) => {
    Student.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление студента
exports.create = (req, res) => {
    Student.create({ 																
        place_id: req.body.place_id,
        birthday: req.body.birthday,
        telephone: req.body.telephone,
        email: req.body.email, 	
        birthplace: req.body.birthplace, 	
        school: req.body.school, 	
        school_year: req.body.school_year, 		
        uid_json: req.body.uid_json, 	
        work: req.body.work, 	
        comment: req.body.comment,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        address: req.body.address,
        code: req.body.code
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных студента по id
exports.update = (req, res) => {
    Student.update({
            place_id: req.body.place_id,
            birthday: req.body.birthday,
            telephone: req.body.telephone,
            email: req.body.email, 	
            birthplace: req.body.birthplace, 	
            school: req.body.school, 	
            school_year: req.body.school_year, 	
            uid_json: req.body.uid_json, 	
            work: req.body.work, 		
            comment: req.body.comment,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            address: req.body.address,
            code: req.body.code
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

// Удаление студента по id
exports.delete = (req, res) => {
    Student.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение данных студента по id
exports.findById = (req, res) => {
    Student.findByPk(req.params.id, {
        include: [
            {model: Place}
        ]
    })
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение списка студентов по id места жительства
exports.findByPlaceId = (req, res) => {
    Student.findAll({
        where: {
            place_id: req.params.place_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Удаление кода студента по id
exports.deleteStudentCode = (req, res) => {
    Student.update({
            code: null
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

// Обновление кода студента по id
exports.updateStudentCode = (req, res) => {
    Student.update({
            code: uuid.v4() // вызываем функцию v4() для того, чтобы уникальный code был сгенерирован случайным образом
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

// Обновление кода студентов
exports.updateStudentsCode = async (req, res) => {
    const studentIds = req.body.studentIds;
    const promises = [];
  
    // Генерируем уникальные коды для каждого студента
    for (let i = 0; i < studentIds.length; i++) {
        let newCode = uuid.v4() // вызываем функцию v4() для того, чтобы уникальный code был сгенерирован случайным образом
        let isUnique = false;
  
        // Проверяем, что код уникален
        while (!isUnique) {
            const existingStudent = await Student.findOne({ where: { code: newCode } });
            if (!existingStudent) {
                isUnique = true;
            } else {
                newCode = uuid.v4() // вызываем функцию v4() для того, чтобы уникальный code был сгенерирован случайным образом
            }
        }
    
        // Обновляем код студента в базе данных
        const promise = Student.update(
            { code: newCode },
            { where: { id: studentIds[i] } }
        );
        promises.push(promise);
    }
  
    // Дожидаемся завершения всех асинхронных операций
    Promise.all(promises)
        .then(() => {
            globalFunctions.sendResult(res, {});
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

// Получение данных студента по code
exports.findByCode = (req, res) => {
    Student.findOne({
        where: {
            code: req.params.code
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Загрузка студентов из файла
exports.downloadStudents = async (req, res) => {
    try {
        // создаём объект для чтения данных, переданных со стороны клиента (передавали объект FormData)
        var form = new multiparty.Form();

        // читаем данные
        await form.parse(req, async (err, fields, files) => {
            const file = files.file[0];
            const data = JSON.parse(fs.readFileSync(file.path, 'utf-8'));

            // находим группу, в которой состоят студенты из файла
            const groupUidJson = data.hs_json.Input.student_group;
            const [group] = await Group.findOrCreate({
                where: { uid_json: groupUidJson }
            });

            const groupName = group.name;
            const year_begin = new Date().getFullYear() - parseInt(groupName.substring(2, 3));
            const beginDate = new Date(year_begin, 8, 1); // 1 сентября
            /*var year_end = null;
            if (groupName.endsWith('ДМ')) {
                year_end = year_begin + 2;
            }
            if (groupName.endsWith('ДБ')) {
                year_end = year_begin + 4;
            }
            const endDate = new Date(year_end, 7, 31); // 31 августа*/
            const endDate = null;

            // заполняем таблицу Student
            for (const item of data.hs_json.Output.Data) {
                const [lastname, firstname, middlename] = item.Ссылка.name.split(' ');
                const uid_json = item.Ссылка.uid;
        
                const [student] = await Student.findOrCreate({
                    where: { uid_json: uid_json },
                    defaults: {
                        uid_json: uid_json, 	
                        lastname: lastname,
                        firstname: firstname,
                        middlename: middlename
                    }
                });

                // заполняем таблицу student_group (связь между студентами из файла и их группой)
                await StudentGroup.findOrCreate({
                    where: { 
                        student_id: student.id,
                        group_id: group.id,
                        begin_date: beginDate,
                        end_date: endDate
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

// Получение списка студентов по id категории хобби и достижений
exports.findByCategoryId = async (req, res) => {
    const categoryId = req.params.category_id;
    // Получаем массив achievementStudentIds из таблицы achievement
    const achievements = await Achievement.findAll({
        where: { category_id: categoryId },
        attributes: ['student_id']
    });
  
    const achievementStudentIds = achievements.map(obj => obj.student_id);
    
    // Получаем массив hobbyIds из таблицы hobby
    const hobbies = await Hobby.findAll({
        where: { category_id: categoryId },
        attributes: ['id']
    });
    
    const hobbyIds = hobbies.map(obj => obj.id);
    
    // Получаем массив hobbyStudentIds из таблицы student_hobby
    const studentHobbies = await StudentHobby.findAll({
        where: { hobby_id: hobbyIds },
        attributes: ['student_id']
    });
    
    const hobbyStudentIds = studentHobbies.map(obj => obj.student_id);
    
    // Объединяем массивы achievementStudentIds и hobbyStudentIds в массив studentIds
    const studentIds = [...new Set([...achievementStudentIds, ...hobbyStudentIds])];
    
    // Получаем массив students из таблицы student
    Student.findAll({
        where: { id: studentIds },
        attributes: ['id', 'lastname', 'firstname', 'middlename']
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение списка студентов по id хобби
exports.findByHobbyId = async (req, res) => {
    const hobbyId = req.params.hobby_id;
    
    // Получаем массив hobbyStudentIds из таблицы student_hobby
    const studentHobbies = await StudentHobby.findAll({
        where: { hobby_id: hobbyId },
        attributes: ['student_id']
    });
    
    const studentIds = studentHobbies.map(obj => obj.student_id);
    
    // Получаем массив students из таблицы student
    Student.findAll({
        where: { id: studentIds },
        attributes: ['id', 'lastname', 'firstname', 'middlename']
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Обновление комментария студента по id
exports.updateStudentComment = (req, res) => {
    Student.update({
        comment: req.body.comment
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