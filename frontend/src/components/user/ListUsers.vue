<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Список пользователей</h4>
        <h5 class="title mt-3 d-md-flex">Выберите роль:</h5>
        <div class="form-group mb-3 mt-3 d-md-flex"> 
            <select class="form-control" placeholder="Роль" required v-model="role_value">
                <option v-for="role in roles" v-bind:key="role.value" v-bind:value="role.value">
                    {{role.label}}
                </option>
            </select>
        </div>
        <ul class="list-group mt-3 d-md-flex">
            <li v-for="(user, index) in users" :key="index" class="list-group-item">
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'user-details',
                        params: { id: user.id }
                    }">
                    {{user.lastname}} {{user.firstname}} {{user.middlename}} ({{user.role}})
                </router-link>   
            </li>
        </ul>
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex"> 
            <router-link class="btn btn-outline-primary" to="/addUser"> Добавить пользователя </router-link> 
            <router-link class="btn btn-outline-primary" to="/searchUsers"> Поиск пользователей </router-link> 
        </div>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    import UserService from '../../services/user.service';

    export default {
        name: "ListUsers", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                users: [],
                roles: [
                    { value: 'admin', label: 'Администратор' },
                    { value: 'curator', label: 'Куратор' }
                ],
                role_value: null
            };
        },
        watch: {
            role_value(){
                this.getUsers();
            }
        },
        methods: { // методы компонента
            getUsers() {
                http
                    .get("/listUsers/role=" + this.role_value) // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.users = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            UserService.getUserBoard()
                .then(() => {
                    this.displayContent = true;
                })
                .catch(e => {
                        this.content =
                            (e.response && e.response.data) ||
                            e.message ||
                            e.toString();
                    }
                );
            
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>