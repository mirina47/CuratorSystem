<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #7AB2FF;">
      <div class="container-fluid p-2">
        <ul v-if="currentUser" class="navbar-nav me-auto mb-8 mb-lg-0 h5 nav-centered">
          <li class="nav-item"><router-link class="nav-link text" to="/groupStudentsCode">Генерация кодов студентов</router-link></li> 
          <li v-if="currentUser.role === 'admin'" class="nav-item"><router-link class="nav-link text" to="/downloadGroupsAndStudents">Загрузка групп и студентов</router-link></li> 
          <li v-if="currentUser.role === 'admin'" class="nav-item"><router-link class="nav-link text" to="/listUsers">Пользователи</router-link></li>
          <li v-if="currentUser.role === 'admin'" class="nav-item"><router-link class="nav-link text" to="/listEducationalPrograms">Направления</router-link></li>   
          <li v-if="currentUser.role === 'admin'" class="nav-item"><router-link class="nav-link text" to="/listGroups">Группы</router-link></li> 
          <li v-if="currentUser.role === 'admin'" class="nav-item"><router-link class="nav-link text" to="/listTeacherGroups">Кураторские группы</router-link></li> 
          <li v-if="currentUser.role === 'admin'" class="nav-item"><router-link class="nav-link text" to="/listStudentGroups">Студенческие группы</router-link></li>
          <li v-if="currentUser.role === 'admin'" class="nav-item"><router-link class="nav-link text" to="/listStudents">Студенты</router-link></li> 
          <li v-if="currentUser.role === 'admin'" class="nav-item"><router-link class="nav-link text" to="/listPlaces">Места жительства</router-link></li> 
          <li v-if="currentUser.role === 'admin'" class="nav-item"><router-link class="nav-link text" to="/listCategories">Категории</router-link></li> 
          <li v-if="currentUser.role === 'admin'" class="nav-item"><router-link class="nav-link text" to="/listHobbies">Хобби</router-link></li> 
          <li v-if="currentUser.role === 'curator'" class="nav-item"><router-link class="nav-link text" to="/studentFormStatistics">Статистика по анкетированию</router-link></li> 
          <li class="nav-item"><router-link class="nav-link text" to="/listStudentsByCategory">Увлечения студентов</router-link></li>
          <li class="nav-item"><router-link class="nav-link text" to="/listEvents">Мероприятия</router-link></li> 
          <li class="nav-item"><router-link to="/profile" class="nav-link login">{{ currentUser.lastname }}</router-link></li>
          <li class="nav-item"><a class="nav-item nav-link logout" href @click.prevent="logOut" >Выйти</a></li>
        </ul>
        
        <ul v-else class="navbar-nav me-auto mb-8 mb-lg-0 h5 nav-centered">
          <li class="nav-item"><router-link to="/login" class="nav-link text">Войти</router-link></li>
          <li class="nav-item"><router-link to="/studentForm" class="nav-link text">Анкета студента</router-link></li>
        </ul>
        
      </div>
    </nav>
  </div>
</template>

<script>
    export default {
      name: "NavBar",
      data() {
        return {};

      },
    computed: { // вычисляемые свойства
      currentUser() {
          return this.$store.state.auth.user;
      }
  },
    methods: {
        logOut() {
          this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
          window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
      }
    }
};
</script>

<style>

a.text:active {color: #000000} /* активная/посещенная ссылка */
a.text:visited {color: #000000}
a.text:hover {color: #ffffff}  /* при наведении */

a.text {
  text-decoration: none;
  color: #000000;
}

a.login:active {color: #ffffff} /* активная/посещенная ссылка */
a.login:hover {color: #e1e1e1}  /* при наведении */
a.login {
  text-decoration: none;
  color: #ffffff;
}

a.logout:active {color: #000000} /* активная/посещенная ссылка */
a.logout:hover {color: #bb1d1d}  /* при наведении */
a.logout {
  text-decoration: none;
  color: #000000;
}

.navbar {
  text-align: center;
  margin-top: -20px;
  margin-bottom: 20px;
}

.navbar-nav > li{
  padding-left:20px;
  padding-right:20px;
  font-weight: 600;
}

.nav-centered {
  width: 100%;
  justify-content: center;
}

.nav-a {
  margin: 5px;
}

.navbar ul{
  flex-wrap: wrap;
}

</style>