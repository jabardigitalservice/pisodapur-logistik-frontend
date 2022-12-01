<template>
  <div class="d-flex flex-column align-center text-center px-4 mt-n12">
    <span class="success__title my-6">
      {{ $t('label.vaccine_save_success') }}
    </span>
    <img height="200" src="../../static/berhasil.svg" alt="success-icon">
    <div class="d-flex flex-row align-center my-6">
      <span class="success__request-id">
        {{ $t('label.request_id') }}
      </span>
      <strong class="success__id mx-5 px-3 py-1">
        {{ requestId }}
      </strong>
      <v-tooltip
        v-model="showTooltip"
        right
      >
        <template #activator="{}">
          <v-icon @click="onCopy">
            mdi-content-copy
          </v-icon>
        </template>
        ID Permohonan berhasil di salin
      </v-tooltip>
    </div>

    <strong class="success__section-title">
      {{ $t('label.verification') }}
    </strong>
    <p class="success__section-content">
      Data Anda akan diverifikasi dan diproses oleh Sub Divisi Logistik Satgas Covid-19 Jawa Barat.
    </p>

    <strong class="success__section-title">
      {{ $t('label.confirmation') }}
    </strong>
    <p class="success__section-content">
      Progress permohonan akan diinfokan secara berkala melalui email/No. WhatApp pemohon.
    </p>

    <!-- TEMPORARILY HIDDEN
    <strong class="success__section-title">
      {{ $t('label.self_track') }}
    </strong>
    <p class="success__section-content">
      Lacak proses permohonan Anda melalui
      <strong>Fitur Lacak Pengajuan Logistik Vaksin</strong>
      dengan memasukkan ID/No. HP/Email Permohonan
    </p>
    <JDSButton height="38px" @click="onTracking">
      {{ $t('label.track') }}
    </JDSButton> -->

    <strong class="success__section-title">
      Pertanyaan, Keluhan dan Kirim Surat Final
    </strong>
    <p class="success__section-content">
      Akses Hotline PIKOBAR pada nomor {{ anykWaNumber }} (Bu Anyk), {{ tikaWaNumber }} (Bu Tika), atau digital.service@jabarprov.go.id.
    </p>
    <EmoticonRating
      class="ma-10"
      @rated="(score) => { rateValue = score }"
    />
    <JDSButton height="38px" class="my-6" @click="goWhatsapp">
      {{ $t('label.admin_greeting') }}
    </JDSButton>
    <JDSButton inverted height="38px" @click="onBack">
      {{ $t('label.go_to_home_page') }}
    </JDSButton>
  </div>
</template>

<script>
import JDSButton from '@/components/Base/JDSButton'
import EmoticonRating from '@/components/EmoticonRating'
export default {
  components: {
    JDSButton,
    EmoticonRating
  },
  props: {
    requestId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      showTooltip: false,
      anykWaNumber: process.env.VUE_APP_HOTLINE_PIKOBAR_VAKSIN_ANYK,
      tikaWaNumber: process.env.VUE_APP_HOTLINE_PIKOBAR_VAKSIN_TIKA,
      rateValue: null
    }
  },
  methods: {
    onTracking() {
      this.$router.push('/tracking')
    },
    onCopy() {
      navigator.clipboard.writeText(this.requestId)
      this.showTooltip = true
      setTimeout(() => { this.showTooltip = false }, 2000)
    },
    goWhatsapp() {
      window.open(`https://wa.me/${process.env.VUE_APP_HOTLINE_PIKOBAR_VAKSIN_ANYK}`, '_blank')
    },
    async onBack() {
      await this.submitFeedbackRating()
      this.$router.push('/landing-page')
    },
    submitFeedbackRating() {
      if (this.rateValue) {
        const payload = {
          phase: 'request',
          score: this.rateValue,
          vaccine_request_id: this.requestId
        }
        this.$store.dispatch('vaccine/giveRating', payload)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.success {
  &__title {
    font-size: 26px;
    font-weight: 700;
    font-family: 'Lora', serif;
  }

  &__request-id {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
  }

  &__id {
    border-style: solid;
    border-color: #424242;
    border-radius: 8px;
    border-width: 1px;
  }

  &__section-title {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
  }

  &__section-content {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  &__btn {
    text-transform: none;
    letter-spacing: 0;
    font-family: 'Lato', serif;
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
