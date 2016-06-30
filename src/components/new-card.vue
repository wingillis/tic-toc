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
      input#input-title.mdl-textfield__input(type="text", v-mdl, v-model="title")
      label.mdl-textfield__label(for='input-title', v-mdl) Title
  .mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label(v-mdl, v-el:time)
      input#input-title.mdl-textfield__input(type="text", v-mdl, v-model="time")
      label.mdl-textfield__label(for='input-title', v-mdl) Time
  .mdl-card__actions.mdl-card--border
    button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--primary.mdl-button--raised(v-mdl, @click="addCard") Add
</template>

<script>
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
      var card = {
        title: this.title,
        time: this.time,
        current: false,
        position: 0
      }
      this.$dispatch('add', card)

      this.title = ''
      this.time = ''
      // remove the class that causes the label to go above the input
      this.$els.title.className = this.$els.title.className.replace('is-dirty', '')
      this.$els.time.className = this.$els.time.className.replace('is-dirty', '')

    }
  }
}
</script>
