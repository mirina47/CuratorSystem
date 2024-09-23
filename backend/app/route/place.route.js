module.exports = (app) => {

    const place = require('../controller/place.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех мест жительств
    app.get('/api/places', place.findAll);

    // Добавление места жительства
    app.post('/api/addPlace', [authJwt.verifyToken, authJwt.isAdmin], place.create);

    // Обновление места жительства по id
    app.post('/api/updatePlace/:id', [authJwt.verifyToken, authJwt.isAdmin], place.update);

    // Удаление места жительства по id
    app.post('/api/deletePlace/:id', [authJwt.verifyToken, authJwt.isAdmin], place.delete);

    // Получение места жительства по id
    app.get('/api/place/:id', [authJwt.verifyToken, authJwt.isAdmin], place.findById);
};