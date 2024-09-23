module.exports = (app) => {

    const educationalProgram = require('../controller/educationalProgram.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех направлений
    app.get('/api/educationalPrograms', [authJwt.verifyToken], educationalProgram.findAll);

    // Добавление направления
    app.post('/api/addEducationalProgram', [authJwt.verifyToken, authJwt.isAdmin], educationalProgram.create);

    // Обновление направления по id
    app.post('/api/updateEducationalProgram/:id', [authJwt.verifyToken, authJwt.isAdmin], educationalProgram.update);

    // Удаление направления по id
    app.post('/api/deleteEducationalProgram/:id', [authJwt.verifyToken, authJwt.isAdmin], educationalProgram.delete);

    // Получение направления по id
    app.get('/api/educationalProgram/:id', [authJwt.verifyToken, authJwt.isAdmin], educationalProgram.findById);

};