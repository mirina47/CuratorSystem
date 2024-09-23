<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление новой группы у студента</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addNewStudentGroupAndUpdateOld определён в script-->
                <form @submit="addNewStudentGroupAndUpdateOld" class="row g-2">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <h5 class="title mt-3 d-md-flex">Выберите направление:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Направление" required v-model="oldEducationalProgram_id">
                            <option v-for="educationalProgram in educationalPrograms" v-bind:key="educationalProgram.id" v-bind:value="educationalProgram.id">
                                {{educationalProgram.name}}
                            </option>
                        </select>
                    </div>
                    <h5 class="title mt-3 d-md-flex">Выберите группу, в которой студент состоит на данный момент:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Группа" required v-model="oldGroup_id">
                            <option v-for="oldGroup in oldGroups" v-bind:key="oldGroup.id" v-bind:value="oldGroup.id">
                                {{oldGroup.name}}
                            </option>
                        </select>
                    </div>
                    <h5 class="title mt-3 d-md-flex">Выберите студента:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Студент" required v-model="studentGroup.student_id">
                            <option v-for="student in students" v-bind:key="student.id" v-bind:value="student.id">
                                {{student.lastname}} {{student.firstname}} {{student.middlename}}
                            </option>
                        </select>
                    </div>
                    <h5 class="title mt-3 d-md-flex">Выберите направление новой группы:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Направление" required v-model="newEducationalProgram_id">
                            <option v-for="educationalProgram in educationalPrograms" v-bind:key="educationalProgram.id" v-bind:value="educationalProgram.id">
                                {{educationalProgram.name}}
                            </option>
                        </select>
                    </div>
                    <h5 class="title mt-3 d-md-flex">Выберите новую группу, в которой студент будет состоять:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Группа" required v-model="newGroup_id">
                            <option v-for="newGroup in newGroups" v-bind:key="newGroup.id" v-bind:value="newGroup.id">
                                {{newGroup.name}}
                            </option>
                        </select>
                    </div>
                    <h5 class="title mt-3 d-md-flex">Введите дату начала нахождения студента в группе:</h5>
                    <div class="form-group mt-3 gap-3 d-md-flex">
                        <input type="date" name="begin_date" id="begin_date" class="form-control" placeholder="Дата начала нахождения в группе" required v-model="studentGroup.begin_date">
                    </div>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <input type="submit" value="Добавить" class="btn btn-outline-primary">
                    </div>
                </form>
            </div>
            <div v-else-if="message" class="form-group">
                <div class="alert alert-danger" role="alert">{{message}}</div>
            </div>
            <div v-else>
                <div class="container">
                    <div class="row row-cols-lg-1 g-4">
                        <h4>Вы успешно добавили запись</h4>
                        <div class="input-group mt-3 gap-3 d-md-flex">
                            <div>
                                <button v-on:click="newStudentGroup" class="btn btn-outline-primary">Добавить новую запись</button>
                            </div>
                            <div>
                                <router-link class="btn btn-outline-primary" to="/listStudentGroups">Вернуться к списку студенческих групп</router-link>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
        import http from "../../http-common";
        export default {
            name: "AddStudentGroup",
            data() {
                return {
                    educationalPrograms: [],
                    oldEducationalProgram_id: null,
                    newEducationalProgram_id: null,
                    oldGroups: [],
                    oldGroup_id: null,
                    newGroups: [],
                    newGroup_id: null,
                    students: [],
                    studentGroup: {
                        group_id: null,
                        student_id: null,
                        begin_date: ""
                    },
                    submitted: false,
                    message: ''
                };
            },
            watch: {
                oldEducationalProgram_id(){
                    this.getOldGroups();
                    this.students = [];
                    this.group_id = null;
                    this.studentGroup.student_id = null;
                },
                oldGroup_id(){
                    this.getStudents();
                    this.studentGroup.student_id = null;
                },
                newEducationalProgram_id(){
                    this.getNewGroups();
                    this.newGroup_id = null;
                },
                newGroup_id(){
                    this.studentGroup.group_id = this.newGroup_id;
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
                getOldGroups() {
                    http
                        .get("/listGroups/educationalProgram_id=" + this.oldEducationalProgram_id) // обращаемся к серверу для получения списка студенческих групп
                        .then(response => { // запрос выполнен успешно
                            this.oldGroups = response.data.sort((a, b) => {
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
                getStudents() {
                    http
                        .get("studentsForGroup/groupId=" + this.oldGroup_id) // обращаемся к серверу для получения списка студентов
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
                getNewGroups() {
                    http
                        .get("/listGroups/educationalProgram_id=" + this.newEducationalProgram_id) // обращаемся к серверу для получения списка студенческих групп
                        .then(response => { // запрос выполнен успешно
                            this.newGroups = response.data.sort((a, b) => {
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
                addNewStudentGroupAndUpdateOld(e) {
                    e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                    var data = {
                        student_id: this.studentGroup.student_id,
                        group_id: this.studentGroup.group_id,
                        begin_date: this.studentGroup.begin_date
                    };
                    http
                        .post("/addNewStudentGroupAndUpdateOld", data)
                        .then(() => { // запрос выполнился успешно
                            //this.$router.push('/listGroups'); // переходим к списку студенческих групп
                        })
                        .catch(e => { // при выполнении запроса возникли ошибки
                            console.log(e);
                            this.message = e.response.data.message;
                        });
                    this.submitted = true;
                },
                newStudentGroup() {
                    this.submitted = false;
                    this.studentGroup = {
                        student_id: null,
                        group_id: null,
                        begin_date: ""
                    };
                }
            },
            mounted() {
                this.getEducationalPrograms(); 
            }
        }
    </script>