module.exports = (app) => {

    const event_hobby = require('../controller/event_hobby.controller');
    var { authJwt } = require("../middleware");
    
    // Получение всех хобби для мероприятия
    app.get('/api/event_hobbies', [authJwt.verifyToken, authJwt.isAdmin], event_hobby.findAll);

    // Добавление хобби для мероприятия
    app.post('/api/addEventHobby', [authJwt.verifyToken, authJwt.isAdmin], event_hobby.create);

    // Обновление хобби для мероприятия по id
    app.post('/api/updateEventHobby/:id', [authJwt.verifyToken, authJwt.isAdmin], event_hobby.update);

    // Удаление хобби для мероприятия по id
    app.post('/api/deleteEventHobby/:id', [authJwt.verifyToken, authJwt.isAdmin], event_hobby.delete);

    // Получение хобби для мероприятия по id
    app.get('/api/eventHobby/:id', [authJwt.verifyToken, authJwt.isAdmin], event_hobby.findById);

    // Добавление нескольких хобби для мероприятия
    app.post('/api/addEventHobbies', event_hobby.createMultiple);

    // Получение хобби мероприятия
    app.get('/api/hobbiesForEvent/eventId=:event_id', event_hobby.findHobbiesForEvent);

};
