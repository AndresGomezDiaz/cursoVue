<template lang="pug">
  .container
    .columns
      pm-notification(v-show="showNotification", :modalType='typeNotification')
        p(slot="body") {{ messageNotification }}
      pm-loader(v-show="isLoading")
      .column.is-3.has-text-centered(v-if="track && track.album") 
        figure.media-left
        p.image
          img(v-bind:src="track.album.images[0].url")
        br
        p
          a.button.is-primary.is-large
            span(@click= "selectTrack") Reproducir ▶️
      .column.is-8(v-if="track && track.album")
        .panel
          .panel-heading
            h1.title {{ trackTitle }}
          .panel-block
            article.media
              .media-content
                .content
                  ul(v-for="(v, k) in track")
                    li
                      strong {{ k }}: &nbsp;
                      span {{ v }}
              nav.level
                .level-left
                  a.level-item
</template>

<script>
import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'
import trackMixin from '@/mixins/track'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data(){
    return {
      // track: {},
      isLoading: false,
      showNotification: false,
      messageNotification: '',
      typeNotification: ''
    }
  },
  computed:{
    ...mapState(['track']),
    ...mapGetters(['trackTitle'])
  },

  mixins: [ trackMixin ],
  components:{ PmLoader, PmNotification },
  created () {
    this.isLoading = true
    const id = this.$route.params.id

    if(!this.track || !this.track.id || this.track.id !== id){
      this.getTrackById({ id })
        .then(() =>{
          this.isLoading = false
          this.track = res
          console.log('Track loaded.... ')
        })
        .catch(err => {
          this.isLoading = false
          if(!this.track || !this.track.id){
            this.showNotification = true
            this.messageNotification = '¡No se encontraron resultados!'
            this.typeNotification = 'is-danger'
          }
          
        })
    }
  },
  methods:{
    ...mapActions(['getTrackById'])
  }
}
</script>
<style lang="scss" scoped>
  .columns {
    margin: 20px;
  }
</style>

