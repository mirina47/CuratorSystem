<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.user" class="col-6">
                    <h4>Пользователь</h4>
                    <div v-if="!submitted">
                        <form @submit="updateUser" class="form-group mt-3 gap-3 d-md-flex">
                            <div class="col-auto">
                                <input type="text" class="form-control" name="lastname" placeholder="Фамилия" v-model="user.lastname" required/>
                            </div>
                            <div class="col-auto">
                                <input type="text" class="form-control" name="firstname" placeholder="Имя" v-model="user.firstname" required/>
                            </div>
                            <div class="col-auto">
                                <input type="text" class="form-control" name="middlename" placeholder="Отчество" v-model="user.middlename" required/>
                            </div>
                            <div class="col-auto">
                                <select class="form-control" placeholder="Роль" required v-model="user.role">
                                    <option v-for="role in roles" v-bind:key="role.value" v-bind:value="role.value">
                                        {{role.label}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-auto">
                                <input type="submit" class="btn btn-outline-primary" value="Обновить">
                            </div>
                            <div class="col-auto">
                                <button v-on:click="deleteUser()" class="btn btn-outline-danger">Удалить</button>
                            </div>
                        </form>
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listUsers">Вернуться к списку пользователей</router-link>
                    </div>
                    <div v-if="this.user.role === 'curator'">
                        <div class="row">
                            <div class="col-sm-5">
                                <h4>Группы куратора</h4>
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="(elem, index) in userGroups" :key="index">
                                        <router-link :to="{
                                                name: 'group-details',
                                                params: { id: elem.group.id }
                                            }">
                                            {{elem.group.name}}
                                        </router-link>
                                        <button @click="deleteGroup(elem.id)" class="btn text-danger" title="Удалить группу у куратора">
                                            X
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-sm-5">
                                <button v-show="!displayForm" @click="showConfigurationForm()" class="btn btn-success mt-2">Добавить группы в список</button>
                                <div v-show="displayForm">
                                    <button @click="addGroups" :disabled="selectedGroups.length === 0" class="btn btn-success">Добавить группы</button>
                                    <ul class="list-group mt-2">
                                        <label class="form-checkbox">
                                            <input type="checkbox" v-model="selectAll" @click="selectAllGroups">
                                            Выбрать все
                                        </label>
                                        <li v-for="(group, index) in groupsNotUser" v-bind:key="index" class="list-group-item">
                                            <div class="row">
                                                <div class="col-xs">
                                                    <input type="checkbox" v-model="selectedGroups" :value="group.id">
                                                    {{group.name}}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <br>
                    <p>Выберите пользователя</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "user-details",
        props: ['id'],
        data() {
            return {
                user: null,
                roles: [
                    { value: 'admin', label: 'Администратор' },
                    { value: 'curator', label: 'Куратор' }
                ],
                userGroups: [],
                groupsNotUser: [],
                selectedGroups: [],
                displayForm: false,
                selectAll: false,
                submitted: false
            };
        },
        watch: {
            user(){
                this.getGroupsForUser();
            }
        },
        methods: {
            getUser() {
                http
                    .get("/user/"+ this.id)
                    .then(response => {
                        this.user = response.data;
                        //console.log(this.user);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateUser(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    login: this.user.login,
                    password: this.user.password,
                    lastname: this.user.lastname,
                    firstname: this.user.firstname,
                    middlename: this.user.middlename,
                    role: this.user.role
                };
                http
                    .post("/updateUser/" + this.user.id, data)
                    .then(() => { // запрос выполнился успешно
                        //this.$router.push('/listUsers'); // переходим к списку пользователей
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteUser() {
                http
                    .post("/deleteUser/" + this.user.id)
                    .then(() => {
                        this.$router.push('/listUsers'); // переходим к списку пользователей
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getGroupsForUser() {
                http
                    .get("/groupsForUser/userId=" + this.user.id)
                    .then(response => {
                        this.userGroups = response.data.sort((a, b) => {
                            const aStart = a.group.name.slice(0, 5);
                            const bStart = b.group.name.slice(0, 5);
                            const aEnd = a.group.name.slice(-2);
                            const bEnd = b.group.name.slice(-2);

                            if (aEnd === "ДБ" && bEnd === "ДМ") return -1;
                            if (aEnd === "ДМ" && bEnd === "ДБ") return 1;

                            if (aEnd === bEnd) {
                                if (aStart < bStart) return -1;
                                if (aStart > bStart) return 1;
                                return 0;
                            }

                            if (aEnd < bEnd) return -1;
                            if (aEnd > bEnd) return 1;
                            return 0;
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getGroupsNotUser() {
                http
                    .get("/groupsNotUser/userId=" + this.user.id)
                    .then(response => {
                        this.groupsNotUser = response.data.sort((a, b) => {
                            const aStart = a.name.slice(0, 5);
                            const bStart = b.name.slice(0, 5);
                            const aEnd = a.name.slice(-2);
                            const bEnd = b.name.slice(-2);

                            if (aEnd === "ДБ" && bEnd === "ДМ") return -1;
                            if (aEnd === "ДМ" && bEnd === "ДБ") return 1;

                            if (aEnd === bEnd) {
                                if (aStart < bStart) return -1;
                                if (aStart > bStart) return 1;
                                return 0;
                            }

                            if (aEnd < bEnd) return -1;
                            if (aEnd > bEnd) return 1;
                            return 0;
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            showConfigurationForm(){
                this.displayForm = true;
                this.getGroupsNotUser();
            },
            selectAllGroups(){
                this.selectedGroups = [];
                if (!this.selectAll) {
                    for (var i in this.groupsNotUser) {
                        this.selectedGroups.push(this.groupsNotUser[i].id);
                    }
                }
            },
            addGroups() {
                var data = {
                    groups: this.selectedGroups, // передаём массив выбранных групп
                    user_id: this.user.id
                };
                http
                    .post("/addGroups", data)
                    .then(() => { // запрос выполнился успешно
                        this.getGroupsForUser();
                        this.selectedGroups = [];
                        this.displayForm = false;
                        this.selectAll = false;

                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            deleteGroup(user_group_id) {
                http
                    .post("/deleteGroupForUser/userGroupId=" + user_group_id)
                    .then(() => {
                        this.getGroupsForUser();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
        },
        mounted() { // загружаем данные пользователя
            this.getUser();
        }
    }
</script>