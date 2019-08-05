<template lang="pug">
  #app
    p Nombre
    input(v-model="name")
    br
    br
    p Apellidos
    input(v-model="lastname")
    br
    p Nombre completo: {{ fullName }}
    br
    br
    p Fecha de nacimiento
    input(v-model="birthday", placeholder="aaaa-mm-dd")
    br
    p Edad: {{ Age }}
    br
    br
    p Tarjeta de credito
    input(v-model="creditcard")
    button(v-on:click = "formattedCard") Formato
    br
    p {{ creditFormated }}
    

</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Hola Mundo!',
      name: '',
      lastname: '',
      birthday: '',
      creditcard: '',
      creditFormated: ''
    }
  },
  computed: {
    fullName(){
      return  `${this.name} ${this.lastname}`
    },
    Age(){
      const moment = require('moment')
      if(this.birthday.length === 10){
        let fecha = moment(this.birthday)
        let hoy = moment()
        return `${hoy.diff(fecha, 'years')} años.`
      }else{
        return ''
      }
    }
  },
  watch:{

  },
  methods:{
    formattedCard(){
      let dividido = this.creditcard.match(/.{1,4}(.$)?/g)
      this.creditFormated = dividido.join(' ')
    }
  }
}
/**
 * Los watchers (watch) sirven para desencadenar eventos cuando se está haciendo algo en el dom,
 * Algo así como ir buscando algo conforme se escribe en un input
 */

</script>

<style lang="scss">
  @import './scss/main.scss';
  #app {
    margin-top: 5%;
    margin-left: 5%;
    max-width: 420px;
  }
  h1 {
    color: #A3ECF3;
    font-size: 20px;
    font-weight: bolder;
    text-align: center
  }
  img {
    margin:10px auto;
		display:block;
  }
  .label{
    color:#FF9300;
    font-size: 11px;
  }
  .input{
    border: none;
    border-bottom: 1px solid #FF9300;
    box-shadow: none !important;
    color:#212121;
  }
  p{
    margin: 15px 15px;
  }
</style>
