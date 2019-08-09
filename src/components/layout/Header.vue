<template lang="pug">
  section.hero.is-success
    .hero-head
      header.nav
        .container
          .nav-left
            .nav-item
              strong.strong-header 📺 Platzi Music
          .nav-right.nav-menu
    .hero-body
      .container.has-text-centered
        h1.title Platzi Music
        h1.subtitle Canciones que están buenísimas
        pm-player
</template>

<script>
import PmPlayer from '@/components/Player.vue'
export default {
  components:{ PmPlayer }
}
</script>

<style lang="scss" scoped>
  .strong-header {
    color: white;
  }
</style>
