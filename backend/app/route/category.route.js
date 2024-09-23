module.exports = (app) => {

    const category = require('../controller/category.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех категорий
    app.get('/api/categories', category.findAll);

    // Добавление категории
    app.post('/api/addCategory', [authJwt.verifyToken, authJwt.isAdmin], category.create);

    // Обновление категории по id
    app.post('/api/updateCategory/:id', [authJwt.verifyToken, authJwt.isAdmin], category.update);

    // Удаление категории по id
    app.post('/api/deleteCategory/:id', [authJwt.verifyToken, authJwt.isAdmin], category.delete);

    // Получение категории по id
    app.get('/api/category/:id', [authJwt.verifyToken, authJwt.isAdmin], category.findById);
};
