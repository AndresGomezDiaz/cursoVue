<template lang="pug">
  #app
    section.section
      nav.nav.has-shadow
        .container
          .field
            label.label Título de la tarea
              .control
                input.input.is-large(type="text", 
                                      placeholder="Título de la tarea" 
                                      v-model="title")
          .field
            label.label Tiempo de trabajo
              .control
                input.input.is-large(type="text", 
                                      placeholder="Tiempo trabajado" 
                                      v-model="time")
          .field.is-grouped.is-grouped-right
            .control
              a.button.is-info.is-large(@click="addTask") Agregar Tarea
              a.button.is-danger.is-large(@click="deleteTask") &times; Eliminar Lista completa
          br
          br
          h2 {{ timeWork }}
          p 
            small {{ numberTask }}
          
      .container
        .ul
          .li(v-for="(t, index) in tasks") {{ t.title }} - {{ t.time }}
            a.button.is-danger(@click="deleteThisTask(index)") &times;
        p.error 
          small {{ mensajeError }}

</template>

<script>
const tasks = []
export default {
  name: 'app',
  created(){
    this.tasks = JSON.parse(localStorage.getItem(tasks)) || []
  },
  data () {
    return {
      title: '',
      time: '',
      tasks: [],
      mensajeError: '',
      indexList: ''
    }
  },
  computed:{
    numberTask(){
      return `Tareas Pendientes: ${this.tasks.length}`
    },
    timeWork(){
      let horasTrabajadas = 0
      for(let item of this.tasks){
        horasTrabajadas += Number(item.time)
      }
      return `Hasta el momento hemos trabajado ${horasTrabajadas} hrs.`
    }
  },
  methods:{
    addTask(){
      if(this.title === '' || this.time === ''){
        this.mensajeError = 'Debe indicar los dos elementos título y horario'
      }else{
        if (!/^([0-9])*$/.test(this.time)){
          this.mensajeError = 'El tiempo debe ser un número'
        }else{
          this.tasks.push({title: this.title, time: this.time})
          this.title = ''
          this.time = ''
          this.mensajeError = ''
          localStorage.setItem(tasks, JSON.stringify(this.tasks))
        }
      }
    },
    deleteTask(){
      this.tasks = []
      localStorage.setItem(tasks, JSON.stringify(this.tasks))
    },
    deleteThisTask(index){
      this.tasks.splice(index, 1)
      localStorage.setItem(tasks, JSON.stringify(this.tasks))
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
  .results {
    margin-top: 15px;
  }
  .error {
    color: red;
    font-weight: bolder;
  }
  .button {
    margin-right: 10px;
  }
</style>
