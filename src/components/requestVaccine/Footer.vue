<template>
  <div
    :class="{
      'footer d-flex flex-row py-4 justify-center': true,
      'footer--large': $vuetify.breakpoint.mdAndUp,
      'footer--small': $vuetify.breakpoint.smAndDown
    }"
  >
    Copyright © Pisodapur Logistik 2022. All rights reserved
  </div>
</template>

<style lang="scss" scoped>
.footer {
  background-color: #006430;
  color: white;
  font-family: 'Lato';
  font-weight: 700;
  font-size: 11px;
  line-height: 18px;
  width: 100vw;

  &--large {
    margin: 0 -150px;
  }

  &--small {
    margin: 0 -20px;
  }
}
</style>
