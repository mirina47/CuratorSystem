module.exports = (app) => {

    const student_hobby = require('../controller/student_hobby.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех студенческих хобби
    app.get('/api/student_hobbies', [authJwt.verifyToken, authJwt.isAdmin], student_hobby.findAll);

    // Добавление студенческого хобби
    app.post('/api/addStudentHobby', [authJwt.verifyToken, authJwt.isAdmin], student_hobby.create);

    // Обновление студенческого хобби по id
    app.post('/api/updateStudentHobby/:id', [authJwt.verifyToken, authJwt.isAdmin], student_hobby.update);

    // Удаление студенческого хобби по id
    app.post('/api/deleteStudentHobby/:id', [authJwt.verifyToken, authJwt.isAdmin], student_hobby.delete);

    // Получение студенческого хобби по id
    app.get('/api/studentHobby/:id', [authJwt.verifyToken, authJwt.isAdmin], student_hobby.findById);

    // Добавление нескольких студенческих хобби
    app.post('/api/addStudentHobbies', student_hobby.createMultiple);

    // Добавление студентом нового хобби
    app.post('/api/addNewHobbyAndCategory', student_hobby.addNewHobbyAndCategory);

    // Получение хобби студента
    app.get('/api/hobbiesForStudent/studentId=:student_id', [authJwt.verifyToken], student_hobby.findHobbiesForStudent);
};
