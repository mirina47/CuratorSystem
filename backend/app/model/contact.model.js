module.exports = (sequelize, Sequelize) => {
    var Contact = sequelize.define(
        'contact', // определяем имя таблицы
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
            relationship: {
                type: Sequelize.STRING(50),
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
            telephone: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            address: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        });

    // Определяем связи таблицы contact с другими таблицами
    Contact.associate = (models) => {
        // Определение связи один-ко-многим с таблицей student. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student): в файле student.model.js
        Contact.belongsTo(models.student, {
            foreignKey: 'student_id'
        });
    };
    return Contact;
};