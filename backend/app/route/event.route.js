module.exports = (app) => {

    const event = require('../controller/event.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех мероприятий
    app.get('/api/events',  event.findAll);

    // Добавление мероприятия
    app.post('/api/addEvent', [authJwt.verifyToken, authJwt.isAdmin], event.create);

    // Обновление мероприятия по id
    app.post('/api/updateEvent/:id', [authJwt.verifyToken, authJwt.isAdmin], event.update);

    // Удаление мероприятия по id
    app.post('/api/deleteEvent/:id', [authJwt.verifyToken, authJwt.isAdmin], event.delete);

    // Получение мероприятия по id
    app.get('/api/event/:id', event.findById);

    // Получение списка мероприятий по id категории
    app.get('/api/listEvents/category_id=:category_id', event.findByCategoryId);

    // Распределение студентов на мероприятие по id группы
    //app.get('/api/distributeStudentsToEvents', event.distributeStudentsToEvents);
    app.post('/api/distributeStudentsToEvents', event.distributeStudentsToEvents);
    
    app.post('/api/confirmStudentsToEvents', event.confirmStudentsToEvents);

    app.get('/api/eventsForPeriod/beginDate=:begin_date/beginTime=:begin_time/endDate=:end_date/endTime=:end_time', event.eventsForPeriod);
    
};
