<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Кураторские группы</h4> 
        <div> 
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Наименование группы</th>
                        <th>ФИО куратора</th>
                        <th>Дата начала кураторства</th>
                        <th>Дата окончания кураторства</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(teacherGroup, index) in teacherGroups" :key="index">
                        <td><a :href="'/group/' + teacherGroup.group.id">{{ teacherGroup.group.name }}</a></td>
                        <td><a :href="'/user/' + teacherGroup.user.id">{{ teacherGroup.user.lastname }} {{ teacherGroup.user.firstname }} {{ teacherGroup.user.middlename }}</a></td>
                        <td>{{ teacherGroup.begin_date }}</td>
                        <td>{{ teacherGroup.end_date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "ListTeacherGroups",
        data() {
            return {
                teacherGroups: []
            };
        },

        methods: {
            getTeacherGroups() {
                http
                    .get("/teacher_groups") // обращаемся к серверу для получения списка кураторских групп
                    .then(response => { // запрос выполнен успешно
                        this.teacherGroups = response.data.sort((a, b) => {
                            if (a.begin_date < b.begin_date) {
                                return -1;
                            } else if (a.begin_date > b.begin_date) {
                                return 1;
                            } else {
                                if (a.end_date < b.end_date) {
                                return -1;
                                } else if (a.end_date > b.end_date) {
                                return 1;
                                } else {
                                    if (a.group.name < b.group.name) {
                                        return -1;
                                    } else if (a.group.name > b.group.name) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                }
                            }
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getTeacherGroups();      
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>