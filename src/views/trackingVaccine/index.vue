<template>
  <div
    :class="{
      'tracking': true,
      'px-4': $vuetify.breakpoint.smAndDown
    }"
  >
    <div>
      <VaccineHeader />
      <TrackingHeader />
      <h1 class="tracking__title mb-6">Isi Permohonan Di Bawah</h1>

      <!-- Form Input -->
      <ValidationObserver ref="form">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          name="ID/No. HP/Email Permohonan"
        >
          <JDSTextField
            v-model="listQuery.search"
            label="ID/No. HP/Email Permohonan"
            sub-label="*ID permohonan didapatkan setelah Anda melakukan permohonan"
            placeholder="Tulis ID/No. HP/Email Permohonan"
            :error-messages="errors"
            :hide-details="errors.length === 0"
            @keyup.enter.native="onSearch"
          />
        </ValidationProvider>
      </ValidationObserver>

      <!-- Action Button -->
      <div
        :class="{
          'd-flex': true,
          'flex-row justify-space-between mt-10 mb-15': $vuetify.breakpoint.mdAndUp,
          'flex-column-reverse mt-6 mb-10': $vuetify.breakpoint.smAndDown
        }"
      >
        <JDSButton
          inverted
          height="42px"
          :width="$vuetify.breakpoint.mdAndUp ? '48%' : '100%'"
          :class="{ 'mt-2': $vuetify.breakpoint.smAndDown }"
          @click="$router.push('/landing-page')"
        >
          Kembali ke Menu Utama
        </JDSButton>
        <JDSButton
          height="42px"
          :width="$vuetify.breakpoint.mdAndUp ? '48%' : '100%'"
          @click="onSearch"
        >
          Lacak
        </JDSButton>
      </div>

      <!-- Result -->
      <JDSTable
        v-if="isSearched && $vuetify.breakpoint.mdAndUp"
        :headers="headers"
        :items="listVaccine"
      >
        <template v-slot:item-prop="{ item, index }">
          <tr>
            <td>{{ getTableRowNumbering(index, listQuery.page, listQuery.limit) }}</td>
            <td>{{ item?.created_at ? $moment(item.created_at).format('D MMMM YYYY') : '-' }}</td>
            <td>{{ item?.applicant?.letter?.application_letter_number || '-' }}</td>
            <td>{{ item?.agency_name || '-' }}</td>
            <td>{{ item?.master_faskes_type.name || '-' }}</td>
            <td>{{ item?.applicant.applicant_name || '-' }}</td>
            <td>
              <JDSButton inverted height="25px" @click="onDetail(item.id)">
                {{ $t('label.detail') }}
              </JDSButton>
            </td>
          </tr>
        </template>
      </JDSTable>
      <div v-for="(item, index) in listVaccine" v-else-if="isSearched" :key="item.id">
        <ResultCard :index="getTableRowNumbering(index, listQuery.page, listQuery.limit)" :data="item" />
      </div>
      <pagination
        v-if="$vuetify.breakpoint.mdAndUp"
        :total="pagination.totalPage"
        :total-data="pagination.totalData"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :on-next="fetchData"
        :page-sizes="[5, 10]"
      />
      <JDSPagination
        v-else
        :key="pagination.totalPage"
        :init-page="listQuery.page"
        :total-page="pagination.totalPage"
        :page.sync="listQuery.page"
        @onPrev="fetchData"
        @onNext="fetchData"
      />
    </div>
    <VaccineFooter class="mt-10" />
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { getTableRowNumbering, filterQuery } from '@/helpers/tableDisplay'
import VaccineHeader from '@/components/requestVaccine/Header'
import VaccineFooter from '@/components/requestVaccine/Footer'
import JDSTextField from '@/components/Base/JDSTextField'
import JDSButton from '@/components/Base/JDSButton'
import JDSTable from '@/components/Base/JDSTable'
import JDSPagination from '@/components/JDSPagination'
import TrackingHeader from './TrackingHeader'
import ResultCard from './ResultCard'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    VaccineHeader,
    VaccineFooter,
    JDSTextField,
    JDSButton,
    JDSTable,
    JDSPagination,
    TrackingHeader,
    ResultCard
  },
  data() {
    return {
      listVaccine: [],
      headers: [
        { text: 'No', sortable: false },
        { text: 'Tanggal Permohonan', sortable: false },
        { text: 'Nomor Surat', sortable: false },
        { text: 'Nama Instansi', sortable: false },
        { text: 'Jenis Instansi', sortable: false },
        { text: 'Pemohon', sortable: false },
        { text: 'Aksi', sortable: false }
      ],
      pagination: {
        totalPage: 0,
        totalData: 0
      },
      listQuery: {
        search: this.$route.query?.search || '',
        page: parseInt(this.$route.query?.page || 1),
        limit: parseInt(this.$route.query?.limit || 5)
      }
    }
  },
  computed: {
    isSearched() {
      return this.listVaccine.length > 0
    }
  },
  async mounted() {
    if (this.listQuery.search !== '') {
      this.fetchData()
    }
  },
  methods: {
    getTableRowNumbering,
    filterQuery,
    async onSearch() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        this.listQuery.page = 1
        // await this.fetchData(true)
        this.getDataTracking()
      } else {
        return
      }
    },
    onDetail(id) {
      this.$router.push(`/tracking/${id}`)
    },
    async fetchData(isReplaceQuery = false) {
      const res = await this.$store.dispatch('tracking/getTrackingVaccine', this.listQuery)
      this.listVaccine = res.data
      this.pagination.totalPage = res.meta.last_page
      this.pagination.totalData = res.meta.total
      if (isReplaceQuery) {
        this.$router.replace({
          query: {
            ...this.filterQuery(this.listQuery)
          }
        })
      }
    },
    // func tracking alkes
    async getDataTracking(page) {
      // const valid = await this.$refs.observer.validate()
      // if (!valid) {
      //   return
      // }

      // this.listQueryTable.page = page ?? this.listQueryTable.page
      const response = await this.$store.dispatch('logistics/getTrackingLogistic', this.listQuery)
      console.log(response.data.application)
      this.listVaccine = response.data.application
      this.clicked = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/scss/pages/vaccineTracking.scss";
</style>
