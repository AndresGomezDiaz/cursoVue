<template lang="pug">
  section.hero.is-primary.is-medium
    .hero-head
      nav.navbar
        .container
          .navbar-brand
            .navbar-item
              strong.strong-header 📺 Platzi Music
            span.navbar-burger.burger(data-target="navbarMenuPlatziMusic")
              span
              span
              span
          .navbar-menu#navbarMenuPlatziMusic
            .navbar-end
              router-link.navbar-item(to="/") Buscar
              router-link.navbar-item(to="about") Nosotros
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
