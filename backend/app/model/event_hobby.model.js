module.exports = (sequelize, Sequelize) => {
    var EventHobby = sequelize.define(
        'event_hobby', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            event_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            hobby_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    // Определяем связи таблицы event_hobby с другими таблицами
    EventHobby.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей hobby. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы hobby): в файле hobby.model.js
        EventHobby.belongsTo(models.hobby, {
            foreignKey: 'hobby_id'
        });

        // Определение связи один-ко-многим с таблицей event. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы event): в файле event.model.js
        EventHobby.belongsTo(models.event, {
            foreignKey: 'event_id'
        });
    };
    return EventHobby;
};