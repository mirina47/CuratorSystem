<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.event" class="w-100">
                    <h4 style="text-align: center;">Мероприятие</h4>
                    <div v-if="!submitted">
                        <div class="row">
                            <div class="col-sm-9">
                                <form @submit="updateEvent" class="form-group">
                                    <div class="form-group row">
                                        <label for="name" class="col-sm-4 col-form-label">Наименование мероприятия</label>
                                        <div class="col-sm-8">
                                            <input type="text" name="name" id="name" placeholder="Наименование мероприятия" required v-model="event.name" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="min_count" class="col-sm-4 col-form-label">Минимальное количество участников мероприятия</label>
                                        <div class="col-sm-8">
                                            <input type="number" name="min_count" id="min_count" placeholder="Минимальное количество участников мероприятия" required v-model="event.min_count" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="max_count" class="col-sm-4 col-form-label">Максимальное количество участников мероприятия</label>
                                        <div class="col-sm-8">
                                            <input type="number" name="max_count" id="max_count" placeholder="Максимальное количество участников мероприятия" required v-model="event.max_count" class="form-control">
                                        </div>
                                    </div>
                                    <!-- <input type="submit" value="Обновить" class="btn btn-outline-primary"> <button class="btn btn-outline-danger" v-on:click="deleteEvent()">Удалить</button> -->
                                </form>
                            </div>
                            <div class="col-sm-3">
                                <h5 style="text-align: center;">Хобби для мероприятия</h5>
                                <ul class="list-group w-100">
                                    <li v-for="(hobby, index) in hobbies" :key="index" class="list-group-item">
                                        <router-link class="link-dark text-decoration-none" :to="{
                                                name: 'hobby-details',
                                                params: { id: hobby.id }
                                            }">
                                            {{hobby.name}}
                                        </router-link>   
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listEvents">Вернуться к списку мероприятий</router-link>
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
                <div v-else class="col-6">
                    <br>
                    <p>Выберите мероприятие</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "event-details",
        props: ['id'],
        data() {
            return {
                event: null,
                submitted: false,
                userGroups: [],
                group_id: null,
                students: [],
                hobbies: []
            };
        },
        watch: {
            group_id(){
                this.getGroupStudents();
                this.students = [];
                this.getEventHobbies();
            },
        },
        methods: {
            getEvent() {
                http
                    .get("/event/" + this.id) // обращаемся к серверу для получения списка, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.event = response.data;
                        this.getEventHobbies();
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateEvent(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.event.name
                };

                http
                    .post("/updateEvent/" + this.event.id, data)
                    .then(() => { 
                        //this.$router.push('/listEvents'); // переходим к списку
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteEvent() {
                http
                    .post("/deleteEvent/" + this.event.id)
                    .then(() => {
                        // переходим к списку мероприятий (переход по ссылкам программно)
                        this.$router.push('/listEvents');
                    })
                    .catch(e => {
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
            getGroupStudents() {
                http
                    .get("studentsForGroup/groupId=" + this.group_id) // обращаемся к серверу для получения списка студентов
                    .then(response => { // запрос выполнен успешно
                        
                        this.students = response.data.map(elem => elem.student).sort((a, b) => {
                            if (a.lastname < b.lastname) return -1;
                            if (a.lastname > b.lastname) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getEventHobbies() {
                http
                    .get("hobbiesForEvent/eventId=" + this.event.id) // обращаемся к серверу для получения списка студентов
                    .then(response => { // запрос выполнен успешно
                        this.hobbies = response.data.map(elem => elem.hobby);
                        console.log(this.hobbies[0])
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() { // загружаем данные пользователя
            this.getEvent();
            
            if (!this.currentUser) {
                this.$router.push('/login');
            }
            this.getGroupsForUser();
        }
    }
</script>