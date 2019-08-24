const trackMixin = {
  methods:{
    selectTrack(){
      if(!this.track.preview_url){ return }
      
      this.$store.commit('setTrack', this.track)

      // Esto se remplaza por el store de vuex
      // this.$emit('select', this.track.id) // emit se usa para enviar información del componente hijo al padre
      // this.$bus.$emit('set-track', this.track)
    }
  }
}

export default trackMixin
