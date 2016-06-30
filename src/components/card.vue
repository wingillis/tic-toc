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

#reset-button {
  padding-bottom: 2px;
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
    h4 Time left: {{strTime}}
      button#reset-button.mdl-button.mdl-js-button.mdl-button--icon(v-mdl, v-if="canBeReset()", @click="resetTime")
        i.material-icons cached
  .mdl-card__actions.mdl-card--border
    .action-bar(v-if="card.current")
      button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--accent(v-mdl, @click="handleRunTimer")
        span(v-if="timerRunning") Pause
        span(v-else) Resume
      .mdl-layout-spacer
      button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--raised.mdl-button--colored(v-mdl, @click="cancel") Cancel
    div(v-else)
      button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--raised.mdl-button--colored(v-mdl, @click="start") Start
</template>

<script>
import numeral from 'numeral'

export default {
  props: ['card', 'index'],
  data () {

    // assume data is always in hh:mm:ss: 00:15:00 for 15 minutes
    var t = numeral().unformat(this.card.time) * 1000
    // timeLeft is in milliseconds
    var data = {
      timeLeft: t,
      originalTime: t,
      timerRunning: false,
      timerID: null
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
      this.createTimer()
      // start a 1s timer and store the timer id
    },
    createTimer () {
      this.timerRunning = true
      this.timerID = setInterval(()=>{
        this.timeLeft = this.timeLeft - 1000
        if (this.timeLeft < 0) {
          this.cancel()
          this.$dispatch('nextTimer', this.index + 1)
          // stop timer, reset time,
          // call next timer
        }
      }, 1000)
    },
    stop () {
      // stop the timer function
      if(this.timerID !== null) {
        clearInterval(this.timerID)
        this.timerID = null
        this.timerRunning = false
      }

    },
    handleRunTimer () {
      if (this.timerRunning) {
        this.stop()
      } else {
        this.start()
      }
    },
    cancel () {
      // stop timer, reset elapsed time to original,
      // set current to false
      this.stop()
      this.resetTime()
      this.card.current = false
    },
    canBeReset () {
      return (!this.card.current && (this.timeLeft !== this.originalTime))
    },
    resetTime () {
      this.timeLeft = this.originalTime
    }
  },
  computed: {
    strTime() {
      return numeral(this.timeLeft/1000).format('00:00:00')
    }
  },
  events: {
    'reset': function () {
      if (!this.card.current) {
        this.stop()
      }
    },
    'nextTimerChild': function () {
      if (this.card.current) {
        this.createTimer()
      }
    }
  }
}
</script>
