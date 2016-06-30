<template>
  <div id="app">
    <h4 style="text-align: center;">Timer Management System</h4>
    <hr>
    <div v-sortable:cards="{animation: 250, handle: '.handle'}" style="margin: 0px auto;">
      <card v-for="(index, card) in cards" :card="card"></card>
    </div>
    <new-card></new-card>
  </div>
</template>

<script>
import Card from './components/card.vue'
import NewCard from './components/new-card.vue'
import numeral from 'numeral'

// for dev
// var cards = [
//   {
//     title: 'Task 1',
//     time: '00:00:10',
//     current: false,
//     position: 0
//   },
//   {
//     title: 'Task 2',
//     time: '00:00:05',
//     current: false,
//     position: 1
//   },
//   {
//     title: 'Task 3',
//     time: '00:00:07',
//     current: false,
//     position: 2
//   }
// ]
var cards = []

export default {
  components: {
    Card,
    NewCard
  },
  data () {
    return {
      cards: cards,
      audio: new Audio('dist/alarm.opus')
    }
  },
  events: {
    'delete': function(card) {
      // remove at index, and only remove 1 entry
      this.cards.$remove(card)
      this.cards = this.cards.map((card, index) => {
        card.position = index
        return card
      })
    },
    'add': function(card) {
      card.position = this.cards.length
      this.cards.push(card);
    },
    'start': function(index) {
      this.cards = this.cards.map((card) => {
        card.current = false
        if (card.position == index) {
          card.current = true
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
        console.log('Timers over')
        // say that the timer is over
      }
    },
    'soundAlarm': function (func) {
      this.audio.play()
      setTimeout(() => {
        this.audio.pause()
        this.audio.currentTime = 0
        func()
      }, 1200)
    }
  }
}
</script>

<style>

</style>
