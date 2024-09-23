module.exports = (app) => {

    const student_rating = require('../controller/student_rating.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех студенческих рейтинга
    app.get('/api/student_rating', [authJwt.verifyToken, authJwt.isAdmin], student_rating.findAll);

    // Добавление студенческого рейтинга
    app.post('/api/addStudentRating', [authJwt.verifyToken, authJwt.isAdmin], student_rating.create);

    // Обновление студенческого рейтинга по id
    app.post('/api/updateStudentRating/:id', [authJwt.verifyToken, authJwt.isAdmin], student_rating.update);

    // Удаление студенческого рейтинга по id
    app.post('/api/deleteStudentRating/:id', [authJwt.verifyToken, authJwt.isAdmin], student_rating.delete);

    // Получение студенческого рейтинга по id
    app.get('/api/studentRating/:id', [authJwt.verifyToken, authJwt.isAdmin], student_rating.findById);

    // Обновление студенческого рейтинга по id
    app.post('/api/updateRatingForStudent/:student_id', authJwt.verifyToken, student_rating.updateRatingForStudent);
};
