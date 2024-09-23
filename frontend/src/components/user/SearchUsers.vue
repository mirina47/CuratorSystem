<template>
    <div>
        <h4>Поиск пользователей по имени</h4>
        <form @submit="searchUsersByName" class="row g-2">
            <input type="text" class="form-control" name="name" id="name" placeholder="ФИО" required v-model="name">
            <input type="submit" class="btn btn-primary" value="Поиск">
        </form>

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
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "SearchUsers.vue",
        data() {
            return {
                name: "",
                users: []
            };
        },
        methods: {
            searchUsersByName(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                http
                    .get("/listUsers/name=" + this.name)
                    .then(response => {
                        this.users = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    };
</script>