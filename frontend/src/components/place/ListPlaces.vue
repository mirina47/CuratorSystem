<template>
    <div class="container">
        <h4 class="mt-3">Список мест жительства</h4>
        <ul class="list-group mt-3 d-md-flex">
            <!-- Вывод списка мест жительства -->
            <li v-for="(place, index) in places" :key="index" class="list-group-item">
                <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о месте жительства -->
                <!-- Ссылка на place определена в файле router.js -->
                <!-- По маршруту user подгружается компонент Place.vue -->
                <!-- в params указываются параметры, которые передаютс компоненту-->
                <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'place-details',
                        params: { id: place.id }
                    }">
                    {{place.name}}
                </router-link>
            </li>
        </ul>
        <!-- Определение ссылок -->
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex">
            <router-link class="btn btn-outline-primary" to="/addPlace">Добавить место жительства</router-link>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    export default {
        name: "ListPlaces", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                places: []
            };
        },
        methods: { // методы компонента
            getPlaces() {
                http
                    .get("/places") // обращаемся к серверу для получения списка мест жительства
                    .then(response => { // запрос выполнен успешно
                        this.places = response.data.sort((a, b) => {
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
        mounted() { // загружаем данные мест жительства. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getPlaces();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>