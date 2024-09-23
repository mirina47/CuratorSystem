<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление места жительства</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addPlace определён в script-->
                <form @submit="addPlace" class="input-group mt-3 gap-3 d-md-flex">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <input type="text" name="name" id="name" placeholder="Наименование места жительства" required v-model="place.name" class="form-control">
                    <input type="submit" value="Добавить" class="btn btn-outline-primary">
                </form>
            </div>
            <div v-else>
                <div class="container">
                    <div class="row row-cols-lg-1 g-4">
                        <h4>Вы успешно добавили запись</h4>
                        <div class="input-group mt-3 gap-3 d-md-flex">
                            <div>
                                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить новое место жительства"
                                Обработчик newPlace определён в script-->
                                <button v-on:click="newPlace" class="btn btn-outline-primary">Добавить новое место жительства</button>
                            </div>
                            <div>
                                <router-link to="/listPlaces" class="btn btn-outline-primary">Вернуться к списку мест жительства</router-link>
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
        name: "AddPlace",
        data() {
            return {
                place: {
                    name: ""
                },
                submitted: false
            };
        },
        methods: {
            addPlace(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.place.name
                };
                http
                    .post("/addPlace", data)
                    .then(response => { // запрос выполнился успешно
                        this.place.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                this.submitted = true;
            },
            newPlace() {
                this.submitted = false;
                this.place = {
                    name: ""
                };
            }
        }
    }
</script>