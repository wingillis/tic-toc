import Vue from 'vue'
import App from './App.vue'
import Sortable from 'sortablejs'

Vue.directive('mdl', {
  bind() {
    componentHandler.upgradeElement(this.el);
  }
})

Vue.directive('sortable', function (val) {
  var ctx = this
  var key = this.arg // directive argument
  val = val || {}
  val.onUpdate = function (e) {
    var vm = ctx.vm // reference to the vue instance
    var arr = vm[key] // in my case this is the cards list
    var target = arr[e.oldIndex]
    arr.$remove(target)
    arr.splice(e.newIndex, 0, target)
    arr = arr.map((obj, index) => {
      obj.position = index
      return obj
    })
  }
  Sortable.create(this.el, val)
})

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
