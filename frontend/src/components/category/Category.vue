<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.category" class="col-6">
                    <h4>Направление</h4>
                    <div v-if="!submitted">
                        <form @submit="updateCategory" class="form-group mt-3 gap-3 d-md-flex">
                            <input type="text" name="name" id="name" placeholder="Наименование категории" required v-model="category.name" class="form-control">
                            <input type="submit" value="Обновить" class="btn btn-outline-primary">
                        </form>
                        <div class="form-group mt-3 gap-3 d-md-flex">
                            <button class="btn btn-outline-danger" v-on:click="deleteCategory()">Удалить</button>
                        </div>
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listCategories">Вернуться к списку категорий</router-link>
                    </div>
                </div>
                <div v-else class="col-6">
                    <br>
                    <p>Выберите категорию</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "category-details",
        props: ['id'],
        data() {
            return {
                category: null,
                submitted: false
            };
        },
        methods: {
            getCategory() {
                http
                    .get("/category/" + this.id) // обращаемся к серверу для получения списка, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.category = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateCategory(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.category.name
                };

                http
                    .post("/updateCategory/" + this.category.id, data)
                    .then(() => { 
                        //this.$router.push('/listCategories'); // переходим к списку
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteCategory() {
                http
                    .post("/deleteCategory/" + this.category.id)
                    .then(() => {
                        // переходим к списку категорий (переход по ссылкам программно)
                        this.$router.push('/listCategories');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователя
            this.getCategory();
        }
    }
</script>