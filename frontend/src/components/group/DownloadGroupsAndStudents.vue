<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div v-if="!submitted">
                <div class="form-group mt-3 gap-3 d-md-flex">
                    <input type="file" id="file" ref="file" class="form-control" accept=".json" required v-on:change="handleFileUpload()"/>
                </div>
                <div class="form-group mb-3 mt-3 d-md-flex"> 
                    <button @click="downloadGroups" class="btn btn-outline-primary">Загрузить группы</button>
                </div>
                <div class="form-group mb-3 mt-3 d-md-flex"> 
                    <button @click="downloadStudents" class="btn btn-outline-primary">Загрузить студентов</button>
                </div>
            </div>
            <div v-else>
                <h5>{{message}}</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    //import axios from 'axios';
    export default {
        name: "download-groups-or-students",
        data() {
            return {
                file: null,
                message: "",
                submitted: false
            };
        },
        methods: {
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            },
            downloadGroups(e){
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                const formData = new FormData();
                formData.append('file', this.file);

                http
                    .post("/downloadGroups", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(() => { // запрос выполнился успешно
                        this.message = "Загрузка групп выполнена успешно"
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                        this.message = "Записи не добавлены в базу данных, повторите попытку или обратитесь к администратору для выяснения причины ошибки";
                    });
                this.submitted = true;
            },
            downloadStudents(e){
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                const formData = new FormData();
                formData.append('file', this.file);

                http
                    .post("/downloadStudents", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(() => { // запрос выполнился успешно
                        this.message = "Загрузка студентов выполнена успешно"
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                        this.message = "Записи не добавлены в базу данных, повторите попытку или обратитесь к администратору для выяснения причины ошибки";
                    });
                this.submitted = true;
            }
        }
    }
</script>