<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Группы</h4> 
        <h5 class="title mt-3 d-md-flex">Выберите направление:</h5>
        <div class="form-group mb-3 mt-3 d-md-flex"> 
            <select class="form-control" placeholder="Направление" required v-model="educationalProgram_id">
                <option v-for="educationalProgram in educationalPrograms" v-bind:key="educationalProgram.id" v-bind:value="educationalProgram.id">
                    {{educationalProgram.name}}
                </option>
            </select>
        </div>
        <ul class="list-group mt-3 d-md-flex">
            <li v-for="(group, index) in groups" :key="index" class="list-group-item">
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'group-details',
                        params: { id: group.id }
                    }">
                    {{group.name}}
                </router-link>   
            </li>
        </ul>
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex"> 
            <router-link class="btn btn-outline-primary" to="/addGroup"> Добавить группу </router-link> 
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "ListGroups",
        data() {
            return {
                educationalPrograms: [],
                educationalProgram_id: null,
                groups: []
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
            getGroups() {
                http
                    .get("/listGroups/educationalProgram_id=" + this.educationalProgram_id) // обращаемся к серверу для получения списка студенческих групп
                    .then(response => { // запрос выполнен успешно
                        this.groups = response.data.sort((a, b) => {
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
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getEducationalPrograms();        
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>