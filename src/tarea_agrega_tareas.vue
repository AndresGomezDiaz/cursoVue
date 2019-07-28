<template lang="pug">
  #app
    section.section
      nav.nav.has-shadow
        .container
          input.input.is-large(type="text", 
                                placeholder="Buscar canciones" 
                                v-model="searchQuery")
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;
          p 
            small {{ searchMessage }}
      .container
        .columns
          .column(v-for="t in tracks") {{ t.name }} - {{ t.artist }}

</template>

<script>
const tracks = [
  {name: "Las batallas", artist: "Cafe Tacvuba"},
  {name: "Antes de que nos olviden", artist: "Caifanes"},
  {name: "Mi estanciera y yo", artist: "Los Caligaris"}
]
export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks:[]
    }
  },
  computed:{
    searchMessage(){
      return `Encontrados: ${this.tracks.length}`
    }
  },
  methods:{
    search(){
      this.tracks = tracks
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
  .results {
    margin-top: 15px;
  }
</style>
