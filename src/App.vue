<template lang="pug">
  #app
    pm-header
    pm-loader(v-show="isLoading")
    section.section(v-show="!isLoading")
      nav.nav
        .container
          input.input.is-large(type="text", 
                                placeholder="Buscar canciones" 
                                v-model="searchQuery")
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;
      .container
        p 
          small {{ searchMessage }}
          br
          br
      .container.results
        .columns.is-multiline
          .column.is-one-quarter(v-for="t in tracks")
            pm-track(
                  :class="{'is-active': t.id === selectedTrack }",
                  :track="t", 
                  @select="setSelectedTrack")
    pm-footer
</template>

<script>
import trackService from '@/services/track'
/**
 * Le agregamos Pm para indicar que es un componente, 
 * normalmente los que tienen un prefijo significa que son componentes pertenecientes al proyecto.
 * A todos los arhivos .vue se importan con todo y extensión.
 */
import PmFooter from '@/components/layout/Footer.vue' 
import PmHeader from '@/components/layout/Header.vue'
import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks:[],
      isLoading: false,
      selectedTrack: ''
    }
  },
  computed:{
    searchMessage(){
      return `Encontrados: ${this.tracks.length}`
    }
  },
  methods:{
    search(){
      if(!this.searchQuery){ return }

      this.isLoading = true

      trackService.search(this.searchQuery)
        .then(res => {
          console.log(res)
          this.tracks = res.tracks.items
          this.isLoading = false
        })
    },
    setSelectedTrack(id){
      console.log('Asignamos el id:', id)
      this.selectedTrack = id
    }
  },
  components:{ PmFooter, PmHeader, PmTrack, PmLoader }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
  .results {
    margin-top: 15px;
  }
  .is-active {
    border: 3px #23d160 solid;
  }
</style>
