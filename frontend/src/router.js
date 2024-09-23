import { createWebHistory, createRouter } from "vue-router";

import store from "./store/index";

// импорт компонентов
import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";

import AddCategory from "./components/category/AddCategory";
import Category from "./components/category/Category";
import ListCategories from "./components/category/ListCategories";

import AddEducationalProgram from "./components/educationalProgram/AddEducationalProgram";
import EducationalProgram from "./components/educationalProgram/EducationalProgram";
import ListEducationalPrograms from "./components/educationalProgram/ListEducationalPrograms";

//import AddEvent from "./components/category/AddCategory";
import Event from "./components/event/Event";
import ListEvents from "./components/event/ListEvents";

import AddGroup from "./components/group/AddGroup";
import DownloadGroupsAndStudents from "./components/group/DownloadGroupsAndStudents";
import Group from "./components/group/Group";
import GroupStudentsCode from "./components/group/GroupStudentsCode";
import ListGroups from "./components/group/ListGroups";

import AddHobby from "./components/hobby/AddHobby";
import Hobby from "./components/hobby/Hobby";
import ListHobbies from "./components/hobby/ListHobbies";

import AddPlace from "./components/place/AddPlace";
import ListPlaces from "./components/place/ListPlaces";
import Place from "./components/place/Place";

import AddStudent from "./components/student/AddStudent";
import ListStudents from "./components/student/ListStudents";
import ListStudentsByCategory from "./components/student/ListStudentsByCategory";
import Student from "./components/student/Student";
import StudentForm from "./components/student/StudentForm";
import StudentFormStatistics from "./components/student/StudentFormStatistics";

import AddStudentGroup from "./components/student_group/AddStudentGroup";
import ListStudentGroups from "./components/student_group/ListStudentGroups";

import ListStudentHobbies from "./components/student_hobby/ListStudentHobbies";

import ListTeacherGroups from "./components/teacher_group/ListTeacherGroups";

import AddUser from "./components/user/AddUser";
import ListUsers from "./components/user/ListUsers";
import SearchUsers from "./components/user/SearchUsers";
import User from "./components/user/User";

// определяем маршруты
const routes = [
    {
        path: "/studentForm",
        name: "student-form",
        component: StudentForm,
        meta: {
            title: "Анкета студента"
        }
    },
    {
        path: "/studentFormStatistics",
        name: "student-form-statistics",
        component: StudentFormStatistics,
        meta: {
            title: "Статистика по анкетированию"
        }
    },
    {
        path: "/groupStudentsCode",
        name: "group-students-code",
        component: GroupStudentsCode,
        meta: {
            title: "Коды студентов группы",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },

    {
        path: "/downloadGroupsAndStudents",
        name: "download-groups-and-students",
        component: DownloadGroupsAndStudents,
        meta: {
            title: "Загрузка групп и студентов",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },


    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    


    {
        path: "/listCategories", // указание маршрута, по которому будем переходить к списку категорий
        name: "categories", // имя маршрута
        alias: "/categories", // указание дополнительного маршрута
        component: ListCategories, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список категорий",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/category/:id",
        name: "category-details",
        component: Category,
        props: true, // указываем, что компонент Category.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные категории",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/addCategory",
        name: "add-category",
        component: AddCategory,
        meta: {
            title: "Добавление категории",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },



    {
        path: "/listEducationalPrograms", // указание маршрута, по которому будем переходить к списку направлений
        name: "educationalPrograms", // имя маршрута
        alias: "/educationalPrograms", // указание дополнительного маршрута
        component: ListEducationalPrograms, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список направлений",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/educationalProgram/:id",
        name: "educationalProgram-details",
        component: EducationalProgram,
        props: true, // указываем, что компонент EducationalProgram.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные направления",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/addEducationalProgram",
        name: "add-educationalProgram",
        component: AddEducationalProgram,
        meta: {
            title: "Добавление направления",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },



    {
        path: "/listEvents", // указание маршрута, по которому будем переходить к списку мероприятий
        name: "events", // имя маршрута
        alias: "/events", // указание дополнительного маршрута
        component: ListEvents, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список мероприятий",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/event/:id",
        name: "event-details",
        component: Event,
        props: true, // указываем, что компонент Category.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные мероприятия",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    // {
    //     path: "/addEvent",
    //     name: "add-event",
    //     component: AddEvent,
    //     meta: {
    //         title: "Добавление мероприятия",
    //         // маршрут защищаем (делаем доступным только авторизованным пользователям)
    //         requiredAuth: true
    //     }
    // },

    


    {
        path: "/listGroups", // указание маршрута, по которому будем переходить к списку групп
        name: "groups", // имя маршрута
        alias: "/groups", // указание дополнительного маршрута
        component: ListGroups, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список групп",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/group/:id",
        name: "group-details",
        component: Group,
        props: true, // указываем, что компонент Group.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные группы",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/addGroup",
        name: "add-group",
        component: AddGroup,
        meta: {
            title: "Добавление группы",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },




    {
        path: "/listHobbies", // указание маршрута, по которому будем переходить к списку хобби
        name: "hobbies", // имя маршрута
        alias: "/hobbies", // указание дополнительного маршрута
        component: ListHobbies, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список хобби",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/hobby/:id",
        name: "hobby-details",
        component: Hobby,
        props: true, // указываем, что компонент Hobby.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные хобби",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/addHobby",
        name: "add-hobby",
        component: AddHobby,
        meta: {
            title: "Добавление хобби",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },



    {
        path: "/listPlaces", // указание маршрута, по которому будем переходить к списку мест жительства
        name: "places", // имя маршрута
        alias: "/places", // указание дополнительного маршрута
        component: ListPlaces, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список мест жительства",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/place/:id",
        name: "place-details",
        component: Place,
        props: true, // указываем, что компонент Place.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные места жительства",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/addPlace",
        name: "add-place",
        component: AddPlace,
        meta: {
            title: "Добавление места жительства",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },




    {
        path: "/listStudentGroups", // указание маршрута, по которому будем переходить к списку студенческих групп
        name: "studentGroups", // имя маршрута
        alias: "/studentGroups", // указание дополнительного маршрута
        component: ListStudentGroups, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список студенческих групп",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/addStudentGroup",
        name: "add-studentGroup",
        component: AddStudentGroup,
        meta: {
            title: "Добавление студенческой группы",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },




    {
        path: "/listStudentHobbies", // указание маршрута, по которому будем переходить к списку студенческих хобби
        name: "studentHobbies", // имя маршрута
        alias: "/studentHobbies", // указание дополнительного маршрута
        component: ListStudentHobbies, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список студенческих хобби",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },



    {
        path: "/listStudents", // указание маршрута, по которому будем переходить к списку студентов
        name: "students", // имя маршрута
        alias: "/students", // указание дополнительного маршрута
        component: ListStudents, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список студентов",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/listStudentsByCategory", // указание маршрута, по которому будем переходить к списку студентов
        name: "list-students-by-category", // имя маршрута
        component: ListStudentsByCategory, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список студентов по категориям",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/student/:id",
        name: "student-details",
        component: Student,
        props: true, // указываем, что компонент Student.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные студента",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/addStudent",
        name: "add-student",
        component: AddStudent,
        meta: {
            title: "Добавление студента",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },



    {
        path: "/listTeacherGroups", // указание маршрута, по которому будем переходить к списку кураторских групп
        name: "teacherGroups", // имя маршрута
        alias: "/teacherGroups", // указание дополнительного маршрута
        component: ListTeacherGroups, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список кураторских групп",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },



    {
        path: "/listUsers", // указание маршрута, по которому будем переходить к списку пользователей
        name: "users", // имя маршрута
        alias: "/users", // указание дополнительного маршрута
        component: ListUsers, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список пользователей",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/user/:id",
        name: "user-details",
        component: User,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные пользователя",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/addUser",
        name: "add-user",
        component: AddUser,
        meta: {
            title: "Добавление пользователя",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },

    {
        path: "/searchUsers",
        name: "search-users",
        component: SearchUsers,
        meta: {
            title: "Поиск пользователей",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }

    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});
            });
        return next({ path: "/login" });
    }
    return next();
});

export default router;