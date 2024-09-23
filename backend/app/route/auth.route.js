module.exports = (app) => {
    var { authJwt, verifySignUp } = require("../middleware");
    var auth = require("../controller/auth.controller");

    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // регистрация пользователя с предварительной проверкой существования логина
    app.post("/api/register", [verifySignUp.checkDuplicateLogin], auth.register);

    // аутентификация пользователя
    app.post("/api/login", auth.login);

    // проверка, что пользователь авторизован
    app.get("/api/userBoard", [authJwt.verifyToken], auth.userBoard);

    // обновление токена jwt (когда срок действия текущего истекает)
    app.post("/api/refreshToken", auth.refreshToken);
};