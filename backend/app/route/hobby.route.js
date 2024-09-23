module.exports = (app) => {

    const hobby = require('../controller/hobby.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех хобби
    app.get('/api/hobbies', hobby.findAll);

    // Добавление хобби
    app.post('/api/addHobby', hobby.create);

    // Обновление хобби по id
    app.post('/api/updateHobby/:id', [authJwt.verifyToken, authJwt.isAdmin], hobby.update);

    // Удаление хобби по id
    app.post('/api/deleteHobby/:id', [authJwt.verifyToken, authJwt.isAdmin], hobby.delete);

    // Получение хобби по id
    app.get('/api/hobby/:id', [authJwt.verifyToken, authJwt.isAdmin], hobby.findById);

    // Получение списка хобби по id категории
    app.get('/api/listHobbies/category_id=:category_id', hobby.findByCategoryId);
};
