<template lang="pug">
  .container
    .columns
      .column.is-3.is-offset-4
        .notification(:class="modalType")
          slot(name="body") Algo está mal!
</template>
<script>
export default {
  /**
   * Usamos las props para enviar la clase que va ser dinámica
   * en base a lo que se requiera cambiará el color a verde o rojo.
   */
  props:{
    modalType:{
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .notification {
    margin: 10px;
  }
</style>
