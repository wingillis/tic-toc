import Vue from 'vue'
import App from './App.vue'

Vue.directive('mdl', {
  bind() {
    componentHandler.upgradeElement(this.el);
  }
})

Vue.config.devtools = true

// Vue.use(VueList)

// Vue.directive('sortable', function (val) {
//   var ctx = this
//   var key = this.arg // directive argument
//   val = val || {}
//   val.onUpdate = function (e) {
//     // e.item.remove()
//     var vm = ctx.vm // reference to the vue instance
//     var arr = vm[key].slice() // in my case this is the cards list
//     var target = arr[e.oldIndex]
//     arr.splice(e.oldIndex, 1)
//     arr.splice(e.newIndex, 0, target)
//     vm.$nextTick(function () {
//       vm[key] = arr
//     })
//     // vm[key] = arr
//   }
//   Sortable.create(this.el, val)
// })

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
