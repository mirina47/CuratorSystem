<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div v-if="this.currentUser.role === 'admin'" class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.group" class="col-6">
                    <h4>Группа</h4>
                    <div v-if="!submitted">
                        <form @submit="updateGroup" class="form-group mt-3 gap-3 d-md-flex">
                            <div class="col-auto">
                                <input type="text" name="name" id="name" class="form-control" placeholder="Наименование группы" required v-model="group.name">
                            </div>
                            <div class="col-auto">
                                <select class="form-control" placeholder="Направление" required v-model="group.educationalProgram_id">
                                    <option v-for="educationalProgram in educationalPrograms" v-bind:key="educationalProgram.id" v-bind:value="educationalProgram.id">
                                        {{educationalProgram.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-auto">
                                <input type="text" name="uid_json" id="uid_json" class="form-control" placeholder="uid_json группы" required v-model="group.uid_json">
                            </div>
                            <div class="col-auto">
                                <input type="date" name="begin_date" id="begin_date" class="form-control" placeholder="Дата начала действия группы" required v-model="group.begin_date">
                            </div>
                            <div class="col-auto">
                                <input type="submit" class="btn btn-outline-primary" value="Обновить">
                            </div>
                        </form>
                        <div class="form-group mt-3 gap-3 d-md-flex">
                            <button v-on:click="deleteGroup()" class="btn btn-outline-danger">Удалить</button>
                        </div>
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listGroups">Вернуться к списку групп</router-link>
                    </div>
                </div>
                <div v-else>
                    <br>
                    <p>Выберите группу</p>
                </div>
            </div>



            <div v-if="this.currentUser.role === 'curator'" class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.group">
                    <header>
                        <h4>
                            Группа {{group.name}}
                        </h4>
                    </header>
                    <p>
                        <strong>Направление группы:</strong>
                        {{group.educationalProgram.name}}
                    </p>
                    <p>
                        <strong>Дата начала действия группы:</strong>
                        {{group.begin_date}}
                    </p>

                    <ul class="list-group">
                        <li v-for="(student, index) in students" :key="index" class="list-group-item">
                            <router-link class="link-dark text-decoration-none" :to="{
                                    name: 'student-details',
                                    params: { id: student.id }
                                }">
                                {{student.lastname}} {{student.firstname}} {{student.middlename}}
                            </router-link>   
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "group-details",
        props: ['id'],
        data() {
            return {
                group: null,
                educationalPrograms: [],
                groupStudents: [],
                students: [],
                submitted: false
            };
        },
        watch: {
            group(){
                this.getEducationalPrograms();
                this.getStudents();
            }
        },
        methods: {
            getGroup() {
                http
                    .get("/group/"+ this.id)
                    .then(response => {
                        this.group = response.data;
                        //console.log(this.group);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateGroup(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.group.name,
                    educationalProgram_id: this.group.educationalProgram_id,
                    uid_json: this.group.uid_json,
                    begin_date: this.group.begin_date
                };
                http
                    .post("/updateGroup/" + this.group.id, data)
                    .then(() => { // запрос выполнился успешно
                        //this.$router.push('/listGroups'); // переходим к списку групп
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteGroup() {
                http
                    .post("/deleteGroup/" + this.group.id)
                    .then(() => {
                        this.$router.push('/listGroups'); // переходим к списку групп
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getEducationalPrograms() {
                http
                    .get("/educationalPrograms") // обращаемся к серверу для получения списка направлений
                    .then(response => { // запрос выполнен успешно
                        if (this.currentUser.role === 'admin')
                            this.educationalPrograms = response.data;
                        //console.log(this.educationalPrograms)
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getStudents() {
                http
                    .get("studentsForGroup/groupId=" + this.group.id) // обращаемся к серверу для получения списка студентов
                    .then(response => { // запрос выполнен успешно
                        if (this.currentUser.role === 'curator') {
                            this.groupStudents = response.data;
                            this.students = this.groupStudents.map(elem => elem.student).sort((a, b) => {
                                if (a.lastname < b.lastname) return -1;
                                if (a.lastname > b.lastname) return 1;
                                return 0;
                            });
                        }
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() { // загружаем данные группы
            this.getGroup();
            this.getEducationalPrograms();
        }
    }
</script>