<template lang="pug">
  #app
    pm-header

    router-view
    
    pm-footer
</template>

<script>
import PmFooter from '@/components/layout/Footer.vue' 
import PmHeader from '@/components/layout/Header.vue'

/**
 * router-view es un componente de router que renderiza el contenido
 */

export default {
  name: 'app',
  components: { PmFooter, PmHeader }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
</style>
