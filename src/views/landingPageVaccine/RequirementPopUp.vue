<template>
  <div class="requirement d-flex flex-column pa-6">
    <div class="d-flex flex-row justify-space-between align-center mb-6">
      <span class="requirement__title">
        {{ $t('label.request_requirement') }}
      </span>
      <v-icon
        right
        dark
        color="#757575"
        @click="$emit('close')"
      >
        mdi-close
      </v-icon>
    </div>

    <!-- Header -->
    <div class="requirement__header d-flex flex-row justify-space-between pa-6 mb-6">
      <div class="requirement__header__content d-flex flex-column justify-space-between">
        <span class="requirement__header__content__title">
          Dokumen yang Disiapkan
        </span>
        <div class="d-flex flex-column">
          <span class="requirement__header__content__title__text d-flex flex-row align-center">
            <img
              src="/img/icons/check-white.svg"
              alt="check"
              class="mr-2"
            >
            Surat permohonan yang ditandatangani oleh pimpinan
          </span>
          <span class="requirement__header__content__title__text d-flex flex-row align-center">
            <img
              src="/img/icons/check-white.svg"
              alt="check"
              class="mr-2"
            >
            Foto E-KTP/Kartu Pegawai (admin/PIC) pemohon
          </span>
        </div>
      </div>
      <img src="/img/icons/icon-stamp.svg" alt="stamp">
    </div>

    <!-- Check Stock -->
    <div class="requirement__stock">
      <img
        src="/img/injection.svg"
        alt="injection"
        class="mr-8"
      >
      <div class="d-flex flex-column justify-space-between">
        <p class="requirement__stock__text">
          Untuk mengetahui jumlah vaksin yang tersedia silakan cek Stock Vaksin dengan klik di bawah ini
        </p>
        <JDSButton
          height="42px"
          width="166px"
          @click="$emit('showStock')"
        >
          Cek Stock Vaksin
          <v-icon
            right
            dark
          >
            mdi-arrow-right
          </v-icon>
        </JDSButton>
      </div>
    </div>

    <!-- Detail Title -->
    <h1 class="requirement__detail__title">
      {{ $t('label.request_letter_detail') }}
    </h1>
    <span class="requirement__detail__text mb-6">
      {{ $t('label.request_letter_requirements') }}
    </span>

    <!-- Instance Requirements -->
    <div
      v-for="requirement in listRequirements"
      :key="requirement.title"
      class="requirement__instance d-flex flex-column pa-6 mb-6"
    >
      <span class="requirement__instance__title mb-4">
        {{ requirement.title }}
      </span>
      <div class="d-flex flex-column mb-4">
        <span
          v-for="item in requirement.items"
          :key="item"
          class="requirement__instance__text d-flex flex-row align-center mb-2"
        >
          <img
            src="/img/icons/check-green.svg"
            alt="check"
            class="mr-2"
          >
          {{ item }}
        </span>
      </div>
      <v-btn
        depressed
        height="42px"
        min-width="0px"
        max-width="200px"
        class="requirement__btn requirement__btn__inverted d-flex green-dark--text py-3 px-6"
        :href="requirement.downloadLink"
        target="_blank"
      >
        {{ $t('label.download_letter_template') }}
        <v-icon
          right
          dark
          class="ml-2 ml-0"
        >
          mdi-open-in-new
        </v-icon>
      </v-btn>
    </div>

    <v-btn
      depressed
      height="42px"
      min-width="0px"
      class="requirement__btn green-dark white--text py-3 px-6"
      @click="onNext"
    >
      {{ $t('label.request_logistic') }}
      <v-icon
        right
        dark
      >
        mdi-arrow-right
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    JDSButton
  },
  data() {
    return {
      listRequirements: [
        {
          title: 'Dinkes, TNI, dan POLRI',
          items: [
            'Surat ditujukan kepada Dinas Kesehatan Provinsi Jawa Barat',
            'Memuat stok vaksin & logistik penunjang vaksin terkini di Kota/Kabupaten'
          ],
          downloadLink: 'https://drive.google.com/uc?export=download&id=1JpuVm6wnKBEODwINQKUBstMIUQAB2Rre'
        },
        {
          title: 'Instansi Non Dinkes, TNI, dan POLRI',
          items: [
            'Sasaran (lansia, karyawan, pekerja transportasi, sekolah)',
            'Jumlah yang dimohonkan (orang)',
            'Waktu penyelenggaraan acara',
            'Lokasi penyelenggaraan',
            'Tenaga Kesehatan yang terlibat',
            'Nama penanggungjawab dari instansi yang terlibat',
            'Nomor telepon',
            'Cap dan tanda tangan basah'
          ],
          downloadLink: 'https://drive.google.com/uc?export=download&id=1Ds0xrCfk2LlKDzEpUZdZm0BVP2-F9dB7'
        }
      ]
    }
  },
  methods: {
    onNext() {
      this.$router.push({ path: '/form-pemohon', query: { type: 'vaksin' }})
    }
  }
}
</script>

<style lang="scss" scoped>
.requirement {
  background-color: white;

  &__title {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #424242;
  }

  &__header {
    background-color: #008444;
    border-radius: 8px;

    &__content {

      &__title {
        font-family: 'Lora', serif;
        font-size: 24px;
        font-weight: 700;
        color: white;

        &__text {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          color: white;
        }
      }
    }
  }

  &__stock {
    display: flex;
    flex-direction: row;
    background: #FAFAFA;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 32px;

    &__text {
      font-family: 'Roboto', serif;
      font-weight: 500;
      font-size: 16px;
      color: #424242;
    }
  }

  &__detail {
    &__title {
      font-family: 'Lora', serif;
      font-size: 28px;
      font-weight: 700;
      color: #9E9E9E;
    }

    &__text {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      color: #757575;
    }
  }

  &__instance {
    background-color: #FAFAFA;
    border-radius: 8px;

    &__title {
      font-family: 'Roboto', sans-serif;
      font-weight: 900;
      font-size: 16px;
    }

    &__text {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      color: #424242;
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
