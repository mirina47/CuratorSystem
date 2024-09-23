module.exports = (sequelize, Sequelize) => {
    var Event = sequelize.define(
        'event', // определяем имя таблицы
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
            },
            min_count: {
                type: Sequelize.INTEGER(10),
                allowNull: true
            },
            max_count: {
                type: Sequelize.INTEGER(10),
                allowNull: true
            },
            begin_datetime: {
                type: Sequelize.DATE,
                allowNull: false
            },
            end_datetime: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });

    // Определяем связи таблицы event с другими таблицами
    Event.associate = (models) => {
        // Определение связи один-ко-многим с таблицей event_hobby. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы event_hobby): в файле event_hobby.model.js
        Event.hasMany(models.event_hobby, {
            foreignKey: 'event_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        // Определение связи один-ко-многим с таблицей student_event. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_event): в файле student_event.model.js
        Event.hasMany(models.student_event, {
            foreignKey: 'event_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });



        // Определение связи один-ко-многим с таблицей category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы category): в файле category.model.js
        Event.belongsTo(models.category, {
            foreignKey: 'category_id'
        });
    };
    return Event;
};