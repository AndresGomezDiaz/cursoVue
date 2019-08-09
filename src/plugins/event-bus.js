const eventBus = {}
//PAra un pluguin necesitamos instaurar una funcion install
eventBus.install = function(Vue) {
  Vue.prototype.$bus = new Vue()
  //Es importante hacerlo con el signo de pesos para identificar que es un metodo nativo de Vue
}
/**
 * Se creo para emit y on sin importar la relación entre ellos
 */
export default eventBus