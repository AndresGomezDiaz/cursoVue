<template lang="pug">
  main

    pm-notification(v-show="showNotification", :modalType='typeNotification')
      p(slot="body") {{ messageNotification }}
    pm-loader(v-show="isLoading")
    section.section(v-show="!isLoading")
      nav.nav
        .container
          input.input.is-large(type="text", 
                                placeholder="Buscar canciones", 
                                v-model="searchQuery",
                                @keyup.enter="search")
          a.button.button-busqueda.is-info.is-large(@click="search", style="margin:10px;") Buscar
          a.button.button-busqueda.is-danger.is-large(@click="cancelSearch", style="margin:10px;") &times; Reiniciar
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
</template>

<script>
import trackService from '@/services/track'
/**
 * Le agregamos Pm para indicar que es un componente, 
 * normalmente los que tienen un prefijo significa que son componentes pertenecientes al proyecto.
 * A todos los arhivos .vue se importan con todo y extensión.
 */
import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks:[],
      isLoading: false,
      selectedTrack: '',
      showNotification: false,
      messageNotification: '',
      typeNotification: ''
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
          if(res.tracks.total === 0){
            this.messageNotification = '¡No se encontraron resultados!'
            this.typeNotification = 'is-danger'
          }else{
            this.messageNotification = `Se encontraron ${res.tracks.total} resultados`
            this.typeNotification = 'is-success'
          }
          this.showNotification = true
          this.tracks = res.tracks.items
          this.isLoading = false
        })
    },
    setSelectedTrack(id){
      console.log('Asignamos el id:', id)
      this.selectedTrack = id
    },
    cancelSearch(){
      this.tracks = []
      this.searchQuery = ''
    }
  },
  components:{ PmTrack, PmLoader, PmNotification },
  watch:{ // Los watcher no devuelven nada solo ejecutan codigo
      showNotification(){
        if(this.showNotification){
          setTimeout(() => {
            this.showNotification = false
          }, 3000)
        }
      }
    }
}
</script>

<style lang="scss" scoped>
  .results {
    margin-top: 15px;
  }
  .is-active {
    border: 3px #23d160 solid;
  }
  .button-busqueda {
    margin:5px;
  }
</style>
