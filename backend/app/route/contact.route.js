module.exports = (app) => {

    const contact = require('../controller/contact.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех контактов
    app.get('/api/contacts', [authJwt.verifyToken, authJwt.isAdmin], contact.findAll);

    // Добавление контакта
    app.post('/api/addContact', contact.create);

    // Обновление контакта по id
    app.post('/api/updateContact/:id', [authJwt.verifyToken, authJwt.isAdmin], contact.update);

    // Удаление контакта по id
    app.post('/api/deleteContact/:id', [authJwt.verifyToken, authJwt.isAdmin], contact.delete);

    // Получение контакта по id
    app.get('/api/contact/:id', [authJwt.verifyToken, authJwt.isAdmin], contact.findById);

    // Получение контакта по student_id
    app.get('/api/contact/student_id/:student_id', [authJwt.verifyToken], contact.findByStudentId);
};
