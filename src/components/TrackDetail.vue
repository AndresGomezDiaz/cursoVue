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
            h1.title {{ track.name }}
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
import trackService from '@/services/track'
import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'
import trackMixin from '@/mixins/track'

export default {
  data(){
    return {
      track: {},
      isLoading: false,
      showNotification: false,
      messageNotification: '',
      typeNotification: ''
    }
  },
  mixins: [ trackMixin ],
  components:{ PmLoader, PmNotification },
  created () {
    this.isLoading = true
    const id = this.$route.params.id
    trackService.getById(id)
      .then(res => {
        this.isLoading = false
        this.track = res
      })
      .catch(err => {
        this.isLoading = false
        this.showNotification = true
        this.messageNotification = '¡No se encontraron resultados!'
        this.typeNotification = 'is-danger'
      })
  }
}
</script>
<style lang="scss" scoped>
  .columns {
    margin: 20px;
  }
</style>

