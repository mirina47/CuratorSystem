module.exports = (app) => {

    const user = require('../controller/user.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех пользователей
    app.get('/api/users', [authJwt.verifyToken, authJwt.isAdmin], user.findAll);

    // Добавление пользователя
    app.post('/api/addUser', [authJwt.verifyToken, authJwt.isAdmin], user.create);

    // Обновление пользователя по id
    app.post('/api/updateUser/:id', [authJwt.verifyToken, authJwt.isAdmin], user.update);

    // Удаление пользователя по id
    app.post('/api/deleteUser/:id', [authJwt.verifyToken, authJwt.isAdmin], user.delete);

    // Получение пользователя по id
    app.get('/api/user/:id', [authJwt.verifyToken, authJwt.isAdmin], user.findById);

    // Получение пользователя по login
    app.get('/api/user/login/:login', [authJwt.verifyToken, authJwt.isAdmin], user.findByLogin);

    // Получение списка пользователей по role
    app.get('/api/listUsers/role=:role', [authJwt.verifyToken, authJwt.isAdmin], user.findByRole);

    // Получение списка пользователей по name
    app.get('/api/listUsers/name=:name', [authJwt.verifyToken, authJwt.isAdmin], user.findByName);
};
