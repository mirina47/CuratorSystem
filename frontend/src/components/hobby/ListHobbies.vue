<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Хобби</h4> 
        <h5 class="title mt-3 d-md-flex">Выберите категорию:</h5>
        <div class="form-group mb-3 mt-3 d-md-flex"> 
            <select class="form-control" placeholder="Категория" required v-model="category_id">
                <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                    {{category.name}}
                </option>
            </select>
        </div>
        <ul class="list-group mt-3 d-md-flex">
            <li v-for="(hobby, index) in hobbies" :key="index" class="list-group-item">
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'hobby-details',
                        params: { id: hobby.id }
                    }">
                    {{hobby.name}}
                </router-link>   
            </li>
        </ul>
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex"> 
            <router-link class="btn btn-outline-primary" to="/addHobby"> Добавить хобби </router-link> 
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "ListHobbies",
        data() {
            return {
                categories: [],
                category_id: null,
                hobbies: []
            };
        },
        watch: {
            category_id(){
                this.getHobbies();
            }
        },

        methods: {
            getCategories() {
                http
                    .get("/categories") // обращаемся к серверу для получения списка категорий
                    .then(response => { // запрос выполнен успешно
                        this.categories = response.data.sort((a, b) => {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getHobbies() {
                http
                    .get("/listHobbies/category_id=" + this.category_id) // обращаемся к серверу для получения списка хобби
                    .then(response => { // запрос выполнен успешно
                        this.hobbies = response.data.sort((a, b) => {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getCategories();        
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>