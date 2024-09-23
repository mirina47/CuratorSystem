module.exports = (sequelize, Sequelize) => {
    var Category = sequelize.define(
        'category', // определяем имя таблицы
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

    // Определяем связи таблицы category с другими таблицами
    Category.associate = (models) => {
        // Определение связи один-ко-многим с таблицей hobby. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы hobby): в файле hobby.model.js
        Category.hasMany(models.hobby, {
            foreignKey: 'category_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        // Определение связи один-ко-многим с таблицей event. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы event): в файле event.model.js
        Category.hasMany(models.event, {
            foreignKey: 'category_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Category;
};