module.exports = (sequelize, Sequelize) => {
    var StudentEvent = sequelize.define(
        'student_event', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            student_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            event_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            allocated: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            }
        });

    // Определяем связи таблицы student_event с другими таблицами
    StudentEvent.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей event. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы event): в файле event.model.js
        StudentEvent.belongsTo(models.event, {
            foreignKey: 'event_id'
        });

        // Определение связи один-ко-многим с таблицей student. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student): в файле student.model.js
        StudentEvent.belongsTo(models.student, {
            foreignKey: 'student_id'
        });
    };
    return StudentEvent;
};