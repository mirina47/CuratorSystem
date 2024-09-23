module.exports = (sequelize, Sequelize) => {
    var Group = sequelize.define(
        'group', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            educationalProgram_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            uid_json: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            begin_date: {
                type: Sequelize.DATEONLY,
                allowNull: true
            }
        });

    // Определяем связи таблицы group с другими таблицами
    Group.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей teacher_group. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы teacher_group): в файле teacher_group.model.js
        Group.hasMany(models.teacher_group, {
            foreignKey: 'group_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        // Определение связи один-ко-многим с таблицей student_group. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_group): в файле student_group.model.js
        Group.hasMany(models.student_group, {
            foreignKey: 'group_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        // Определение связи один-ко-многим с таблицей educationalProgram. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы educationalProgram): в файле educationalProgram.model.js
        Group.belongsTo(models.educationalProgram, {
            foreignKey: 'educationalProgram_id'
        });
    };
    return Group;
};