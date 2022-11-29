<template>
  <div class="d-flex flex-column align-center mt-12">
    <img
      src="/img/under-construction.svg"
      alt="under-construction"
      width="363px"
      height="229px"
      class="mb-8"
    >
    <h1 class="under-development__text">
      {{ $t('label.under_development_feature') }}
    </h1>
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
