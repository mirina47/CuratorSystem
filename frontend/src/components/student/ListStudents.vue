<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Список студентов</h4> 
        <ul class="list-group mt-3 d-md-flex">
            <li v-for="(student, index) in students" :key="index" class="list-group-item">
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'student-details',
                        params: { id: student.id }
                    }">
                    {{student.lastname}} {{student.firstname}} {{student.middlename}}
                </router-link>   
            </li>
        </ul>
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex"> 
            <router-link class="btn btn-outline-primary" to="/addStudent"> Добавить студента </router-link> 
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "ListStudents",
        data() {
            return {
                students: []
            };
        },
        methods: {
            getStudents() {
                http
                    .get("/students") // обращаемся к серверу для получения списка студентов
                    .then(response => { // запрос выполнен успешно
                        this.students = response.data.sort((a, b) => {
                            if (a.lastname < b.lastname) return -1;
                            if (a.lastname > b.lastname) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные студентов. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getStudents();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>