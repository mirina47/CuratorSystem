<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление хобби</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addHobby определён в script-->
                <form @submit="addHobby" class="row g-2">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <h5 class="title">Выберите категорию:</h5>
                    <div class="form-group mb-3"> 
                        <select class="form-control" placeholder="Категория" required v-model="hobby.category_id">
                            <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                                {{category.name}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group mt-3 gap-3 d-md-flex">
                        <input type="text" name="name" id="name" class="form-control" placeholder="Наименование хобби" required v-model="hobby.name">
                        <input type="submit" value="Добавить" class="btn btn-outline-primary">
                    </div>
                </form>
            </div>
            <div v-else>
                <div class="container">
                    <div class="row row-cols-lg-1 g-4">
                        <h4>Вы успешно добавили запись</h4>
                        <div class="input-group mt-3 gap-3 d-md-flex">
                            <div>
                                <button v-on:click="newHobby" class="btn btn-outline-primary">Добавить новое хобби</button>
                            </div>
                            <div>
                                <router-link class="btn btn-outline-primary" to="/listHobbies">Вернуться к списку хобби</router-link>
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
            name: "AddHobby",
            data() {
                return {
                    hobby: {
                        name: "",
                        category_id: null
                    },
                    categories: [],
                    submitted: false
                };
            },
            watch: {
                category_id(){
                    this.getHobbies();
                }
            },
            methods: {
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
                addHobby(e) {
                    e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                    var data = {
                        name: this.hobby.name,
                        category_id: this.hobby.category_id
                    };
                    http
                        .post("/addHobby", data)
                        .then(() => { // запрос выполнился успешно
                            //this.$router.push('/listHobbies'); // переходим к списку хобби
                        })
                        .catch(e => { // при выполнении запроса возникли ошибки
                            console.log(e);
                        });
                    this.submitted = true;
                },
                newHobby() {
                    this.submitted = false;
                    this.hobby = {
                        name: "",
                        category_id: null
                    };
                }
            },
            mounted() {
                this.getCategories(); 
            }
        }
    </script>