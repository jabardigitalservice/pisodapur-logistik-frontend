<template>
  <div class="landing-page">
    <div>
      <!-- Header -->
      <VaccineHeader />

      <!-- Logistic Request -->
      <section class="landing-page__main-section py-5">
        <v-row class="align-center">
          <v-col
            order-sm="last"
            order-md="first"
            cols="12"
            sm="12"
            md="6"
            :class="{
              'd-flex flex-column': true,
              'align-center': $vuetify.breakpoint.smAndDown
            }"
          >
            <h1
              :class="{
                'landing-page__title mb-6': true,
                'text-center': $vuetify.breakpoint.smAndDown
              }"
            >
              {{ $t('label.vaccine_needs_request') }}
            </h1>
            <p
              :class="{
                'landing-page__text mb-6': true,
                'text-center': $vuetify.breakpoint.smAndDown
              }"
            >
              Portal ini berfungsi untuk mendata permohonan logistik yang diperuntukkan bagi
              <strong class="green-dark--text">korban bencana alam di Kab.Cianjur</strong>
            </p>
            <v-btn
              depressed
              height="44px"
              min-width="0px"
              max-width="176px"
              class="landing-page__btn d-flex green-dark white--text py-3 px-6"
              @click="onRequest"
            >
              {{ $t('label.request_logistic') }}
              <v-icon
                right
                dark
              >
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="12" md="6" class="d-flex justify-center">
            <img
              width="450px"
              height="200px"
              src="@/static/home_logistik_2.png"
              alt="vaccination"
            >
          </v-col>
        </v-row>
      </section>

      <!-- Vaccine Tracking -->
      <section class="landing-page__main-section--grey d-flex flex-row justify-space-between">
        <img src="/img/icons/vaccine-track-left.svg" alt="vaccine track">
        <div class="d-flex flex-column align-center">
          <span class="landing-page__vaccination-track__title">Lacak Pengajuan Logistik</span>
          <p align="center" class="landing-page__vaccination-track__text">
            Bingung permohonan Anda sudah sampai mana?
            <br>
            Yuk, cari tahu sejauh mana tahapan permohonan logistik Anda.
          </p>
          <v-btn
            depressed
            height="42px"
            min-width="0px"
            max-width="167px"
            class="landing-page__btn landing-page__btn__inverted d-flex green-dark--text py-3 px-6"
            @click="onTracking"
          >
            {{ $t('label.track_request') }}
          </v-btn>
        </div>
        <img src="/img/icons/vaccine-track-right.svg" alt="vaccine track">
      </section>
    </div>
    <VaccineFooter />

    <v-dialog v-model="showRequirement" max-width="800px">
      <RequirementPopUp
        @showStock="onShowStock"
        @close="showRequirement = false"
      />
    </v-dialog>
    <v-dialog v-model="showStock" max-width="800px">
      <StockPopUp />
    </v-dialog>
  </div>
</template>

<script>
import VaccineHeader from '@/components/requestVaccine/Header.vue'
import VaccineFooter from '@/components/requestVaccine/Footer.vue'
import RequirementPopUp from './RequirementPopUp.vue'
import StockPopUp from './StockPopUp.vue'
export default {
  components: {
    VaccineHeader,
    VaccineFooter,
    RequirementPopUp,
    StockPopUp
  },
  data() {
    return {
      showRequirement: false,
      showStock: false
    }
  },
  methods: {
    onRequest() {
      // Temporary hidden
      // this.showRequirement = true
      this.$router.push({ path: '/form-pemohon' })
    },
    onTracking() {
      this.$router.push('/tracking')
    },
    onShowStock() {
      this.showRequirement = false
      this.showStock = true
    }
  }
}
</script>

<style lang="scss" scoped>
.landing-page {
  padding: 0 150px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  &__title {
    font-family: 'Lora';
    font-weight: 700;
    font-size: 40px;
    color: #424242;
  }

  &__text {
    font-family: 'Roboto';
    font-size: 16px;
  }

  &__main-section {
    margin: 150px 0 100px 0;

    &--grey {
      background-color: #FAFAFA;
      border-radius: 8px;
      padding: 24px 40px;
    }
  }

  &__vaccination-track {
    &__title {
      font-family: 'Roboto';
      font-size: 21px;
      font-weight: 500;
      color: #424242;
    }

    &__text {
      font-family: 'Roboto';
      font-size: 16px;
      color: #757575;
    }
  }

  &__btn {
    text-transform: none;
    letter-spacing: 0;
    font-family: 'Lato';
    font-weight: 700;
    font-size: 14px;

    &__inverted {
      border-color: #069550;
      border-style: solid;
      border-width: 1px;
    }
  }
}
</style>
