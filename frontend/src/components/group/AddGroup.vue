<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление группы</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addGroup определён в script-->
                <form @submit="addGroup" class="row g-2">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <h5 class="title">Выберите направление:</h5>
                    <div class="form-group mb-3"> 
                        <select class="form-control" placeholder="Направление" required v-model="group.educationalProgram_id">
                            <option v-for="educationalProgram in educationalPrograms" v-bind:key="educationalProgram.id" v-bind:value="educationalProgram.id">
                                {{educationalProgram.name}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group mt-3 gap-3 d-md-flex">
                        <input type="text" name="name" id="name" class="form-control" placeholder="Наименование группы" required v-model="group.name">
                        <input type="text" name="uid_json" id="uid_json" class="form-control" placeholder="uid_json" required v-model="group.uid_json">
                        <input type="date" name="begin_date" id="begin_date" class="form-control" placeholder="Дата начала действия группы" required v-model="group.begin_date">
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
                                <button v-on:click="newGroup" class="btn btn-outline-primary">Добавить новую группу</button>
                            </div>
                            <div>
                                <router-link class="btn btn-outline-primary" to="/listGroups">Вернуться к списку групп</router-link>
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
            name: "AddGroup",
            data() {
                return {
                    group: {
                        name: "",
                        educationalProgram_id: null,
                        uid_json: "",
                        begin_date: ""
                    },
                    educationalPrograms: [],
                    submitted: false
                };
            },
            watch: {
                educationalProgram_id(){
                    this.getGroups();
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
                addGroup(e) {
                    e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                    var data = {
                        name: this.group.name,
                        educationalProgram_id: this.group.educationalProgram_id,
                        uid_json: this.group.uid_json,
                        begin_date: this.group.begin_date
                    };
                    http
                        .post("/addGroup", data)
                        .then(() => { // запрос выполнился успешно
                            //this.$router.push('/listGroups'); // переходим к списку студенческих групп
                        })
                        .catch(e => { // при выполнении запроса возникли ошибки
                            console.log(e);
                        });
                    this.submitted = true;
                },
                newGroup() {
                    this.submitted = false;
                    this.group = {
                        name: "",
                        educationalProgram_id: null,
                        uid_json: "",
                        begin_date: ""
                    };
                }
            },
            mounted() {
                this.getEducationalPrograms(); 
            }
        }
    </script>