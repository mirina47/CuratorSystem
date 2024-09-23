module.exports = (app) => {

    const student_event = require('../controller/student_event.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех мероприятий студента
    app.get('/api/student_events', [authJwt.verifyToken, authJwt.isAdmin], student_event.findAll);

    // Добавление мероприятия студента
    app.post('/api/addStudentEvent', [authJwt.verifyToken, authJwt.isAdmin], student_event.create);

    // Обновление мероприятия студента по id
    app.post('/api/updateStudentEvent/:id', [authJwt.verifyToken, authJwt.isAdmin], student_event.update);

    // Удаление мероприятия студента по id
    app.post('/api/deleteStudentEvent/:id', [authJwt.verifyToken, authJwt.isAdmin], student_event.delete);

    // Получение мероприятия студента по id
    app.get('/api/studentEvent/:id', [authJwt.verifyToken, authJwt.isAdmin], student_event.findById);

};
