<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление студента</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addStudent определён в script-->
                <form @submit="addStudent" class="row g-2">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <div class="form-group mt-3 gap-3 d-md-flex">
                        <input type="text" name="lastname" id="lastname" class="form-control" placeholder="Фамилия студента" required v-model="student.lastname">
                        <input type="text" name="firstname" id="firstname" class="form-control" placeholder="Имя студента" required v-model="student.firstname">
                        <input type="text" name="middlename" id="middlename" class="form-control" placeholder="Отчество студента" required v-model="student.middlename">
                        <input type="text" name="uid_json" id="uid_json" class="form-control" placeholder="uid_json студента" required v-model="student.uid_json">
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
                                <button v-on:click="newStudent" class="btn btn-outline-primary">Добавить нового студента</button>
                            </div>
                            <div>
                                <router-link class="btn btn-outline-primary" to="/listStudents">Вернуться к списку студентов</router-link>
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
        name: "AddStudent",
        data() {
            return {
                student: {
                    lastname: "",
                    firstname: "",
                    middlename: "",
                    uid_json: ""
                },
                submitted: false
            };
        },
        methods: {
            addStudent(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    lastname: this.student.lastname,
                    firstname: this.student.firstname,
                    middlename: this.student.middlename,
                    uid_json: this.student.uid_json
                };
                http
                    .post("/addStudent", data)
                    .then(() => { // запрос выполнился успешно
                        //this.$router.push('/listStudents'); // переходим к списку студент
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            newStudent() {
                this.submitted = false;
                this.student = {
                    lastname: "",
                    firstname: "",
                    middlename: "",
                    uid_json: ""
                };
            }
        }
    }
</script>