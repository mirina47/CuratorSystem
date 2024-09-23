module.exports = (sequelize, Sequelize) => {
    var StudentHobby = sequelize.define(
        'student_hobby', // определяем имя таблицы
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
            hobby_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            rating: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    // Определяем связи таблицы student_hobby с другими таблицами
    StudentHobby.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей student_rating. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_rating): в файле student_rating.model.js
        StudentHobby.hasMany(models.student_rating, {
            foreignKey: 'student_hobby_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });



        // Определение связи один-ко-многим с таблицей hobby. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы hobby): в файле hobby.model.js
        StudentHobby.belongsTo(models.hobby, {
            foreignKey: 'hobby_id'
        });

        // Определение связи один-ко-многим с таблицей student. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student): в файле student.model.js
        StudentHobby.belongsTo(models.student, {
            foreignKey: 'student_id'
        });
    };
    return StudentHobby;
};