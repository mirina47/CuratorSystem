<template>
    <div class="container">
        <div class="col-md-5">
            <h4 class="mx-auto mt-4">Вход в систему</h4>
            <form name="form" @submit="handleLogin">
                <div class="form-group mb-3">
                    <input type="text" class="form-control" name="login" placeholder="Логин" v-model="user.login" required/>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required/>
                </div>
                <div class="form-group gap-3 d-md-flex">
                    <button class="btn btn-primary mt-4" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>Войти</span>
                    </button>
                    <router-link to="/register" class="btn btn-outline-primary mt-4">
                        Зарегистрироваться
                    </router-link>
                </div>
                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LoginUser',
        data() {
            return {
                user: {
                    login: "",
                    password: ""
                },
                loading: false,
                message: ''
            };
        },
        computed: { // вычисляемые свойства
            loggedIn() {
                return this.$store.state.auth.status.loggedIn; // $store - локальное хранилище
            }
        },
        created() {
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                window.location.href = '/';
            }
        },
        methods: {
            handleLogin(e) {
                e.preventDefault();
                this.loading = true;
                this.$store.dispatch("auth/login", this.user) // обращаемся к методу login, который определён в auth.service.js
                    .then(() => {
                        window.location.href = '/'; // авторизация прошла успешно, переходим к главной странице. Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                    })
                    .catch(e => {
                            this.loading = false;
                            this.message = e.response.data.message;
                        }
                    );
            }
        }
    };
</script>

