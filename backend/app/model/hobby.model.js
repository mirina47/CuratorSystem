module.exports = (sequelize, Sequelize) => {
    var Hobby = sequelize.define(
        'hobby', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            category_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        });

    // Определяем связи таблицы hobby с другими таблицами
    Hobby.associate = (models) => {
        // Определение связи один-ко-многим с таблицей event_hobby. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы event_hobby): в файле event_hobby.model.js
        Hobby.hasMany(models.event_hobby, {
            foreignKey: 'hobby_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        // Определение связи один-ко-многим с таблицей student_hobby. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_hobby): в файле student_hobby.model.js
        Hobby.hasMany(models.student_hobby, {
            foreignKey: 'hobby_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        

        // Определение связи один-ко-многим с таблицей hobby. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы hobby): в файле hobby.model.js
        Hobby.belongsTo(models.category, {
            foreignKey: 'category_id'
        });
    };
    return Hobby;
};