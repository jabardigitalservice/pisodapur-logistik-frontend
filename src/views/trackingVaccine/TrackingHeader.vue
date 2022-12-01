<template>
  <section
    :class="{
      'tracking__header--grey d-flex mt-10': true,
      'flex-row justify-space-between': $vuetify.breakpoint.mdAndUp,
      'flex-column align-center': $vuetify.breakpoint.smAndDown
    }"
  >
    <img
      src="/img/icons/vaccine-track-left.svg"
      width="139"
      height="128"
      alt="vaccine-track"
      :class="{
        'mb-6': $vuetify.breakpoint.smAndDown
      }"
    >
    <div class="d-flex flex-column align-center justify-center">
      <span class="tracking__vaccination-track__title text-center">
        Lacak Permohonan Logistik
      </span>
      <p align="center" :class="{ 'tracking__vaccination-track__text': true, 'tracking__vaccination-track__text--large': $vuetify.breakpoint.mdAndUp }">
        Anda dapat mengetahui status tindak lanjut permohonan logistik yang telah diajukan melalui aplikasi Pisodapur Logistik
      </p>
    </div>
    <img
      v-if="$vuetify.breakpoint.mdAndUp"
      src="/img/icons/vaccine-track-right.svg"
      width="139"
      height="128"
      alt="vaccine-track"
    >
  </section>
</template>

<style lang="scss" scoped>
@import "@/styles/scss/pages/vaccineTracking.scss";
</style>
