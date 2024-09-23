<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление пользователя</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addUser определён в script-->
                <form @submit="handleRegister" class="row g-2">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <div v-if="!successful">
                        <div class="form-group mb-3">
                            <div class="form-group mb-3">
                                <input type="text" class="form-control" name="login" placeholder="Логин" v-model="user.login" required/>
                            </div>

                            <div class="form-group mb-3">
                                <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required/>
                            </div>
                            <div class="form-group mb-3">
                                <input type="text" class="form-control" name="lastname" placeholder="Фамилия" v-model="user.lastname" required/>
                            </div>
                            <div class="form-group mb-3">
                                <input type="text" class="form-control" name="firstname" placeholder="Имя" v-model="user.firstname" required/>
                            </div>
                            <div class="form-group mb-3">
                                <input type="text" class="form-control" name="middlename" placeholder="Отчество" v-model="user.middlename" required/>
                            </div>
                        </div>
                        <h5 class="title">Выберите роль:</h5>
                        <div class="form-group mb-3"> 
                            <select class="form-control" placeholder="Роль" required v-model="user.role">
                                <option value="admin">Администратор</option>
                                <option value="curator">Куратор</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary">Зарегистрировать</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
                    </div>
                </form>
            </div>
            <div v-else>
                <div class="container">
                    <div class="row row-cols-lg-1 g-4">
                        <h4>Вы успешно добавили запись</h4>
                        <div class="input-group mt-3 gap-3 d-md-flex">
                            <div>
                                <button v-on:click="newUser" class="btn btn-outline-primary">Добавить новую группу</button>
                            </div>
                            <div>
                                <router-link class="btn btn-outline-primary" to="/listUsers">Вернуться к списку групп</router-link>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
        import http from "../../http-common";
        export default {
            name: "RegisterUser",
            data() {
                return {
                    user: {
                        login: "",
                        password: "",
                        lastname: "",
                        firstname: "",
                        middlename: "",
                        role: ""
                    },
                    successful: false,
                    message: '',
                    submitted: false
                };
            },
            methods: {
                addUser(e) {
                    e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                    var data = {
                        login: this.user.login,
                        password: this.user.password,
                        lastname: this.user.lastname,
                        firstname: this.user.firstname,
                        middlename: this.user.middlename,
                        role: this.user.role
                    };
                    http
                        .post("/addUser", data)
                        .then(() => { // запрос выполнился успешно
                            //this.$router.push('/listUsers'); // переходим к списку студенческих групп
                        })
                        .catch(e => { // при выполнении запроса возникли ошибки
                            console.log(e);
                        });
                    this.submitted = true;
                },
                newUser() {
                    this.submitted = false;
                    this.user = {
                        login: "",
                        password: "",
                        lastname: "",
                        firstname: "",
                        middlename: "",
                        role: ""
                    };
                },
                handleRegister(e) {
                e.preventDefault();
                this.message = '';

                this.$store.dispatch("auth/register", this.user) // обращаемся к методу register, который определён в auth.service.js
                    .then( data => {
                        this.message = data.message;
                        this.successful = true;
                    })
                    .catch(e => {
                            this.message = e.response.data.message;
                        }
                    );

            }
            }
        }
    </script>