<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление категории</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addCategory определён в script-->
                <form @submit="addCategory" class="input-group mt-3 gap-3 d-md-flex">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <input type="text" name="name" id="name" placeholder="Наименование категории" required v-model="category.name" class="form-control">
                    <input type="submit" value="Добавить" class="btn btn-outline-primary">
                </form>
            </div>
            <div v-else>
                <div class="container">
                    <div class="row row-cols-lg-1 g-4">
                        <h4>Вы успешно добавили запись</h4>
                        <div class="input-group mt-3 gap-3 d-md-flex">
                            <div>
                                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить новую категорию"
                                Обработчик newCategory определён в script-->
                                <button v-on:click="newCategory" class="btn btn-outline-primary">Добавить новую категорию</button>
                            </div>
                            <div>
                                <router-link to="/listCategories" class="btn btn-outline-primary">Вернуться к списку категорий</router-link>
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
        name: "AddCategory",
        data() {
            return {
                category: {
                    name: ""
                },
                submitted: false
            };
        },
        methods: {
            addCategory(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.category.name
                };
                http
                    .post("/addCategory", data)
                    .then(response => { // запрос выполнился успешно
                        this.category.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                this.submitted = true;
            },
            newCategory() {
                this.submitted = false;
                this.category = {
                    name: ""
                };
            }
        }
    }
</script>