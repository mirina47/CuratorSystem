<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.hobby" class="col-6">
                    <h4>Группа</h4>
                    <div v-if="!submitted">
                        <form @submit="updateHobby" class="form-group mt-3 gap-3 d-md-flex">
                            <div class="col-auto">
                                <input type="text" name="name" id="name" class="form-control" placeholder="Наименование хобби" required v-model="hobby.name">
                            </div>
                            <div class="col-auto">
                                <select class="form-control" placeholder="Категория" required v-model="hobby.category_id">
                                    <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                                        {{category.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-auto">
                                <input type="submit" class="btn btn-outline-primary" value="Обновить">
                            </div>
                        </form>
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <button v-on:click="deleteHobby()" class="btn btn-outline-danger">Удалить</button>
                            </div>
                        
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listHobbies">Вернуться к списку хобби</router-link>
                    </div>
                </div>
                <div v-else>
                    <br>
                    <p>Выберите хобби</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "hobby-details",
        props: ['id'],
        data() {
            return {
                hobby: null,
                categories: [],
                submitted: false
            };
        },
        watch: {
            hobby(){
                this.getCategories();
            }
        },
        methods: {
            getHobby() {
                http
                    .get("/hobby/"+ this.id)
                    .then(response => {
                        this.hobby = response.data;
                        console.log(this.hobby);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateHobby(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.hobby.name,
                    category_id: this.hobby.category_id
                };
                http
                    .post("/updateHobby/" + this.hobby.id, data)
                    .then(() => { // запрос выполнился успешно
                        //this.$router.push('/listHobbies'); // переходим к списку хобби
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteHobby() {
                http
                    .post("/deleteHobby/" + this.hobby.id)
                    .then(() => {
                        this.$router.push('/listHobbies'); // переходим к списку хобби
                    })
                    .catch(e => {
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
                        //console.log(this.categories)
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }

        },
        mounted() { // загружаем данные хобби
            this.getHobby();
            this.getCategories();
        }
    }
</script>