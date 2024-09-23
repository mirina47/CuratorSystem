<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div v-if="this.currentUser.role === 'admin'" class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.student" class="col-6">
                    <h4>Студент</h4>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <button @click="updateStudentCode" class="btn btn-outline-primary">Обновить код студента</button>
                    </div>
                    <div>
                        <p>Code: {{ student.code }}</p>
                    </div>
                    <div v-if="!submitted">
                        <form @submit="updateStudent" class="form-group mt-3 gap-3 d-md-flex">
                            <div class="col-auto">
                                <input type="text" class="form-control" name="lastname" placeholder="Фамилия" v-model="student.lastname" required/>
                            </div>
                            <div class="col-auto">
                                <input type="text" class="form-control" name="firstname" placeholder="Имя" v-model="student.firstname" required/>
                            </div>
                            <div class="col-auto">
                                <input type="text" class="form-control" name="middlename" placeholder="Отчество" v-model="student.middlename" required/>
                            </div>
                            
                            <div class="col-auto">
                                <input type="submit" class="btn btn-outline-primary" value="Обновить">
                            </div>
                        </form>
                        <div class="form-group mt-3 gap-3 d-md-flex">
                            <button v-on:click="deleteStudent()" class="btn btn-outline-danger">Удалить</button>
                        </div>
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listStudents">Вернуться к списку студентов</router-link>
                    </div>
                </div>
                <div v-if="this.student">
                    <div class="form-group row"> 
                        <h4 class="col-sm-8">Уникальный код студента: {{ student.code }}</h4>
                        <button @click="deleteStudentCode" class="btn text-danger col-sm-1" title="Удалить код студента">X</button>
                        <button @click="updateStudentCode" class="btn btn-outline-primary col-sm-3">Обновить код студента</button>
                    </div>
                    <form>
                        <h4>Анкета студента {{groupName}} {{student.lastname}} {{student.firstname}} {{student.middlename}}</h4>
                        <div class="form-group row" style="border: 1px solid black;"> 
                            <h5 style="text-align: center; padding-top: 1vw;">Персональные данные</h5>
                            <div class="form-group row">
                                <label for="birthday" class="col-sm-4 col-form-label">Дата рождения</label>
                                <div class="col-sm-8">
                                    <input readonly type="date" name="birthday" id="birthday" class="form-control" placeholder="Дата рождения" required v-model="student.birthday">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="birthplace" class="col-sm-4 col-form-label">Адрес места рождения</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" name="birthplace" id="birthplace" class="form-control" placeholder="Адрес места рождения" required v-model="student.birthplace">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="telephone" class="col-sm-4 col-form-label">Номер телефона</label>
                                <div class="col-sm-8">
                                    <input readonly type="tel" name="telephone" id="telephone" class="form-control" placeholder="+7 (900) 123-45-67" pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"  required v-model="student.telephone">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label">Адрес электронной почты</label>
                                <div class="col-sm-8">
                                    <input readonly type="email" class="form-control" id="email" name="email" placeholder="me@example.org" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" required v-model="student.email">
                                </div>
                            </div>

                            <div v-if="this.student.place" class="form-group row">
                                <label for="place" class="col-sm-4 col-form-label">Место жительства</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" class="form-control" id="place" name="place" placeholder="Место жительства" required v-model="student.place.name">
                                </div>
                            </div>

                            <div v-else class="form-group row">
                                <label for="place" class="col-sm-4 col-form-label">Место жительства</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" class="form-control" id="place" name="place" placeholder="Место жительства">
                                </div>
                            </div>
                                
                            <div class="form-group row">
                                <label for="address" class="col-sm-4 col-form-label">Адрес места жительства</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" name="address" id="address" class="form-control" placeholder="Адрес места жительства" required v-model="student.address">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="address" class="col-sm-4 col-form-label">Место работы (если есть)</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" name="work" id="work" class="form-control" placeholder="Место работы" v-model="student.work">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="school" class="col-sm-4 col-form-label">Название школы, которую окончил студент</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" name="school" id="school" class="form-control" placeholder="Название школы" required v-model="student.school">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="school_year" class="col-sm-4 col-form-label">Год окончания школы</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" name="school_year" id="school_year" class="form-control" placeholder="2000" pattern="[0-9]{4}" required v-model="student.school_year">
                                </div>
                            </div>
                        </div>

                        <div class="form-group row" style="border: 1px solid black;"> 
                            <!--v-model - директива для связывания данных с элементами.
                            Связь происходит при помощи переменных, которые определены в data()-->
                            <h5 style="text-align: center; padding-top: 1vw;">Контактная информация родственника ({{ contact.relationship }})</h5>
                            
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <input readonly type="text" name="contact_lastname" id="contact_lastname" class="form-control" placeholder="Фамилия контакта"  v-model="contact.lastname">
                                <input readonly type="text" name="contact_firstname" id="contact_firstname" class="form-control" placeholder="Имя контакта"  v-model="contact.firstname">
                                <input readonly type="text" name="contact_middlename" id="contact_middlename" class="form-control" placeholder="Отчество контакта"  v-model="contact.middlename">
                            </div>
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <input readonly type="tel" name="contact_telephone" id="contact_telephone" class="form-control" placeholder="+7 (900) 123-45-67" pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"   v-model="contact.telephone">
                                <input readonly type="email" name="contact_email" id="contact_email" class="form-control" placeholder="Адрес электронной почты (отсутствует)" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" v-model="contact.email">
                                <input readonly type="text" name="contact_address" id="contact_address" class="form-control" placeholder="Адрес места жительства контакта"  v-model="contact.address">
                            </div>
                        </div> 
                    
                        <div class="form-group row">
                            <h5>Хобби студента:</h5>
                            <div v-for="(category, index) in categories" :key="index">
                                {{ category.name }}
                                <ul>
                                    <li v-for="(hobby, index) in filteredHobbies(category.id)" :key="index">
                                        {{ hobby.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div v-if="this.achievement" class="form-group row">
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <h5 class="col-sm-2">Достижение студента:</h5>
                                <input readonly type="text" name="achievement_category" id="achievement_category" class="form-control" placeholder="Категория достижения" v-model="achievement.category.name">
                                <input readonly type="text" name="achievement_name" id="achievement_name" class="form-control" placeholder="Наименование достижения" v-model="achievement.name"> 
                                <input readonly type="date" name="achievement_date" id="achievement_date" class="form-control" placeholder="Дата достижения" v-model="achievement.achievement_date">
                            </div>
                        </div>
                        <div v-else class="form-group row">
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <h5 class="col-sm-2">Достижение студента:</h5>
                            </div>
                        </div>

                        <div >
                            <h5>Дополнительная информация о студенте</h5>
                            <div >
                                <textarea name="comment" id="comment" class="form-control" placeholder="Дополнительная информация" v-model="student.comment"></textarea>
                            </div>
                            <p v-if="updateComment">Дополнительная информация обновлена!</p>
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <button v-on:click="updateStudentComment" class="btn btn-outline-primary">Обновить дополнительную информацию</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div v-else>
                    <br>
                    <p>Выберите студента</p>
                </div>
            </div>
            
            <div v-if="this.currentUser.role === 'curator'" class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.student">
                    <div class="form-group row"> 
                        <h4 class="col-sm-8">Уникальный код студента: {{ student.code }}</h4>
                        <button @click="deleteStudentCode" class="btn text-danger col-sm-1" title="Удалить код студента">X</button>
                        <button @click="updateStudentCode" class="btn btn-outline-primary col-sm-3">Обновить код студента</button>
                    </div>
                    <form>
                        <h4>Анкета студента {{groupName}} {{student.lastname}} {{student.firstname}} {{student.middlename}}</h4>
                        <div class="form-group row" style="border: 1px solid black;"> 
                            <h5 style="text-align: center; padding-top: 1vw;">Персональные данные</h5>
                            <div class="form-group row">
                                <label for="birthday" class="col-sm-4 col-form-label">Дата рождения</label>
                                <div class="col-sm-8">
                                    <input readonly type="date" name="birthday" id="birthday" class="form-control" placeholder="Дата рождения" required v-model="student.birthday">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="birthplace" class="col-sm-4 col-form-label">Адрес места рождения</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" name="birthplace" id="birthplace" class="form-control" placeholder="Адрес места рождения" required v-model="student.birthplace">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="telephone" class="col-sm-4 col-form-label">Номер телефона</label>
                                <div class="col-sm-8">
                                    <input readonly type="tel" name="telephone" id="telephone" class="form-control" placeholder="+7 (900) 123-45-67" pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"  required v-model="student.telephone">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label">Адрес электронной почты</label>
                                <div class="col-sm-8">
                                    <input readonly type="email" class="form-control" id="email" name="email" placeholder="me@example.org" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" required v-model="student.email">
                                </div>
                            </div>

                            <div v-if="this.student.place" class="form-group row">
                                <label for="place" class="col-sm-4 col-form-label">Место жительства</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" class="form-control" id="place" name="place" placeholder="Место жительства" required v-model="student.place.name">
                                </div>
                            </div>

                            <div v-else class="form-group row">
                                <label for="place" class="col-sm-4 col-form-label">Место жительства</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" class="form-control" id="place" name="place" placeholder="Место жительства">
                                </div>
                            </div>
                                
                            <div class="form-group row">
                                <label for="address" class="col-sm-4 col-form-label">Адрес места жительства</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" name="address" id="address" class="form-control" placeholder="Адрес места жительства" required v-model="student.address">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="address" class="col-sm-4 col-form-label">Место работы (если есть)</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" name="work" id="work" class="form-control" placeholder="Место работы" v-model="student.work">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="school" class="col-sm-4 col-form-label">Название школы, которую окончил студент</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" name="school" id="school" class="form-control" placeholder="Название школы" required v-model="student.school">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="school_year" class="col-sm-4 col-form-label">Год окончания школы</label>
                                <div class="col-sm-8">
                                    <input readonly type="text" name="school_year" id="school_year" class="form-control" placeholder="2000" pattern="[0-9]{4}" required v-model="student.school_year">
                                </div>
                            </div>
                        </div>

                        <div class="form-group row" style="border: 1px solid black;"> 
                            <!--v-model - директива для связывания данных с элементами.
                            Связь происходит при помощи переменных, которые определены в data()-->
                            <h5 style="text-align: center; padding-top: 1vw;">Контактная информация родственника ({{ contact.relationship }})</h5>
                            
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <input readonly type="text" name="contact_lastname" id="contact_lastname" class="form-control" placeholder="Фамилия контакта"  v-model="contact.lastname">
                                <input readonly type="text" name="contact_firstname" id="contact_firstname" class="form-control" placeholder="Имя контакта"  v-model="contact.firstname">
                                <input readonly type="text" name="contact_middlename" id="contact_middlename" class="form-control" placeholder="Отчество контакта"  v-model="contact.middlename">
                            </div>
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <input readonly type="tel" name="contact_telephone" id="contact_telephone" class="form-control" placeholder="+7 (900) 123-45-67" pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"   v-model="contact.telephone">
                                <input readonly type="email" name="contact_email" id="contact_email" class="form-control" placeholder="Адрес электронной почты (отсутствует)" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" v-model="contact.email">
                                <input readonly type="text" name="contact_address" id="contact_address" class="form-control" placeholder="Адрес места жительства контакта"  v-model="contact.address">
                            </div>
                        </div> 
                    
                        <div class="form-group row">
                            <h5>Хобби студента:</h5>
                            <div v-for="(category, index) in categories" :key="index">
                                {{ category.name }}
                                <ul>
                                    <li v-for="(hobby, index) in filteredHobbies(category.id)" :key="index">
                                        {{ hobby.name }}. Рейтинг: <span v-if="getRatingForHobby(hobby.id)">{{ getRatingForHobby(hobby.id) }}</span>
                                    </li>
                                </ul>
                            </div>
                            <button v-on:click="updateStudentRating" class="btn btn-outline-primary">Обновить рейтинг</button>
                        </div>

                        <div >
                            <h5>Дополнительная информация о студенте</h5>
                            <div >
                                <textarea name="comment" id="comment" class="form-control" placeholder="Дополнительная информация" v-model="student.comment"></textarea>
                            </div>
                            <p v-if="updateComment">Дополнительная информация обновлена!</p>
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <button v-on:click="updateStudentComment" class="btn btn-outline-primary">Обновить дополнительную информацию</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "student-details",
        props: ['id'],
        data() {
            return {
                student: null,
                groupName: null,
                contact: null,
                studentHobbies: [],
                categories: [],
                hobbies: [],
                submitted: false,
                updateComment: false
            };
        },
        watch: {
            student(){
                this.getGroupName();
                this.getContact();
                this.getHobbies();
            },
        },
        methods: {
            getStudent() {
                http
                    .get("/student/"+ this.id)
                    .then(response => {
                        this.student = response.data;
                        //console.log(this.student);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateStudent(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    lastname: this.student.lastname,
                    firstname: this.student.firstname,
                    middlename: this.student.middlename
                };
                http
                    .post("/updateStudent/" + this.student.id, data)
                    .then(() => { // запрос выполнился успешно
                        //this.$router.push('/listStudents'); // переходим к списку студент
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteStudent() {
                http
                    .post("/deleteStudent/" + this.student.id)
                    .then(() => {
                        this.$router.push('/listStudents'); // переходим к списку студент
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteStudentCode() {
                http
                    .post("/deleteStudentCode/" + this.student.id)
                    .then(() => {
                        this.getStudent();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateStudentCode(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                http
                    .post("/updateStudentCode/" + this.student.id)
                    .then(() => { // запрос выполнился успешно
                        this.getStudent();
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            getGroupName() {
                http
                    .get("/findCurrentGroup/studentId=" + this.student.id) // обращаемся к серверу для получения названия группы
                    .then(response => { // запрос выполнен успешно
                        var studentGroup = response.data;
                        this.groupName = studentGroup.group.name;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getContact() {
                http
                    .get("/contact/student_id/"+ this.student.id)
                    .then(response => {
                        this.contact = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getHobbies() {
                http
                    .get("/hobbiesForStudent/studentId=" + this.student.id) // обращаемся к серверу для получения списка хобби
                    .then(response => { // запрос выполнен успешно
                        this.studentHobbies = response.data;
                        this.hobbies = this.studentHobbies.map(item => item.hobby);
                        const all_categories  = this.studentHobbies.map(item => item.hobby.category);   
                        this.categories = all_categories.filter((category, index) => {
                                return all_categories.findIndex(c => c.id === category.id) === index;
                            });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            filteredHobbies(category) {
                return this.hobbies.filter(hobby => hobby.category_id === category);
            },
            updateStudentComment(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    comment: this.student.comment
                };
                http
                    .post("/updateStudentComment/" + this.student.id, data)
                    .then(() => { // запрос выполнился успешно
                        this.getStudent();
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.updateComment = true;
            },
            updateStudentRating(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                http
                    .post("/updateRatingForStudent/" + this.student.id)
                    .then(() => { // запрос выполнился успешно
                        this.getHobbies();
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            getRatingForHobby(hobbyId) {
                const studentHobby = this.studentHobbies.find(item => item.hobby.id === hobbyId);
                return studentHobby ? String(studentHobby.rating) : '0';
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() { // загружаем данные студента
            this.getStudent();
        }
    }
</script>