
<template>
    <div class="container">
        <div v-if="this.currentUser.role === 'curator'">
            <div class="row">
                <div>
                    <h4>Мои группы</h4>
                    <div v-for="(userGroup, index) in userGroups" :key="index">
                        <h5 class="mt-3 d-md-flex">
                            <router-link :to="{name: 'group-details', params: { id: userGroup.group.id }}"> 
                                {{userGroup.group.name}} 
                            </router-link>
                            &nbsp;(Анкетирование не прошли {{userGroup.group.studentsWithoutForm.length}} из {{userGroup.group.students.length}})
                        </h5> 
                        
                        <ul class="list-group">
                            <li v-for="(student, index) in userGroup.group.studentsWithoutForm" :key="index" class="list-group-item">
                                <router-link class="link-dark text-decoration-none" :to="{
                                        name: 'student-details',
                                        params: { id: student.id }
                                    }">
                                    {{student.lastname}} {{student.firstname}} {{student.middlename}} (уникальный код для прохождения анкетирования: {{ student.code }})
                                </router-link>   
                            </li>
                        </ul>
                        
                    </div>

                    
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
    import http from "../../http-common";
    export default {
        name: "student-form-statistis",
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
                        const UserGroups = response.data.sort((a, b) => {
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
                        const requests = UserGroups.map(async userGroup => {
                            try {
                                const responseWithoutForm = await http.get("studentsWithoutFormForGroup/groupId=" + userGroup.group.id);
                                const studentsWithoutForm = responseWithoutForm.data.map(elem => elem.student).sort((a, b) => {
                                    if (a.lastname < b.lastname) return -1;
                                    if (a.lastname > b.lastname) return 1;
                                    return 0;
                                });
                                userGroup.group.studentsWithoutForm = studentsWithoutForm;
                                const response = await http.get("studentsForGroup/groupId=" + userGroup.group.id);
                                userGroup.group.students = response.data;
                            } catch (e) {
                                console.log(e);
                            }
                        });
                        
                        Promise.all(requests).then(() => {
                            this.userGroups = UserGroups;
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