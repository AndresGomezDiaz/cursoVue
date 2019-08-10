<template lang="pug">
  div
    pm-notification(v-show="showNotification", :modalType='typeNotification')
      p(slot="body") {{ messageNotification }}
    .container
      .columns
        .column.is-5.is-offset-4
          pm-loader(v-show="isLoading")
          pm-track(:track="trackDetail")
</template>

<script>
import trackService from '@/services/track'
import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'

export default {
  data(){
    return {
      trackDetail:{},
      isLoading: false,
      showNotification: false,
      messageNotification: '',
      typeNotification: ''
    }
  },
  components:{ PmTrack, PmLoader, PmNotification },
  created () {
    this.isLoading = true
    const id = this.$route.params.id
    trackService.getById(id)
      .then(res => {
        this.isLoading = false
        this.trackDetail = res
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

