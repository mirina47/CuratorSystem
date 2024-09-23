module.exports = (sequelize, Sequelize) => {
    var StudentRating = sequelize.define(
        'student_rating', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            student_hobby_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            event_id: {
                type: Sequelize.INTEGER(10),
                allowNull: true
            },
            datetime: {
                type: Sequelize.DATE,
                allowNull: true
            },
            type_score: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            score: {
                type: Sequelize.INTEGER(10),
                allowNull: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: true
            }
        });

    // Определяем связи таблицы student_rating с другими таблицами
    StudentRating.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей event. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы event): в файле event.model.js
        StudentRating.belongsTo(models.event, {
            foreignKey: 'event_id'
        });

        // Определение связи один-ко-многим с таблицей student_hobby. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_hobby): в файле student_hobby.model.js
        StudentRating.belongsTo(models.student_hobby, {
            foreignKey: 'student_hobby_id'
        });
    };
    return StudentRating;
};