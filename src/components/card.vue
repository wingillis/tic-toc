<style>
.action-bar {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.card {
  margin: 10px;
  min-height: 100px;
}

.mdl-card__supporting-text > h4 {
  margin-top: 0px;
}
</style>

<template lang="jade">
.card.mdl-card.mdl-shadow--2dp(v-mdl)
  .mdl-card__title
    h3.mdl-card__title-text {{card.title}}
  .mdl-card__menu
    button.mdl-button.mdl-js-button.mdl-button--icon(v-mdl, @click="notifyDelete")
      i.material-icons delete
  .mdl-card__supporting-text
    h4 Time left: {{card.time}}
  .mdl-card__actions.mdl-card--border
    .action-bar(v-if="card.current")
      button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--accent(v-mdl, @click="pause") Pause
      .mdl-layout-spacer
      button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--raised.mdl-button--colored(v-mdl) Cancel
    div(v-else)
      button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--raised.mdl-button--colored(v-mdl, @click="start") Start
</template>

<script>
import numeral from 'numeral'

function msToString(time) {

}

export default {
  props: ['card', 'index'],
  data () {

    // assume data is always in hh:mm:ss: 00:15:00 for 15 minutes
    var t = numeral().unformat(this.card.time) * 1000
    // timeLeft is in milliseconds
    var data = {
      timeLeft: t,
      timerRunning: false
    }
    return data
  },
  ready () {
    if (this.card.current) {
      this.$el.scrollIntoView(false)
    }
  },
  methods: {
    notifyDelete() {
      this.$dispatch('delete', this.index)
    },
    start () {
      this.card.current = true
      this.$dispatch('start', this.index)
      // start a 1s timer and store the timer id
    },
    stop () {
      // stop the timer function
    },
    pause () {
      this.stop() // stop the timer function
      // pause now true
    },
    cancel () {
      this.stop()
      // pause is now false
      // reset amt of time to finish
    }
  },
  computed: {

  }
}
</script>
