<style>
#timer-input {
  margin: 10px auto;
  min-height: 100px;
  min-width: 340px;
}

#timer-input > .mdl-textfield  {
  margin-left: 16px;
  margin-right: 16px;
}
</style>


<template lang="jade">
#timer-input.mdl-shadow--2dp.mdl-card
  .mdl-card__title
    h5.mdl-card__title-text Add timer
  .mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label(v-mdl, v-el:title)
      input#input-title.mdl-textfield__input(type="text", v-mdl, v-model="title", v-el:titput)
      label.mdl-textfield__label(for='input-title', v-mdl) Title
  .mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label(v-mdl, v-el:time)
      input#input-title.mdl-textfield__input(type="text", v-mdl, v-model="time", @keyup.enter="addCard")
      label.mdl-textfield__label(for='input-title', v-mdl) Time (0h 0m 0s)
  .mdl-card__actions.mdl-card--border
    button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--primary.mdl-button--raised(v-mdl, @click="addCard") Add
</template>

<script>

function str2ms(arr) {
  function parse(ind) {
    var t = arr[ind]
    if (t != null) {
      return parseInt(t.substring(0, t.length-1))
    } else {
      return 0
    }
  }
  var hours = parse(1)
  var minutes = parse(2)
  var seconds = parse(3)
  return (((hours * 60) + minutes) * 60 + seconds) * 1000 // ms
}

export default {
  data () {
    var data = {
      title: '',
      time: ''
    }
    return data;
  },
  methods: {
    addCard() {
      var re = /([0-9]+h)?\s*([0-9]+m)?\s*([0-9]+s)?$/
      var arr = re.exec(this.time)
      var card = {
        title: this.title,
        time: str2ms(arr),
        current: false,
        position: 0
      }
      this.$dispatch('add', card)

      this.title = ''
      this.time = ''
      // remove the class that causes the label to go above the input
      this.$els.title.className = this.$els.title.className.replace('is-dirty', '')
      this.$els.time.className = this.$els.time.className.replace('is-dirty', '')
      setTimeout(() => {
        this.$els.titput.focus()
      }, 200)
    }
  }
}
</script>
