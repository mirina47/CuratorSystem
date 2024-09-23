module.exports = (sequelize, Sequelize) => {
    var EducationalProgram = sequelize.define(
        'educationalProgram', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(150),
                allowNull: false
            }
        });

    // Определяем связи таблицы educationalProgram с другими таблицами
    EducationalProgram.associate = (models) => {
        // Определение связи один-ко-многим с таблицей group. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы group): в файле group.model.js
        EducationalProgram.hasMany(models.group, {
            foreignKey: 'educationalProgram_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return EducationalProgram;
};