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
      button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--accent(v-mdl) Pause
      .mdl-layout-spacer
      button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--raised.mdl-button--colored(v-mdl) Cancel
    div(v-else)
      button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--raised.mdl-button--colored(v-mdl) Start
</template>

<script>
export default {
  props: ['card', 'index'],
  ready () {
    if (this.card.current) {
      this.$el.scrollIntoView(false);
    }
  },
  methods: {
    notifyDelete() {
      this.$dispatch('delete', this.index);
    }
  }
}
</script>
