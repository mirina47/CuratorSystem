var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false});

var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200', // указываем, откуда будут приходить запросы
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));

app.listen(3000);

var auth = require('./app/route/auth.route.js');
auth(app);

var category = require('./app/route/category.route.js');
category(app);

var contact = require('./app/route/contact.route.js');
contact(app);

var educationalProgram = require('./app/route/educationalProgram.route.js');
educationalProgram(app);

var event_hobby = require('./app/route/event_hobby.route.js');
event_hobby(app);

var event = require('./app/route/event.route.js');
event(app);

var group = require('./app/route/group.route.js');
group(app);

var hobby = require('./app/route/hobby.route.js');
hobby(app);

var place = require('./app/route/place.route.js');
place(app);

var student_event = require('./app/route/student_event.route.js');
student_event(app);

var student_group = require('./app/route/student_group.route.js');
student_group(app);

var student_hobby = require('./app/route/student_hobby.route.js');
student_hobby(app);

var student_rating = require('./app/route/student_rating.route.js');
student_rating(app);

var student = require('./app/route/student.route.js');
student(app);

var teacher_group = require('./app/route/teacher_group.route.js');
teacher_group(app);

var user = require('./app/route/user.route.js');
user(app);