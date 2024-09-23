module.exports = (app) => {

    const student_group = require('../controller/student_group.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех студенческих групп
    app.get('/api/student_groups', [authJwt.verifyToken], student_group.findAll);

    // Добавление студенческой группы
    app.post('/api/addStudentGroup', [authJwt.verifyToken, authJwt.isAdmin], student_group.create);

    // Обновление студенческой группы по id
    app.post('/api/updateStudentGroup/:id', [authJwt.verifyToken, authJwt.isAdmin], student_group.update);

    // Удаление студенческой группы по id
    app.post('/api/deleteStudentGroup/:id', [authJwt.verifyToken, authJwt.isAdmin], student_group.delete);

    // Получение студенческой группы по id
    app.get('/api/StudentGroup/:id', [authJwt.verifyToken, authJwt.isAdmin], student_group.findById);

    // Получение студентов группы
    app.get('/api/studentsForGroup/groupId=:group_id', student_group.findStudentsForGroup);

    // Получение названия группы, в которой состоит студент на данный момент
    app.get('/api/findCurrentGroup/studentId=:student_id', student_group.findCurrentGroup);

    // Получение студентов группы, которые не прошли анкетирование
    app.get('/api/studentsWithoutFormForGroup/groupId=:group_id', [authJwt.verifyToken], student_group.findStudentsWithoutFormForGroup);

    // Добавление студенческой группы
    app.post('/api/addNewStudentGroupAndUpdateOld', [authJwt.verifyToken, authJwt.isAdmin], student_group.createNewAndUpdateOld);

    
};
