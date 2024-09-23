<template>
    <div class="col-md-5">
        <h4 class="mx-auto mt-4">Регистрация пользователя</h4>
        <form name="form" @submit="handleRegister">
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
</template>
<script>
    export default {
        name: 'RegisterUser',
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
                message: ''
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                window.location.href = '/';
            }
        },
        methods: {
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
    };
</script>