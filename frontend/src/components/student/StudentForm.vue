
<template>
    <div class="container">
        <div>
            <div v-if="showCodeCheck">
                
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Проверить"
                Обработчик checkStudentCode определён в script-->
                <h4>Анкета студента</h4>
                <form @submit="checkStudentCode" class="row g-2">
                    <h5 class="title">Введите свой код</h5>
                    <div class="form-group mt-3 gap-3 d-md-flex">
                        <input type="text" name="code" id="code" class="form-control" placeholder="Код студента" required v-model="code">
                        <input type="submit" value="Проверить" class="btn btn-outline-primary">
                    </div>
                </form>
            </div>
            <div v-else-if="this.student">
                <div v-if="!submitted">
                    <form @submit.prevent="handleSubmit">
                        <!-- updateStudent() -->
                        <h4>Анкета студента {{groupName}} {{student.lastname}} {{student.firstname}} {{student.middlename}}</h4>
                        <div class="form-group row" style="border: 1px solid black;"> 
                            <h5 style="text-align: center; padding-top: 1vw;">Персональные данные</h5>
                            <div class="form-group row">
                                <label for="birthday" class="col-sm-4 col-form-label">Введите дату рождения</label>
                                <div class="col-sm-8">
                                    <input type="date" name="birthday" id="birthday" class="form-control" placeholder="Дата рождения" required v-model="student.birthday">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="birthplace" class="col-sm-4 col-form-label">Введите адрес места рождения</label>
                                <div class="col-sm-8">
                                    <input type="text" name="birthplace" id="birthplace" class="form-control" placeholder="Адрес места рождения" required v-model="student.birthplace">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="telephone" class="col-sm-4 col-form-label">Введите номер телефона:</label>
                                <div class="col-sm-8">
                                    <input type="tel" name="telephone" id="telephone" class="form-control" placeholder="+7 (900) 123-45-67" pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"  required v-model="student.telephone">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label">Введите адрес электронной почты</label>
                                <div class="col-sm-8">
                                    <input type="email" class="form-control" id="email" name="email" placeholder="me@example.org" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" required v-model="student.email">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="place" class="col-sm-4 col-form-label">Выберите место жительства</label>
                                <div class="col-sm-8">
                                    <select class="form-control" placeholder="Место жительства" required v-model="student.place_id">
                                        <option v-for="place in places" v-bind:key="place.id" v-bind:value="place.id">
                                            {{place.name}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                                
                            <div class="form-group row">
                                <label for="address" class="col-sm-4 col-form-label">Введите адрес места жительства</label>
                                <div class="col-sm-8">
                                    <input type="text" name="address" id="address" class="form-control" placeholder="Адрес места жительства" required v-model="student.address">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="address" class="col-sm-4 col-form-label">Введите место работы (если есть)</label>
                                <div class="col-sm-8">
                                    <input type="text" name="work" id="work" class="form-control" placeholder="Место работы" v-model="student.work">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="school" class="col-sm-4 col-form-label">Введите название школы, которую окончили</label>
                                <div class="col-sm-8">
                                    <input type="text" name="school" id="school" class="form-control" placeholder="Название школы" required v-model="student.school">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="school_year" class="col-sm-4 col-form-label">Введите год окончания школы</label>
                                <div class="col-sm-8">
                                    <input type="text" name="school_year" id="school_year" class="form-control" placeholder="2000" pattern="[0-9]{4}" required v-model="student.school_year">
                                </div>
                            </div>
                        </div>

                        <!-- addContact() -->
                        <div class="form-group row" style="border: 1px solid black;"> 
                            <!--v-model - директива для связывания данных с элементами.
                            Связь происходит при помощи переменных, которые определены в data()-->
                            <h5 style="text-align: center; padding-top: 1vw;">Контактная информация родственника</h5>
                            <div class="form-group mt-3 gap-3 d-md-flex"> 
                                <label class="col-sm-4 col-form-label">Выберите степень родства</label>
                                <select class="form-control" placeholder="Степень родства" required v-model="contact.relationship">
                                    <option v-for="relationship in relationships" v-bind:key="relationship.value" v-bind:value="relationship.value">
                                        {{relationship.label}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <input type="text" name="contact_lastname" id="contact_lastname" class="form-control" placeholder="Фамилия контакта" required v-model="contact.lastname">
                                <input type="text" name="contact_firstname" id="contact_firstname" class="form-control" placeholder="Имя контакта" required v-model="contact.firstname">
                                <input type="text" name="contact_middlename" id="contact_middlename" class="form-control" placeholder="Отчество контакта" required v-model="contact.middlename">
                            </div>
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <input type="tel" name="contact_telephone" id="contact_telephone" class="form-control" placeholder="+7 (900) 123-45-67" pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}" required v-model="contact.telephone">
                                <input type="email" name="contact_email" id="contact_email" class="form-control" placeholder="me@example.org (необязательно)" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" v-model="contact.email">
                                <input type="text" name="contact_address" id="contact_address" class="form-control" placeholder="Адрес места жительства контакта" required v-model="contact.address">
                                
                            </div>
                        </div> 
                       
                        <!-- addStudentHobbies() -->
                        <div class="form-group row">
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <label class="col-sm-3 col-form-label">Выберите хобби</label>
                                <treeselect 
                                    :multiple="true"
                                    :options="options"
                                    :disable-branch-nodes="true"
                                    :show-count="true" 
                                    placeholder="Выберите хобби"
                                    v-model="value" 
                                    search-nested
                                />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <label class="col-sm-5 col-form-label">Добавьте своё хобби, если в списке нет подходящего варианта</label>
                                <input type="text" name="hobby_category" id="hobby_category" class="form-control" placeholder="Категория хобби" v-model="hobby_category">
                                <input type="text" name="hobby_name" id="hobby_name" class="form-control" placeholder="Наименование хобби" v-model="hobby_name"> 
                            </div>
                        </div>

                        <!-- addAchievement() -->
                        <div class="form-group row">
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <label class="col-form-label">Добавьте достижение (если имеется). Выберите категорию из списка или введите свою </label>
                            </div>
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                
                                <select class="form-control" placeholder="Категория достижения" v-model="achievement.category_id">
                                    <option value=""></option>
                                    <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                                        {{category.name}}
                                    </option>
                                </select>
                                <input type="text" name="achievement_category" id="achievement_category" class="form-control" placeholder="Категория достижения" v-model="achievement_category">
                                <input type="text" name="achievement_name" id="achievement_name" class="form-control" placeholder="Наименование достижения" v-model="achievement.name"> 
                                <input type="date" name="achievement_date" id="achievement_date" class="form-control" placeholder="Дата достижения" v-model="achievement.achievement_date">
                            </div>
                        </div>

                        <div class="form-group row">
                            <input type="submit" value="Отправить" class="btn btn-outline-primary">
                        </div>
                    </form>
                </div>
                <div v-else class="mx-auto mt-3 gap-3">
                    <h4>Вы успешно отправили данные</h4>
                </div>    
            </div>
            <div v-else class="mx-auto mt-3 gap-3">
                <h4>Код введен неверно или уже был использован</h4>
                <button class="btn btn-outline-primary" @click="reloadPage">Обновить страницу</button>
            </div>    
        </div>
    </div>
</template>
    
<script>
    import Treeselect from 'vue3-treeselect' // import the component
    import 'vue3-treeselect/dist/vue3-treeselect.css' // import the styles
    import http from "../../http-common";
    export default {
        components: { Treeselect },
        name: "student-form",
        data() {
            return {
                code: "",
                showCodeCheck: true,
                student: null,
                groupName: null,
                places: [],
                contact: {
                    student_id: null,
                    telephone: "",
                    email: "",
                    address: "",
                    relationship: "",
                    lastname: "",
                    firstname: "",
                    middlename: ""
                },
                relationships: [
                    { value: 'Отец', label: 'Отец' },
                    { value: 'Мать', label: 'Мать' },
                    { value: 'Брат', label: 'Брат' },
                    { value: 'Сестра', label: 'Сестра' },
                    { value: 'Муж', label: 'Муж' },
                    { value: 'Жена', label: 'Жена' },
                    { value: 'Дедушка', label: 'Дедушка' },
                    { value: 'Бабушка', label: 'Бабушка' },
                    { value: 'Отчим', label: 'Отчим' },
                    { value: 'Мачеха', label: 'Мачеха' },
                ],
                categories: [],
                hobbies: [],
                options: [],
                value: null,
                hobby_category: null,
                hobby_name: null,
                achievement: {
                    student_id: null,
                    category_id: null,
                    name: null,
                    achievement_date: null
                },
                submitted: false
            };
        },
        watch: {
            student(){
                this.getGroupName();
                this.getPlaces();
                this.contact.student_id = this.student.id;
                this.achievement.student_id = this.student.id;
                this.getCategories();
            },
        },
        methods: {
            reloadPage() {
                location.reload();
            },
            checkStudentCode(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                http
                    .get("/student/code/" + this.code) // обращаемся к серверу для получения студента по коду
                    .then(response => { // запрос выполнен успешно
                        this.student = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);

                    });
                this.showCodeCheck = false;
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
            getPlaces() {
                http
                    .get("/places") // обращаемся к серверу для получения списка мест жительства
                    .then(response => { // запрос выполнен успешно
                        this.places = response.data.sort((a, b) => {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateStudent() {
                //e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    lastname: this.student.lastname,
                    place_id: this.student.place_id,
                    birthday: this.student.birthday,
                    telephone: this.student.telephone,
                    email: this.student.email, 	
                    birthplace: this.student.birthplace, 	
                    school: this.student.school, 	
                    school_year: this.student.school_year, 		
                    work: this.student.work,
                    address: this.student.address,
                    code: null
                };
                http
                    .post('/updateStudent/' + this.student.id, data)
                    .then(() => { // запрос выполнился успешно
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            addContact() {
                //e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    student_id: this.student.id,
                    telephone: this.contact.telephone,
                    email: this.contact.email,
                    address: this.contact.address,
                    relationship: this.contact.relationship,
                    lastname: this.contact.lastname,
                    firstname: this.contact.firstname,
                    middlename: this.contact.middlename
                };
                http
                    .post("/addContact", data)
                    .then(() => { // запрос выполнился успешно
            
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
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
                        this.getHobbies();
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getHobbies() {
                http
                    .get("/hobbies") // обращаемся к серверу для получения списка хобби
                    .then(response => { // запрос выполнен успешно
                        this.hobbies = response.data.sort((a, b) => {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        });
                        this.fillOptions();
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            fillOptions() { // заполнение массива options[]
                this.options = this.categories.map(category => {
                    const categoryHobbies = this.hobbies.filter(hobby => hobby.category_id === category.id)
                    const children = categoryHobbies.map(hobby => ({ id: hobby.id, label: hobby.name }))
                    return { id: category.name, label: category.name, children }
                })
            },
            addStudentHobbies() {
                //e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    student_id: this.student.id,
                    value: this.value
                };
                http
                    .post("/addStudentHobbies", data)
                    .then(() => { // запрос выполнился успешно
            
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            addNewHobbyAndCategory() {
                //e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    student_id: this.student.id,
                    category_name: this.hobby_category,
                    hobby_name: this.hobby_name
                };
                http
                    .post("/addNewHobbyAndCategory", data)
                    .then(() => { // запрос выполнился успешно
                        
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            addAchievement() {
                //e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    student_id: this.student.id,
                    achievement_category_id: this.achievement.category_id,
                    achievement_category_name: this.achievement_category,
                    name: this.achievement.name,
                    achievement_date: this.achievement.achievement_date
                };
                http
                    .post("/addAchievementWithCategory", data)
                    .then(() => { // запрос выполнился успешно
                        
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            handleSubmit(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                if ((!this.value || this.value.length === 0) && (!this.hobby_category || !this.hobby_name)) {
                    alert('Выберите хотя бы одно хобби!');
                    return;
                }
                if ((!this.hobby_category && this.hobby_name) || (this.hobby_category && !this.hobby_name)) {
                    alert('Укажите все данные вашего хобби!');
                    return;
                }
                this.updateStudent();
                this.addContact();
                if (this.hobby_category && this.hobby_name) 
                    this.addNewHobbyAndCategory();
                if (this.value) 
                    this.addStudentHobbies();
                if (!(this.achievement_category || this.achievement.category_id) && !this.achievement.name && !this.achievement.achievement_date) {
                    this.submitted = true;
                }
                else if (!(this.achievement_category || this.achievement.category_id) || !this.achievement.name || !this.achievement.achievement_date) {
                    alert('Укажите все данные вашего достижения!');
                    return;
                }
                else if (this.achievement_category && this.achievement.category_id) {
                    alert('Выберите одну категорию вашего достижения!');
                    return;
                }
                else if ((this.achievement_category || this.achievement.category_id) && this.achievement.name && this.achievement.achievement_date) {
                    this.addAchievement();
                }
                this.submitted = true;
            }
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
    .form-group {
        margin-bottom: 10px;
    }
</style>