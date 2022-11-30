<template>
  <div>
    <!-- @todo: stepper mobile version (vertical) -->
    <v-stepper alt-labels>
      <v-stepper-header class="flex-nowrap">
        <v-stepper-step
          v-for="(stage) in stageOptions"
          :key="stage.value"
          :step="stageDisplay(stage.value)"
          :complete="stageDisplay(stage.value) < currentStep"
          :complete-icon="'$complete'"
        >
          <span class="text-center">
            {{ stage.text }}
          </span>
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    <!-- @todo: move action button component to detail index -->
    <div
      :class="{
        'd-flex': true,
        'flex-row justify-end mt-10 mb-15': $vuetify.breakpoint.mdAndUp,
        'flex-column mt-6 mb-10': $vuetify.breakpoint.smAndDown
      }"
    >
      <JDSButton
        inverted
        height="42px"
        :width="$vuetify.breakpoint.mdAndUp ? '222px' : '100%'"
        :class="{ 'mb-2': $vuetify.breakpoint.smAndDown }"
        @click="$router.go(-1)"
      >
        Kembali ke Hasil Pencarian
      </JDSButton>
      <JDSButton
        height="42px"
        :width="$vuetify.breakpoint.mdAndUp ? '222px' : '100%'"
        :class="{ 'ml-4': $vuetify.breakpoint.mdAndUp }"
        @click="$router.push('/landing-page')"
      >
        Kembali ke Halaman Utama
      </JDSButton>
    </div>
  </div>
</template>

<script>
import { stageOptions } from '../../archive/dropdown'
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    JDSButton
  },
  data() {
    return {
      stageOptions,
      currentStep: 0
    }
  },
  async mounted() {
    const res = await this.$store.dispatch('tracking/getTrackingVaccineDetail', this.$route.params.id)
    const status = res.data.status
    this.currentStep = this.stageDisplay(status)
  },
  methods: {
    stageDisplay(value) {
      switch (value) {
        case 'not_verified':
          return 1
        case 'verified':
          return 2
        case 'approved':
          return 3
        case 'finalized':
          return 4
        case 'integrated':
          return 5
        case 'booked':
          return 6
        case 'do':
          return 7
        case 'intransit':
          return 8
        case 'delivered':
          return 9
        default:
          return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/scss/pages/vaccineTracking.scss";
</style>
