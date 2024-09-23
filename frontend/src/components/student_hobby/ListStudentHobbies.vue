<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Студенческие хобби</h4> 
        <div> 
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Наименование хобби</th>
                        <th>ФИО студента</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(studentHobby, index) in studentHobbies" :key="index">
                        <td><a :href="'/hobby/' + studentHobby.hobby.id">{{ studentHobby.hobby.name }}</a></td>
                        <td><a :href="'/student/' + studentHobby.student.id">{{ studentHobby.student.lastname }} {{ studentHobby.student.firstname }} {{ studentHobby.student.middlename }}</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "ListStudentHobbies",
        data() {
            return {
                studentHobbies: []
            };
        },

        methods: {
            getStudentHobbies() {
                http
                    .get("/student_hobbies") // обращаемся к серверу для получения списка студенческих групп
                    .then(response => { // запрос выполнен успешно
                        this.studentHobbies = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getStudentHobbies();      
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>