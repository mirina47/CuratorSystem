<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Список студентов по увлечениям</h4> 
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
        <h5 class="title mt-3 d-md-flex">Выберите категорию:</h5>
        <div class="form-group mb-3 mt-3 d-md-flex"> 
            <select class="form-control" placeholder="Категория" required v-model="category_id">
                <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                    {{category.name}}
                </option>
            </select>
        </div>
        <h5 class="title mt-3 d-md-flex">Выберите хобби:</h5>
        <div class="form-group mb-3 mt-3 d-md-flex"> 
            <select class="form-control" placeholder="Хобби" required v-model="hobby_id">
                <option v-for="hobby in hobbies" v-bind:key="hobby.id" v-bind:value="hobby.id">
                    {{hobby.name}}
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
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "ListStudentsByCategory",
        data() {
            return {
                educationalPrograms: [],
                educationalProgram_id: null,
                groups: [],
                userGroups: [],
                group_id: null,
                groupStudents: [],
                categories: [],
                category_id: null,
                hobbies: [],
                hobby_id: null,
                achievements: [],
                students: []
            };
        },
        watch: {
            educationalProgram_id(){
                this.getGroups();
                this.groupStudents = [];
                this.group_id = null;
                this.students = [];
            },
            group_id(){
                this.getGroupStudents();
                this.students = [];
                this.category_id = null;
            },
            category_id(){
                this.getHobbies();
                this.getStudentsByCategory();
                this.hobby_id = null;
            },
            hobby_id(){
                this.getStudentsByHobby();
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
            getGroupStudents() {
                http
                    .get("studentsForGroup/groupId=" + this.group_id) // обращаемся к серверу для получения списка студентов
                    .then(response => { // запрос выполнен успешно
                        
                        this.groupStudents = response.data.map(elem => elem.student).sort((a, b) => {
                            if (a.lastname < b.lastname) return -1;
                            if (a.lastname > b.lastname) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
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
            },
            getHobbies() {
                http
                    .get("/listHobbies/category_id=" + this.category_id) // обращаемся к серверу для получения списка хобби
                    .then(response => { // запрос выполнен успешно
                        this.hobbies = response.data.sort((a, b) => {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getStudentsByCategory() {
                http
                    .get("/listStudents/category_id/" + this.category_id) // обращаемся к серверу для получения списка категорий
                    .then(response => { // запрос выполнен успешно
                        const categoryStudents = response.data;
                        this.students = this.groupStudents.filter(student => {
                            return categoryStudents.some(categoryStudent => {return categoryStudent.id === student.id;});
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getStudentsByHobby() {
                http
                    .get("/listStudents/hobby_id/" + this.hobby_id) // обращаемся к серверу для получения списка категорий
                    .then(response => { // запрос выполнен успешно
                        const hobbyStudents = response.data;
                        this.students = this.groupStudents.filter(student => {
                            return hobbyStudents.some(hobbyStudent => {return hobbyStudent.id === student.id;});
                        });
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
        mounted() {
            if (this.currentUser.role === 'admin')
                this.getEducationalPrograms();
            if (this.currentUser.role === 'curator')
                this.getGroupsForUser();     
            this.getCategories();      
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>