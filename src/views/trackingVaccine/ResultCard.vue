<template>
  <div class="result">
    <v-row>
      <v-col class="result__column result__column--header" cols="6">No.</v-col>
      <v-col class="result__column" cols="6">{{ index }}</v-col>
    </v-row>
    <v-row>
      <v-col class="result__column result__column--header" cols="6">Tanggal Permohonan</v-col>
      <v-col class="result__column" cols="6">{{ data?.created_at || '-' }}</v-col>
    </v-row>
    <v-row>
      <v-col class="result__column result__column--header" cols="6">Nomor Surat</v-col>
      <v-col class="result__column" cols="6">{{ data?.applicant?.letter?.application_letter_number || '-' }}</v-col>
    </v-row>
    <v-row>
      <v-col class="result__column result__column--header" cols="6">Nama Instansi</v-col>
      <v-col class="result__column" cols="6">{{ data?.agency_name || '' }}</v-col>
    </v-row>
    <v-row>
      <v-col class="result__column result__column--header" cols="6">Jenis Instansi</v-col>
      <v-col class="result__column" cols="6">{{ data?.master_faskes_type?.name || '' }}</v-col>
    </v-row>
    <v-row>
      <v-col class="result__column result__column--header" cols="6">Pemohon</v-col>
      <v-col class="result__column" cols="6">{{ data?.applicant?.applicant_name || '' }}</v-col>
    </v-row>
    <v-row>
      <v-col class="result__column result__column--header" cols="6">Aksi</v-col>
      <v-col class="result__column" cols="6"><JDSButton inverted height="34px" @click="onDetail(data.id)">
        {{ $t('label.detail') }}
      </JDSButton></v-col>
    </v-row>
  </div>
</template>

<script>
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    JDSButton
  },
  props: {
    index: {
      type: [Number, String],
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onDetail(id) {
      this.$router.push(`/tracking/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  border-color: #f2f2f2;
  border-width: 1px;
  border-top-style: solid;

  &__column {
    display: flex;
    flex-direction: column;
    width: 50%;

    &--header {
      font-weight: 700;
      color: #069550;
    }
  }
}
</style>
