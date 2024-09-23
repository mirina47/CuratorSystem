<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Студенческие группы</h4> 
        <div v-if="this.currentUser.role === 'admin'">
            <h5 class="title mt-3 d-md-flex">Выберите направление:</h5>
            <div class="form-group mb-3 mt-3 d-md-flex"> 
                <select class="form-control" placeholder="Направление" required v-model="educationalProgram_id">
                    <option v-for="educationalProgram in educationalPrograms" v-bind:key="educationalProgram.id" v-bind:value="educationalProgram.id">
                        {{educationalProgram.name}}
                    </option>
                </select>
            </div>
            <h5 class="title mt-3 d-md-flex">Выберите группу:</h5>
            <div class="form-group mb-3 mt-3 d-md-flex"> 
                <select class="form-control" placeholder="Группа" required v-model="group_id">
                    <option v-for="group in groups" v-bind:key="group.id" v-bind:value="group.id">
                        {{group.name}}
                    </option>
                </select>
            </div>
        </div>
        <div v-if="this.currentUser.role === 'curator'">
            <h5 class="title mt-3 d-md-flex">Выберите группу:</h5>
            <div class="form-group mb-3 mt-3 d-md-flex"> 
                <select class="form-control" placeholder="Группа" required v-model="group_id">
                    <option v-for="elem in userGroups" v-bind:key="elem.group.id" v-bind:value="elem.group.id">
                        {{elem.group.name}}
                    </option>
                </select>
            </div>
        </div>
        <div class="form-group mb-3 mt-3 d-md-flex"> 
            <button @click="updateStudentsCode" class="btn btn-outline-primary">Сгенерировать студенческие коды</button>
        </div>
        <div> 
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ФИО студента</th>
                        <th>Уникальный код студента</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(student, index) in students" :key="index">
                        <td>{{student.lastname}} {{student.firstname}} {{student.middlename}}</td>
                        <td>{{student.code}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="this.currentUser.role === 'admin'" class="mx-auto form-group mt-3 gap-3 d-md-flex"> 
            <router-link class="btn btn-outline-primary" to="/addGroup"> Добавить студенческую группу </router-link> 
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "group-students-code",
        data() {
            return {
                educationalPrograms: [],
                educationalProgram_id: null,
                groups: [],
                userGroups: [],
                group_id: null,
                students: [],
                submitted: false
            };
        },
        watch: {
            educationalProgram_id(){
                this.getGroups();
                this.students = [];
                this.group_id = null;
            },
            group_id(){
                this.getStudents();
            }
        },

        methods: {
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
            },
            getGroups() {
                http
                    .get("/listGroups/educationalProgram_id=" + this.educationalProgram_id) // обращаемся к серверу для получения списка студенческих групп
                    .then(response => { // запрос выполнен успешно
                        this.groups = response.data.sort((a, b) => {
                            const aStart = a.name.slice(0, 5);
                            const bStart = b.name.slice(0, 5);
                            const aEnd = a.name.slice(-2);
                            const bEnd = b.name.slice(-2);

                            if (aEnd === "ДБ" && bEnd === "ДМ") return -1;
                            if (aEnd === "ДМ" && bEnd === "ДБ") return 1;

                            if (aEnd === bEnd) {
                                if (aStart < bStart) return -1;
                                if (aStart > bStart) return 1;
                                return 0;
                            }

                            if (aEnd < bEnd) return -1;
                            if (aEnd > bEnd) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getGroupsForUser() {
                http
                    .get("/groupsForUser/userId=" + this.currentUser.id)
                    .then(response => {
                        this.userGroups = response.data.sort((a, b) => {
                            const aStart = a.group.name.slice(0, 5);
                            const bStart = b.group.name.slice(0, 5);
                            const aEnd = a.group.name.slice(-2);
                            const bEnd = b.group.name.slice(-2);

                            if (aEnd === "ДБ" && bEnd === "ДМ") return -1;
                            if (aEnd === "ДМ" && bEnd === "ДБ") return 1;

                            if (aEnd === bEnd) {
                                if (aStart < bStart) return -1;
                                if (aStart > bStart) return 1;
                                return 0;
                            }

                            if (aEnd < bEnd) return -1;
                            if (aEnd > bEnd) return 1;
                            return 0;
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getStudents() {
                http
                    .get("studentsForGroup/groupId=" + this.group_id) // обращаемся к серверу для получения списка студентов
                    .then(response => { // запрос выполнен успешно
                        const groupStudents = response.data;
                        this.students = groupStudents.map(elem => elem.student).sort((a, b) => {
                            if (a.lastname < b.lastname) return -1;
                            if (a.lastname > b.lastname) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateStudentsCode(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    studentIds: this.students.map(student => student.id)
                };
                http
                    .post("/updateStudentsCode", data)
                    .then(() => { // запрос выполнился успешно
                        this.getStudents();
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            this.getEducationalPrograms();
            this.getGroupsForUser();        
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>