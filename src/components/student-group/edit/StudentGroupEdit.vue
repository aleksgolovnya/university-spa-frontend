<template>
  <div class="container-fluid">
    <section v-if="errored" class="errored">
      <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
      <router-link to="/">
        <b-button>На главную</b-button>
      </router-link>
    </section>
    <section v-else>
      <div class="jumbotron">
        <div class="page-header">
          <h1>{{ studentGroup.groupName }}</h1>
        </div>
      </div>
      <b-form @submit="onSubmit" v-if="show" class="form-class">
        <b-form-group id="studentGroupNameLabel"
                      label="Название группы студентов:"
                      label-for="studentGroupName">
          <b-form-input id="studentGroupName"
                        type="text"
                        v-model="studentGroup.groupName"
                        required
                        placeholder="Введите название группы студентов">
          </b-form-input>
        </b-form-group>
        <b-form-group id="specialtyListLabel"
                      label="Специальность:"
                      label-for="specialtyList">
          <b-form-select id="specialtyList"
                         v-model="studentGroup.specialtyId"
                         required>
            <option
              v-for="specialty in specialties"
              :key="specialty.id"
              :value="specialty.id">
              {{ specialty.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-button size="sm" type="submit" variant="primary">Сохранить</b-button>
        <b-button size="sm" variant="danger" @click="deleteStudentGroup">Удалить</b-button>
      </b-form>
      <router-link :to="'/student-groups/' + studentGroup.id">
        <b-button>Назад</b-button>
      </router-link>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StudentGroupEdit',

  data () {
    return {
      studentGroup: {
        id: this.$route.params.id,
        groupName: '',
        specialtyId: ''
      },
      specialties: null,
      students: null,
      errored: false,
      show: true
    }
  },

  methods: {
    getStudentGroup () {
      if (this.studentGroup.id !== undefined) {
        axios
          .get(`/groups/${this.studentGroup.id}`)
          .then(response => {
            this.studentGroup = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    getSpecialties () {
      axios
        .get('/specialties')
        .then(response => {
          this.specialties = response.data.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    getStudentGroupStudents () {
      axios
        .get(`/groups/${this.studentGroup.id}/students`)
        .then(response => {
          this.students = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteStudentGroup () {
      const students = this.getStudentGroupStudents()
      if (students != null) {
        alert('Удаление группы студентов невозможно, так как она содержит студентов.' +
          'Пожалуйста удалите или перенесите студентов из этой учебной группы.')
      } else {
        axios
          .delete(`/groups/${this.studentGroup.id}`)
          .then(response => {
            console.log(response.data)
            this.$router.push(`/specialties/${this.studentGroup.specialtyId}`)
            alert('Успешно удаленно')
          })
          .catch(error => {
            console.log(error)
            alert('Возникла ошибка при удалении' + error)
          })
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(
        `/groups/${this.studentGroup.id}`,
        this.studentGroup
      )
        .then(resp => alert('Успешно сохраненно'))
        .catch(err => console.error(err))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.studentGroup.groupName = ''
      this.studentGroup.specialty = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  },

  mounted () {
    this.getStudentGroup()
    this.getSpecialties()
    this.getStudentGroupStudents()
  }
}
</script>

<style scoped>
  .jumbotron {
    background-color: #f7f7f7;
    padding: 20px;
    padding-bottom: 10px;
    margin-top: 25px;
  }
  .form-class {
    max-width: 1000px;
    text-align: left;
    margin: auto;
  }
  .faculty-text {
    margin: auto;
    font-size: 18px;
    background-color: lightgray;
    max-width: 40%;
  }
  .container-fluid {
    padding: 0px;
  }
  .students-section {
    max-width: 1300px;
    margin: auto;
  }
</style>
