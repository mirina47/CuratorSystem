module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define(
        'user', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            login: {
                type: Sequelize.STRING(50),  // тип данных STRING (в MySQL — VARCHAR)
                unique: true, // каждое значение в этом столбце должно быть уникальным
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            lastname: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            firstname: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            middlename: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            role: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        });

    // Определяем связи таблицы user с другими таблицами
    User.associate = (models) => {
        // Определение связи один-ко-многим с таблицей teacher_group. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы teacher_group): в файле teacher_group.model.js
        User.hasMany(models.teacher_group, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return User;
};