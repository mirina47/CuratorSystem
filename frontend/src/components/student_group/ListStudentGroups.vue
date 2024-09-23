<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Студенческие группы</h4> 
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex"> 
            <router-link class="btn btn-outline-primary" to="/addStudentGroup"> Добавить запись </router-link> 
        </div>
        <div> 
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Наименование группы</th>
                        <th>ФИО студента</th>
                        <th>Дата начала нахождения в группе</th>
                        <th>Дата окончания нахождения в группе</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(studentGroup, index) in studentGroups" :key="index">
                        <td><a :href="'/group/' + studentGroup.group.id">{{ studentGroup.group.name }}</a></td>
                        <td><a :href="'/student/' + studentGroup.student.id">{{ studentGroup.student.lastname }} {{ studentGroup.student.firstname }} {{ studentGroup.student.middlename }}</a></td>
                        <td>{{ studentGroup.begin_date }}</td>
                        <td>{{ studentGroup.end_date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "ListStudentGroups",
        data() {
            return {
                studentGroups: []
            };
        },

        methods: {
            getStudentGroups() {
                http
                    .get("/student_groups") // обращаемся к серверу для получения списка студенческих групп
                    .then(response => { // запрос выполнен успешно
                        this.studentGroups = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getStudentGroups();      
        },
        computed: {
            
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>