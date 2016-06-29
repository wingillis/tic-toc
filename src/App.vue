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

var cards = [
  {
    title: 'Task 1',
    time: 600,
    current: true
  },
  {
    title: 'Task 2',
    time: 500,
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
    }
  }
}
</script>

<style>

</style>
