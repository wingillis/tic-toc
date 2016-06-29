<style>
#timer-input {
  margin: 10px;
  min-height: 100px;
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
  .mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label(v-mdl)
      input#input-title.mdl-textfield__input(type="text", v-mdl)
      label.mdl-textfield__label(for='input-title', v-mdl) Title
  .mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label(v-mdl)
      input#input-title.mdl-textfield__input(type="text", v-mdl)
      label.mdl-textfield__label(for='input-title', v-mdl) Time
  .mdl-card__actions.mdl-card--border
    button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--primary.mdl-button--raised(v-mdl) Add
</template>

<script>

</script>
