<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-4">
            <!--Календарь с выбором периода-->
            <Datepicker v-model="date"
                range
                multiCalendars
                autoApply
                locale="ru"
            />
        </div>
        <div class="col-auto">
            <button v-on:click="getEventsForPeriod()" class="btn btn-info">Вывести мероприятия за этот период</button>
        </div>
        <div class="col-sm-9">
                <h4 class="mt-3">Список мероприятий</h4>
                <ul class="list-group mt-3 d-md-flex">
                    <label class="form-checkbox">
                        <input type="checkbox" v-model="isSelectAllEvents" @click="selectAllEvents">
                        Выбрать все
                    </label>
                    <!-- Вывод списка мероприятий -->
                    <li v-for="(event, index) in dataEvents" :key="index" class="list-group-item">
                        <input type="checkbox" v-model="selectedEvents" :value="event">
                        <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о мероприятии -->
                        <!-- Ссылка на event определена в файле router.js -->
                        <!-- По маршруту user подгружается компонент Event.vue -->
                        <!-- в params указываются параметры, которые передаютс компоненту-->
                        <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                        <router-link class="link-dark text-decoration-none" :to="{
                                name: 'event-details',
                                params: { id: event.id }
                            }">
                            <span v-html="'&nbsp;'"></span> {{event.name}} 
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="this.currentUser.role === 'curator'">
            <h5 class="title mt-3 d-md-flex">Выберите группу:</h5>
            <div class="form-group mb-3 mt-3 d-md-flex"> 
                <select class="form-control" placeholder="Группа" required v-model="group_id">
                    <option v-for="elem in userGroups" v-bind:key="elem.group.id" v-bind:value="elem.group.id">
                        {{elem.group.name}}
                    </option>
                </select>
            </div>
        </div>

        <ul class="list-group mt-3 d-md-flex">
            <label class="form-checkbox">
                <input type="checkbox" v-model="isSelectAllStudents" @click="selectAllStudents">
                Выбрать все
            </label>
            <li v-for="(student, index) in students" :key="index" class="list-group-item">
                <input type="checkbox" v-model="selectedStudents" :value="student">
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'student-details',
                        params: { id: student.id }
                    }">
                    <span v-html="'&nbsp;'"></span> {{student.lastname}} {{student.firstname}} {{student.middlename}}
                </router-link>
            </li>
        </ul>

        <br>
        <button v-on:click="getDistribution" class="btn btn-outline-primary">Назначить студентов</button>
        <br> <br>
        <!-- <div>
            <table style="width: 100%; border-collapse: collapse;">
            <tr v-for="(row, index) in costMatrix" :key="index">
                <td
                v-for="(value, j) in row"
                :key="j"
                style="border: 1px solid black; text-align: center; padding: 10px;"
                >
                {{ value }}
                </td>
            </tr>
            </table>
        </div> -->
        
        <div>
            <h4>Назначение студентов на мероприятия</h4>
            <ul class="list-group mt-3 d-md-flex">
                <label>
                    <input type="checkbox" v-model="isSelectAllDistribution" @click="selectAllDistribution">
                    Выбрать все
                </label>
                <li v-for="(assignment, index) in distributionInfo" :key="index" class="list-group-item">
                    <input type="checkbox" v-model="selectedDistribution" :value="assignment">
                    
                    {{ assignment}}
                </li>
            </ul>
        </div>
        <br>
        <button v-on:click="confirmDistribution" class="btn btn-outline-primary">Подтвердить назначение</button>
        <br> <br>
        <div v-if="this.isConfirm">
            <h5 class="title mt-3 d-md-flex">Назначение подтверждено</h5>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    import { ref, onMounted } from 'vue';
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import moment from 'moment'
    import { VDateFormat } from 'vue-date-fns'
    moment.locale('ru');
    
    export default {
        name: "ListEvents", // Имя шаблона
        components: {
            Datepicker
        },
        setup() { // Установка календаря (по документации)
            const date = ref();
            onMounted(() => {
                const startDate = new Date();
                const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
                date.value = [startDate, endDate];
            });
            return {
                date
            }
        },
        directives: {
            DateFormate: VDateFormat
        },
        data() { // данные компонента (определение переменных)
            return {
                events: [],
                //costMatrix: [], // Переменная для хранения матрицы стоимостей
                distributionInfo: [],
                distribution: [],
                userGroups: [],
                group_id: null,
                groupStudents: [],
                students: [],
                isConfirm: false,
                begin_date: new Date(),
                end_date: new Date(),
                dataEvents: null,
                selectedEvents: [],
                isSelectAllEvents: false,
                selectedStudents: [],
                isSelectAllStudents: false,
                isSelectAllDistribution: false,
                selectedDistribution: [],
                // studentIds: [],
                // students: []
            };
        },
        watch: {
            group_id(){
                this.getGroupStudents();
            }
        },
        methods: { // методы компонента
            getEvents() {
                http
                    .get("/events") // обращаемся к серверу для получения списка мероприятий
                    .then(response => { // запрос выполнен успешно
                        this.events = response.data.sort((a, b) => {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
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
            getGroupStudents() {
                http
                    .get("studentsForGroup/groupId=" + this.group_id) // обращаемся к серверу для получения списка студентов
                    .then(response => { // запрос выполнен успешно
                        
                        this.students = response.data.map(elem => elem.student).sort((a, b) => {
                            if (a.lastname < b.lastname) return -1;
                            if (a.lastname > b.lastname) return 1;
                            return 0;
                        });
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            
            
            getEventsForPeriod() {
                const begin_date = moment(this.date[0]).format('YYYY-MM-DD');
                const begin_time = moment(this.date[0]).format('HH:mm:ss');
                const end_date = moment(this.date[1]).format('YYYY-MM-DD');
                const end_time = moment(this.date[1]).format('HH:mm:ss');
                http
                    .get("/eventsForPeriod" + "/beginDate=" + begin_date + "/beginTime=" + begin_time + "/endDate=" + end_date + "/endTime=" + end_time)
                    .then(response => {
                        this.dataEvents = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            selectAllEvents(){
                this.selectedEvents = [];
                if (!this.isSelectAllEvents) {
                    for (var i in this.dataEvents) {
                        this.selectedEvents.push(this.dataEvents[i]);
                    }
                }
            },
            selectAllStudents(){
                this.selectedStudents = [];
                if (!this.isSelectAllStudents) {
                    for (var i in this.students) {
                        this.selectedStudents.push(this.students[i]);
                    }
                }
            },
            selectAllDistribution(){
                this.selectedDistribution = [];
                if (!this.isSelectAllDistribution) {
                    for (var i in this.distributionInfo) {
                        this.selectedDistribution.push(this.distributionInfo[i]);
                    }
                }
            },
            getDistribution() {
                const distributionEvents = this.selectedEvents;
                const distributionStudents = this.selectedStudents;
                http
                    .post("/distributeStudentsToEvents", JSON.stringify({ distributionEvents: distributionEvents, distributionStudents: distributionStudents })) // обращаемся к серверу для получения списка мероприятий
                    .then(response => { // запрос выполнен успешно
                        //console.log(distributionStudents)
                        this.distributionInfo = response.data.distributionInfo;//.displayAssignmentResult;
                        this.distribution = response.data.distribution;
                        //this.studentIds = response.data.studentIds; // Сохраняем studentIds в компоненте
                        //this.students = this.getStudentsData(this.studentIds);
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            confirmDistribution() {
                const distributionConfirm = this.selectedDistribution; // Получение массива студентов из данных компонента
                http
                    .post("/confirmStudentsToEvents", JSON.stringify({ distributionConfirm: distributionConfirm })) // обращаемся к серверу для получения списка мероприятий
                    .then(() => { // запрос выполнен успешно
                        
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
                this.isConfirm = true;
            },
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() { // загружаем данные мероприятий. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getEvents();
            if (this.currentUser.role === 'curator')
                this.getGroupsForUser(); 
            //this.getMatrix();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>



