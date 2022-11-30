<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row justify-space-between py-5">
      <img src="/img/icons/pengajuan-logistik.svg" alt="pengajuan-logistik">
      <JDSButton height="38px" @click="onInfoClick">
        <v-icon v-if="$vuetify.breakpoint.mdAndUp" right dark class="mr-2 ml-0">
          mdi-alert-circle
        </v-icon>
        {{ $t('label.ask_us') }}
      </JDSButton>
    </div>
    <hr class="my-0">
  </div>
</template>

<script>
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    JDSButton
  },
  methods: {
    onInfoClick() {
      window.open(`https://wa.me/${process.env.VUE_APP_HOTLINE_PISODAPUR_LOGISTIC}`, '_blank')
    }
  }
}
</script>
