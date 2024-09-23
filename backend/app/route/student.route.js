module.exports = (app) => {

    const student = require('../controller/student.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех студентов
    app.get('/api/students', [authJwt.verifyToken, authJwt.isAdmin], student.findAll);

    // Добавление студента
    app.post('/api/addStudent', [authJwt.verifyToken, authJwt.isAdmin], student.create);

    // Обновление студента по id
    app.post('/api/updateStudent/:id',  student.update);

    // Удаление студента по id
    app.post('/api/deleteStudent/:id', [authJwt.verifyToken, authJwt.isAdmin], student.delete);

    // Получение студента по id
    app.get('/api/student/:id', [authJwt.verifyToken], student.findById);

    // Получение списка студентов по id места жительства
    app.get('/api/listStudents/place_id/:place_id', [authJwt.verifyToken], student.findByPlaceId);

    // Удаление кода студента по id
    app.post('/api/deleteStudentCode/:id', [authJwt.verifyToken], student.deleteStudentCode);
    
    // Обновление кода студента по id
    app.post('/api/updateStudentCode/:id', [authJwt.verifyToken], student.updateStudentCode);

    // Обновление кода студентов
    app.post('/api/updateStudentsCode', [authJwt.verifyToken], student.updateStudentsCode);

    // Получение студента по code
    app.get('/api/student/code/:code', student.findByCode);

    // Загрузка студентов из файла
    app.post('/api/downloadStudents', [authJwt.verifyToken, authJwt.isAdmin], student.downloadStudents);

    // Получение списка студентов по id категории хобби и достижений
    app.get('/api/listStudents/category_id/:category_id', [authJwt.verifyToken], student.findByCategoryId);

    // Получение списка студентов по id хобби
    app.get('/api/listStudents/hobby_id/:hobby_id', [authJwt.verifyToken], student.findByHobbyId);

    // Обновление комментария студента по id
    app.post('/api/updateStudentComment/:id', [authJwt.verifyToken], student.updateStudentComment);
};
