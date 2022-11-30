<template>
  <div class="d-flex flex-column align-center">
    <img
      src="/img/logo_pemprov.png"
      alt="under-construction"
      width="250px"
      height="250px"
      class="mb-5"
    >
    <h1 class="under-development__text">
      {{ $t('label.welcome') }}
    </h1>
    <h2 class="under-development__text">Jabar Digital Service</h2>
  </div>
</template>

<style lang="scss" scoped>
.under-development {
  &__text {
    font-family: 'Lora', sans-serif;
    font-size: 21px;
    color: #069550;
    font-weight: bold;
  }
}
</style>
