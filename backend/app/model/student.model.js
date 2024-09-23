module.exports = (sequelize, Sequelize) => {
    var Student = sequelize.define(
        'student', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            lastname: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            firstname: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            middlename: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            birthday: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            birthplace: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            telephone: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            place_id: {
                type: Sequelize.INTEGER(10),
                allowNull: true
            },
            address: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            work: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            school: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            school_year: {
                type: Sequelize.INTEGER(4),
                allowNull: true
            },
            uid_json: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            code: {
                type: Sequelize.STRING(50),
                unique: { allowNull: true }, // столбец будет уникальным, если значение не null, и не будет уникальным, если значение null
                allowNull: true
            },
            comment: {
                type: Sequelize.STRING(150),
                allowNull: true
            }
        });

    // Определяем связи таблицы student с другими таблицами
    Student.associate = (models) => {
        // Определение связи один-ко-многим с таблицей student_group. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_group): в файле student_group.model.js
        Student.hasMany(models.student_group, {
            foreignKey: 'student_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        // Определение связи один-ко-многим с таблицей contact. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы contact): в файле contact.model.js
        Student.hasMany(models.contact, {
            foreignKey: 'student_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        // Определение связи один-ко-многим с таблицей student_hobby. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_hobby): в файле student_hobby.model.js
        Student.hasMany(models.student_hobby, {
            foreignKey: 'student_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        // Определение связи один-ко-многим с таблицей student_event. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_event): в файле student_event.model.js
        Student.hasMany(models.student_event, {
            foreignKey: 'student_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        // Определение связи один-ко-многим с таблицей place. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы place): в файле place.model.js
        Student.belongsTo(models.place, {
            foreignKey: 'place_id'
        });
    };
    return Student;
};