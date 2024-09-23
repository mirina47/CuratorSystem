module.exports = (sequelize, Sequelize) => {
    var StudentGroup = sequelize.define(
        'student_group', // определяем имя таблицы
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
            group_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            begin_date: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            end_date: {
                type: Sequelize.DATEONLY,
                allowNull: true
            }
        });

    // Определяем связи таблицы student_group с другими таблицами
    StudentGroup.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей group. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы group): в файле group.model.js
        StudentGroup.belongsTo(models.group, {
            foreignKey: 'group_id'
        });

        // Определение связи один-ко-многим с таблицей student. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student): в файле student.model.js
        StudentGroup.belongsTo(models.student, {
            foreignKey: 'student_id'
        });
    };
    return StudentGroup;
};