var jwt = require("jsonwebtoken");
var config = require("../config/auth.config.js");

exports.verifyToken = (req, res, next) => {
    // считываем токен из переданных заголовков со стороны клиентского приложения
    let token = req.headers["x-access-token"]; 
    if (!token) {
         res.status(403).send({
            message: "Токен не предоставлен"
        });
        return;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: "Неверно введенный логин и/или пароль"
            });
            return;
        }
        req.userId = decoded.id;
        req.currentUser = decoded;
        next();
    });
};

var db = require('../config/db.config.js');
var User = db.user;
exports.isAdmin = (req, res, next) => {
    if (req.currentUser && req.currentUser.id) {
      User.findByPk(req.currentUser.id)
        .then(user => {
            if (user.role === "admin") {
              next();
              return;
            }
            res.status(403).send({
                message: "Требуется роль администратора!"
            });
          return;
        });
    };
};