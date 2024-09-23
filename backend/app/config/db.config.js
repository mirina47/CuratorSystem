var dbProperties = {
    database: 'curator_system', // название базы данных
    login: 'root', // имя пользователя, для которого настроены права к базе данных, 'root' задаётся по умолчанию
    password: '', // пароль пользователя, по умолчанию пароль пустой
    host: 'localhost', // имя сервера, на котором расположена база данных
    dialect: 'mysql', // используемая СУБД
    pool: { // параметры соединения
        max: 5, // максимальное количество одновременно открытых соединений
        min: 0, // минимальное количество соединений
        acquire: 30000, // максимальное время в миллисекундах, в течение которого пул (набор соединений к БД) будет пытаться установить соединение, прежде чем выдаст ошибку
        idle: 10000 // время в миллисекундах, в течение которого соединение может простаивать, прежде чем оно будет удалено
    }
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    dbProperties.database, dbProperties.login, dbProperties.password,
    {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        define: {
            // имена таблиц не будут создаваться автоматически во множественном числе
            freezeTableName: true,

            // запрет на автоматическое создание полей createdAt и updatedAt (эти поля по умолчанию создаются ORM Sequalize во всех таблицах, при желании можете включить эту настройку)
            timestamps: false
        }
    }
);

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Подключение моделей
//db.achievement = require('../model/achievement.model.js')(sequelize, Sequelize);
db.category = require('../model/category.model.js')(sequelize, Sequelize);
db.contact = require('../model/contact.model.js')(sequelize, Sequelize);
db.educationalProgram = require('../model/educationalProgram.model.js')(sequelize, Sequelize);
db.event_hobby = require('../model/event_hobby.model.js')(sequelize, Sequelize);
db.event = require('../model/event.model.js')(sequelize, Sequelize);
db.group = require('../model/group.model.js')(sequelize, Sequelize);
db.hobby = require('../model/hobby.model.js')(sequelize, Sequelize);
db.place = require('../model/place.model.js')(sequelize, Sequelize);
db.student_event = require('../model/student_event.model.js')(sequelize, Sequelize);
db.student_group = require('../model/student_group.model.js')(sequelize, Sequelize);
db.student_hobby = require('../model/student_hobby.model.js')(sequelize, Sequelize);
db.student_rating = require('../model/student_rating.model.js')(sequelize, Sequelize);
db.student = require('../model/student.model.js')(sequelize, Sequelize);
db.teacher_group = require('../model/teacher_group.model.js')(sequelize, Sequelize);
db.user = require('../model/user.model.js')(sequelize, Sequelize);

// Связывание моделей без импорта файлов (то есть, чтобы в файле описания любой модели можно было
// обращаться к другим моделям по имени без необходимости импорта в виде require(...))
Object.keys(db).forEach(key => {
    if (db[key] && db[key].associate) {
        db[key].associate(db);
    }
});

module.exports = db;