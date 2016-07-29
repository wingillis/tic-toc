<style>
.action-bar {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.card {
  margin: 0px auto;
  min-height: 100px;
  min-width: 340px;
}

.mdl-card__supporting-text > h4 {
  margin-top: 0px;
}

#reset-button {
  padding-bottom: 2px;
}

.hider {
  width: 340px;
  z-index: 5;
  height: 15px;
  position: relative;
}

.plus-button {
  display: flex;
  position: absolute;
  top: -20px;
  left: 145px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.plus-icon {
  width: 24px;
}

h3.mdl-card__title-text {
  padding-right: 30px;
}

/*.handle {
  cursor: ns-resize;
}*/

.fade-transition {
  transition: all 0.2s ease;
  background-color: rgba(83, 109, 254, 0.8);
  height: 50px;
  width: 50px;
}

.fade-enter, .fade-leave {
  opacity: 0;
  width: 0px;
  height: 0px;
  top: 5px;
  left: 170px;
}

#edit-title {
  outline: none;
  margin-right: 40px;
}
</style>

<template lang="jade">
.hider(@mouseenter="showDiv", @mouseleave="hideDiv", :style="hiderStyle" v-if="index !== 0")
  .plus-button(:style="addButtonStyle", v-if="showAdd", transition="fade", @click="addTimer").mdl-js-button.mdl-js-ripple-effect.mdl-button--raised
    i.material-icons.plus-icon add_circle
.card.mdl-card.mdl-shadow--2dp(v-mdl, v-el:this-card)
  .mdl-card__title.handle
    input#edit-title.mdl-textfield__input(type="text", v-mdl, v-model="card.title", v-el:titput, v-if="editing", @keyup.enter="stopEdit")
    h3.mdl-card__title-text(v-else, @dblclick="edit") {{card.title}}
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

function humanizeTime(t_ms) {
  var t = t_ms / 1000
  var seconds = t % 60
  var minutes = Math.floor((t/60)) % 60
  var hours = Math.floor((t/3600)) % 60
  var time_str = 'for '
  if (hours > 0) {
    time_str = time_str + hours.toString() + ' hours '
  }
  if (minutes > 0) {
    time_str = time_str + minutes.toString() + ' minutes '
  }
  if (seconds > 0) {
    if (time_str !== 'for ' ) {
      time_str = time_str + 'and '
    }
    time_str = time_str + seconds.toString() + ' seconds'
  }
  return time_str
}

export default {
  props: ['card', 'index'],
  data () {

    // assume data is always in hh:mm:ss: 00:15:00 for 15 minutes
    var t = this.card.time
    var addButtonStyle = {
      display: "none"
    }

    var hiderStyle = {
      left: Math.floor(window.innerWidth/2 - 177) + "px"
    }

    // timeLeft is in milliseconds
    var data = {
      timeLeft: t,
      originalTime: t,
      timerRunning: false,
      timerID: null,
      showAdd: false,
      hiderStyle: hiderStyle,
      editing: false
    }
    return data
  },
  ready () {
    if (this.card.current) {
      this.$els.thisCard.scrollIntoView()
    }
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    stopEdit () {
      this.editing = false
      this.$dispatch('save-changes')
    },
    edit () {
      if(!this.timerRunning) {
        this.editing = true
        setTimeout(() => {
          this.$els.titput.focus()
        }, 200)
      }
    },
    handleResize (e) {
      this.hiderStyle = {
        left: Math.floor(window.innerWidth/2 - 177) + "px"
      }
    },
    showDiv() {
      this.showAdd = true
    },
    hideDiv() {
      this.showAdd = false
    },
    notifyDelete() {
      this.$dispatch('delete', this.index)
    },
    addTimer () {
      // move to the new-card vue and add new timer. Add timer between
      // the two where the button was clicked
      this.$dispatch('insert-card-at', this.index)
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
          this.$dispatch('soundAlarm', ()=> {
            this.$dispatch('nextTimer', this.index + 1)
          }, this.index)
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
    },
    speakStart () {
      timeStr = humanizeTime(this.timeLeft)
      var msg = new SpeechSynthesisUtterance(this.card.title + ' is beginning ' + timeStr)
      window.speechSynthesis.speak(msg)
    }
  },
  computed: {
    strTime() {
      return numeral(this.timeLeft/1000).format('00:00:00')
    }
  },
  events: {
    'into-position': function (index) {
      if (this.index === index) {
        this.$els.thisCard.scrollIntoView()
      }
    },
    'reset': function () {
      if (!this.card.current) {
        this.stop()
      }
    },
    'nextTimerChild': function () {
      if (this.card.current) {
        this.speakStart()
        this.createTimer()
        this.$els.thisCard.scrollIntoView()
      }
    }
  }
}
</script>
