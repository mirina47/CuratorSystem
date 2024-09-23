<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.place" class="col-6">
                    <h4>Место жительства</h4>
                    <div v-if="!submitted">
                        <form @submit="updatePlace" class="form-group mt-3 gap-3 d-md-flex">
                            <input type="text" name="name" id="name" placeholder="Наименование места жительства" required v-model="place.name" class="form-control">
                            <input type="submit" value="Обновить" class="btn btn-outline-primary">
                        </form>
                        <div class="form-group mt-3 gap-3 d-md-flex">
                            <button class="btn btn-outline-danger" v-on:click="deletePlace()">Удалить</button>
                        </div>
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listPlaces">Вернуться к списку мест жительства</router-link>
                    </div>
                </div>
                <div v-else class="col-6">
                    <br>
                    <p>Выберите место жительства</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "place-details",
        props: ['id'],
        data() {
            return {
                place: null,
                submitted: false
            };
        },
        methods: {
            getPlace() {
                http
                    .get("/place/" + this.id) // обращаемся к серверу для получения списка, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.place = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updatePlace(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.place.name
                };

                http
                    .post("/updatePlace/" + this.place.id, data)
                    .then(() => { 
                        //this.$router.push('/listPlaces'); // переходим к списку
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deletePlace() {
                http
                    .post("/deletePlace/" + this.place.id)
                    .then(() => {
                        // переходим к списку направлений (переход по ссылкам программно)
                        this.$router.push('/listPlaces');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные места жительства
            this.getPlace();
        }
    }
</script>