module.exports = (app) => {

    const group = require('../controller/group.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех направлений
    app.get('/api/groups', [authJwt.verifyToken], group.findAll);

    // Добавление группы
    app.post('/api/addGroup', [authJwt.verifyToken, authJwt.isAdmin], group.create);

    // Обновление группы по id
    app.post('/api/updateGroup/:id', [authJwt.verifyToken, authJwt.isAdmin], group.update);

    // Удаление группы по id
    app.post('/api/deleteGroup/:id', [authJwt.verifyToken, authJwt.isAdmin], group.delete);

    // Получение группы по id
    app.get('/api/group/:id', [authJwt.verifyToken], group.findById);

    // Получение списка групп по id направления
    app.get('/api/listGroups/educationalProgram_id=:educationalProgram_id', [authJwt.verifyToken], group.findByEducationalProgramId);

    // Загрузка групп из файла (и направлений)
    app.post('/api/downloadGroups', [authJwt.verifyToken, authJwt.isAdmin], group.downloadGroups);
};
