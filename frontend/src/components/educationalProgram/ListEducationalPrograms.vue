<template>
    <div class="container">
        <h4 class="mt-3">Список направлений</h4>
        <ul class="list-group mt-3 d-md-flex">
            <!-- Вывод списка направлений -->
            <li v-for="(educationalProgram, index) in educationalPrograms" :key="index" class="list-group-item">
                <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о направлении -->
                <!-- Ссылка на educationalProgram определена в файле router.js -->
                <!-- По маршруту user подгружается компонент EducationalProgram.vue -->
                <!-- в params указываются параметры, которые передаютс компоненту-->
                <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'educationalProgram-details',
                        params: { id: educationalProgram.id }
                    }">
                    {{educationalProgram.name}}
                </router-link>
            </li>
        </ul>
        <!-- Определение ссылок -->
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex">
            <router-link class="btn btn-outline-primary" to="/addEducationalProgram">Добавить направление</router-link>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    export default {
        name: "ListEducationalPrograms", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                educationalPrograms: []
            };
        },
        methods: { // методы компонента
            getEducationalPrograms() {
                http
                    .get("/educationalPrograms") // обращаемся к серверу для получения списка направлений
                    .then(response => { // запрос выполнен успешно
                        this.educationalPrograms = response.data.sort((a, b) => {
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
        mounted() { // загружаем данные направлений. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getEducationalPrograms();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>