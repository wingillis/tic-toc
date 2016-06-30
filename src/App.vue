<template>
  <div id="app">
    <h4 style="text-align: center;">Timer Management System</h4>
    <hr>
    <card v-for="(index, card) in cards" :card="card" :index="index"></card>
    <new-card></new-card>
  </div>
</template>

<script>
import Card from './components/card.vue'
import NewCard from './components/new-card.vue'
import numeral from 'numeral'

var cards = [
  {
    title: 'Task 1',
    time: '00:15:00',
    current: false
  },
  {
    title: 'Task 2',
    time: '00:05:00',
    current: false
  }
]

export default {
  components: {
    Card,
    NewCard
  },
  data () {
    return {cards: cards}
  },
  events: {
    'delete': function(index) {
      this.cards.splice(index);
    },
    'add': function(card) {
      this.cards.push(card);
    },
    'start': function(index) {
      this.cards = this.cards.map((card, idx) => {
        card.current = false
        if (idx == index) {
          card.current = true
        }
        return card
      })
      this.$broadcast('reset')
    }
  }
}
</script>

<style>

</style>
