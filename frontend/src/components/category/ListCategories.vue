<template>
    <div class="container">
        <h4 class="mt-3">Список категорий</h4>
        <ul class="list-group mt-3 d-md-flex">
            <!-- Вывод списка категорий -->
            <li v-for="(category, index) in categories" :key="index" class="list-group-item">
                <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о категории -->
                <!-- Ссылка на category определена в файле router.js -->
                <!-- По маршруту user подгружается компонент Category.vue -->
                <!-- в params указываются параметры, которые передаютс компоненту-->
                <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'category-details',
                        params: { id: category.id }
                    }">
                    {{category.name}}
                </router-link>
            </li>
        </ul>
        <!-- Определение ссылок -->
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex">
            <router-link class="btn btn-outline-primary" to="/addCategory">Добавить категорию</router-link>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    export default {
        name: "ListCategories", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                categories: []
            };
        },
        methods: { // методы компонента
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
            }
        },
        mounted() { // загружаем данные категорий. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getCategories();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>