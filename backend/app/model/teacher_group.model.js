module.exports = (sequelize, Sequelize) => {
    var TeacherGroup = sequelize.define(
        'teacher_group', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            group_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            user_id: {
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

    // Определяем связи таблицы teacher_group с другими таблицами
    TeacherGroup.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        TeacherGroup.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

        // Определение связи один-ко-многим с таблицей group. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы group): в файле group.model.js
        TeacherGroup.belongsTo(models.group, {
            foreignKey: 'group_id'
        });
    };
    return TeacherGroup;
};