module.exports = (sequelize, Sequelize) => {
    var Place = sequelize.define(
        'place', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        });

    // Определяем связи таблицы place с другими таблицами
    Place.associate = (models) => {
        // Определение связи один-ко-многим с таблицей student. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student): в файле student.model.js
        Place.hasMany(models.student, {
            foreignKey: 'place_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Place;
};