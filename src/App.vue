<template>
  <div id="app">
    <h3 style="text-align: center; margin-top: 8px; margin-bottom: 8px">Tic - Toc</h3>
    <hr>
    <div id="card-holder" style="margin: 0px auto;">
      <div class="clear-button">
        <button class="clear-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent" @click="clearAll">Clear all</button>
      </div>
      <!-- Render all the timers created so far -->
      <card v-for="(index, card) in cards" :card="card" :index="index" ></card>
    </div>
    <new-card></new-card>
  </div>
</template>

<script>
import Card from './components/card.vue'
import NewCard from './components/new-card.vue'
// provides good time formatting support
import numeral from 'numeral'
// used to make desktop notifications at timer end
var notify = require('notifyjs')['default']

var storage = window.sessionStorage
// for dev
// var cards = [
//   {
//     title: 'Task 1',
//     time: 3000,
//     current: false,
//     position: 0
//   },
//   {
//     title: 'Task 2',
//     time: 4000,
//     current: false,
//     position: 1
//   },
//   {
//     title: 'Task 3',
//     time: 5000,
//     current: false,
//     position: 2
//   }
// ]
var cards = []
if (storage.cards != null) {
  cards = JSON.parse(storage.cards)
}

export default {
  components: {
    Card,
    NewCard
  },
  data () {
    return {
      cards: cards,
      paused: null,
      audio: document.getElementById('alarmAudio')
    }
  },
  ready () {
    if (notify.isSupported()) {
      notify.requestPermission()
    }
  },
  methods: {
    clearAll () {
      this.cards = []
      storage.cards = JSON.stringify(this.cards)
    }
  },
  events: {
    'delete': function(index) {
      // remove at index, and only remove 1 entry
      this.cards.splice(index,1)
      storage.cards = JSON.stringify(this.cards)
    },
    'add': function(card) {
      if (this.cards === []) {
        card.position = 0
      } else {
        card.position = this.cards.length
      }

      this.cards.push(card);

      storage.cards = JSON.stringify(this.cards)
    },
    'insert-card-at': function(index) {
      this.$broadcast('add-at-index', index)
    },
    'new-card-at-index': function(card, index) {
      this.cards.splice(index, 0, card)
      this.cards.map((card, index) => {
        card.position = index
        this.cards.$set(index, card)
      })
      storage.cards = JSON.stringify(this.cards)
    },
    'start': function(index) {
      this.cards = this.cards.map((card, idx) => {
        card.current = false
        if (idx === index) {
          card.current = true
          document.title = card.title
        }
        return card
      })
      this.$broadcast('reset')
    },
    'nextTimer': function (index) {
      if (index < this.cards.length) {
        this.$emit('start', index)
        this.$broadcast('nextTimerChild')
      } else {
        // nothing to do
      }
    },
    'soundAlarm': function (func, cardIndex) {
      var card = this.cards[cardIndex]
      var nextTimer = "get ready for next timer: "
      if (this.cards.length > (cardIndex+1)) {
        nextTimer = nextTimer + this.cards[cardIndex+1].title
      } else {
        nextTimer = "No additional timers"
      }
      new notify(card.title, {
        body: nextTimer
      }).show()
      this.audio.play().then(() => {
        this.paused = this.audio.paused
        setTimeout(() => {
          this.audio.pause()
          this.audio.currentTime = 0
          func()
        }, 1200)
      })
    }
  }
}
</script>

<style>
.clear-button {
  margin: 0px auto;
  display: flex;
  padding-bottom: 15px;
}

#card-holder {
  position: relative;
}
</style>
