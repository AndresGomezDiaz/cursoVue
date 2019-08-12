const trackMixin = {
  methods:{
    selectTrack(){
      if(!this.track.preview_url){ return }
      this.$emit('select', this.track.id) // emit se usa para enviar información del componente hijo al padre
      this.$bus.$emit('set-track', this.track)
    }
  }
}

export default trackMixin
