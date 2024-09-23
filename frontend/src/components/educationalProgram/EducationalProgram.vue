<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.educationalProgram" class="col-6">
                    <h4>Направление</h4>
                    <div v-if="!submitted">
                        <form @submit="updateEducationalProgram" class="form-group mt-3 gap-3 d-md-flex">
                            <input type="text" name="name" id="name" placeholder="Наименование направления" required v-model="educationalProgram.name" class="form-control">
                            <input type="submit" value="Обновить" class="btn btn-outline-primary">
                        </form>
                        <div class="form-group mt-3 gap-3 d-md-flex">
                            <button class="btn btn-outline-danger" v-on:click="deleteEducationalProgram()">Удалить</button>
                        </div>
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listEducationalPrograms">Вернуться к списку направлений</router-link>
                    </div>
                </div>
                <div v-else class="col-6">
                    <br>
                    <p>Выберите направление</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "educationalProgram-details",
        props: ['id'],
        data() {
            return {
                educationalProgram: null,
                submitted: false
            };
        },
        methods: {
            getEducationalProgram() {
                http
                    .get("/educationalProgram/" + this.id) // обращаемся к серверу для получения списка, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.educationalProgram = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateEducationalProgram(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.educationalProgram.name
                };

                http
                    .post("/updateEducationalProgram/" + this.educationalProgram.id, data)
                    .then(() => { 
                        //this.$router.push('/listEducationalPrograms'); // переходим к списку
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteEducationalProgram() {
                http
                    .post("/deleteEducationalProgram/" + this.educationalProgram.id)
                    .then(() => {
                        // переходим к списку направлений (переход по ссылкам программно)
                        this.$router.push('/listEducationalPrograms');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователя
            this.getEducationalProgram();
        }
    }
</script>