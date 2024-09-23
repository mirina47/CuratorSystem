module.exports = (app) => {

    const teacher_group = require('../controller/teacher_group.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех кураторских групп
    app.get('/api/teacher_groups', [authJwt.verifyToken, authJwt.isAdmin], teacher_group.findAll);

    // Добавление кураторской группы
    app.post('/api/addTeacherGroup', [authJwt.verifyToken, authJwt.isAdmin], teacher_group.create);

    // Обновление кураторской группы по id
    app.post('/api/updateTeacherGroup/:id', [authJwt.verifyToken, authJwt.isAdmin], teacher_group.update);

    // Удаление кураторской группы по id
    app.post('/api/deleteTeacherGroup/:id', [authJwt.verifyToken, authJwt.isAdmin], teacher_group.delete);

    // Получение кураторской группы по id
    app.get('/api/teacherGroup/:id', [authJwt.verifyToken, authJwt.isAdmin], teacher_group.findById);

    // Получение групп пользователя (куратора)
    app.get('/api/groupsForUser/userId=:user_id', [authJwt.verifyToken], teacher_group.findGroupsForUser);

    // Получение групп, у которых пользователь не является куратором
    app.get('/api/groupsNotUser/userId=:user_id', [authJwt.verifyToken, authJwt.isAdmin], teacher_group.findGroupsNotUser);

    // Добавление массива групп
    app.post('/api/addGroups', [authJwt.verifyToken, authJwt.isAdmin], teacher_group.createGroups);

    // Удаление группы пользователя (куратора)
    app.post('/api/deleteGroupForUser/userGroupId=:user_group_id', [authJwt.verifyToken, authJwt.isAdmin], teacher_group.deleteGroupForUser);
};
