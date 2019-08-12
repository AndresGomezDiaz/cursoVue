<template lang="pug">
  .content(v-if="track && track.album")
    p
      img(:src="track.album.images[0].url")
    p
      strong {{ track.name }} 
      small [{{ track.duration_ms | ms-to-mm }}]
    p(v-show="existPreview")
      audio(controls, :src="track.preview_url")
    p(v-show="!existPreview") Sin vista previa!
      
</template>
<script>
export default {
  data(){
    return {
      track:{},
      existPreview: true
    }
  },
  created(){
    this.$bus.$on('set-track', (track) => {
      this.track = track
      if(track.preview_url === null){
        this.existPreview = false
      }else{
        this.existPreview = true
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 150px;
    border-radius: 50%;
  }
</style>

