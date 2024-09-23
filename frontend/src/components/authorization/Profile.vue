<template>
    <div class="container">
        <header>
            <h3>
                Профиль <strong>{{currentUser.name}}</strong>
            </h3>
        </header>
        <p>
            <strong>ФИО:</strong>
            {{currentUser.lastname}} {{currentUser.firstname}} {{currentUser.lastname}}
        </p>
        <p>
            <strong>Роль:</strong>
            {{currentUser.role}} 
        </p>

        <div v-if="this.currentUser.role === 'curator'">
            <div class="row">
                <div class="col-sm-5">
                    <h4>Мои группы</h4>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(elem, index) in userGroups" :key="index">
                            <router-link :to="{
                                    name: 'group-details',
                                    params: { id: elem.group.id }
                                }">
                                {{elem.group.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import http from "../../http-common";
    export default {
        name: 'ProfileUser',
        data() {
            return {
                
                userGroups: []
                
            };
        },
        methods: {
            getGroupsForUser() {
                http
                    .get("/groupsForUser/userId=" + this.currentUser.id)
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
            
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
            this.getGroupsForUser();
        }
    };
</script>