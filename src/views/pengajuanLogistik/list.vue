<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <span class="table-title">{{ $t('label.list_request_logistic_medic') }}</span>
      </v-card-text>
      <hr class="thin">
      <v-card-text>
        <div class="d-flex flex-row justify-space-between">
          <v-card
            outlined
            class="card-search"
            style="width: 40%"
          >
            <v-text-field
              v-model="listQuery.search"
              solo-inverted
              flat
              hide-details
              :placeholder="$t('label.search_instance_applicant')"
              prepend-inner-icon="search"
              @change="handleSearch"
            />
          </v-card>
          <div>
            <v-btn color="green" large text outlined @click="exportData()"><v-icon left>mdi-upload</v-icon> {{ $t('label.export_data') }}</v-btn>
            <v-btn class="primary ml-3" large max-width="100px" @click="showFilter = !showFilter">{{ $t('label.filter') }}
              <v-icon v-if="!showFilter" right>mdi-chevron-right</v-icon>
              <v-icon v-else right>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <hr v-if="showFilter" class="thin">
      <v-card-text v-if="showFilter">
        <v-row class="margin-top-bot-min-20-list-pengajuan-logistik">
          <v-col cols="12" md="3">
            <v-label class="title">{{ $t('label.sort') }}</v-label>
            <v-select
              v-model="listQuery.sort"
              :items="sortOption"
              solo
              item-text="label"
              item-value="value"
              :clearable="true"
              :placeholder="$t('label.sort')"
              @change="handleSearch"
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-label class="title">{{ $t('label.request_date') }}</v-label>
            <date-picker-dashboard
              :initial-start-date="listQuery.start_date"
              :initial-end-date="listQuery.end_date"
              @selected="changeDate"
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-label class="title">{{ $t('label.city_district') }}</v-label>
            <select-area-district-city
              :disabled-district="disabledDistrict"
              :district-city="districtCity"
              :city-district.sync="districtCity"
              :on-select-district-city="onSelectDistrictCity"
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-label class="title">{{ $t('label.instance_type') }}</v-label>
            <v-select
              v-model="listQuery.faskes_type"
              :items="faskesTypeList"
              solo
              item-text="name"
              item-value="id"
              :clearable="true"
              :placeholder="$t('label.select_instance_type')"
              @change="handleSearch()"
            />
          </v-col>
          <v-col cols="12" md="3" class="mt-n8">
            <v-label class="title">{{ $t('label.applicant_origin') }}</v-label>
            <v-select
              v-model="listQuery.source_data"
              :items="applicantOrigin"
              solo
              item-text="text"
              item-value="value"
              :clearable="true"
              :placeholder="$t('label.select_applicant_origin')"
              @change="handleSearch()"
            />
          </v-col>
          <v-col cols="12" md="3" class="mt-n8">
            <v-label class="title">{{ $t('label.completeness') }}</v-label>
            <v-select
              v-model="listQuery.completeness"
              :items="completeStatus"
              solo
              item-text="text"
              item-value="value"
              :clearable="true"
              :placeholder="$t('label.completeness_placeholder')"
              @change="handleSearch()"
            />
          </v-col>
          <v-col cols="12" md="3" class="mt-n8">
            <v-label class="title">{{ $t('label.urgency_level') }}</v-label>
            <v-select
              v-model="listQuery.is_urgency"
              :items="urgencyStatus"
              solo
              item-text="text"
              item-value="value"
              :clearable="true"
              :placeholder="$t('label.input_urgency_level')"
              @change="handleSearch()"
            />
          </v-col>
          <v-col v-if="isArchive" cols="12" md="3" class="mt-n8">
            <v-label class="title">{{ 'Status Tindak Lanjut' }}</v-label>
            <v-select
              v-model="listQuery.status_request"
              :items="statusOptions"
              solo
              item-text="text"
              item-value="value"
              :clearable="true"
              placeholder="Pilih Status Tindak Lanjut"
              @change="handleSearch()"
            />
          </v-col>
          <v-col v-else cols="12" md="3" class="mt-n8">
            <v-label class="title">{{ $t('label.instance_reference_status') }}</v-label>
            <v-select
              v-model="listQuery.is_reference"
              :items="referenceFaskes"
              solo
              item-text="text"
              item-value="value"
              :clearable="true"
              :placeholder="$t('label.instance_reference_status_placeholder')"
              @change="handleSearch()"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <hr class="thin">
      <v-row>
        <v-col auto>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.request_date').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.instance_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.city_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.contact_person').toUpperCase() }}</th>
                  <th v-if="isArchive" class="text-left">{{ $t('label.incoming_mail_number').toUpperCase() }}</th>
                  <th v-if="isArchive || isAdministration" class="text-center">{{ $t('label.completeness').toUpperCase() }}</th>
                  <th v-if="isArchive" class="text-center">{{ $t('label.follow_up_status').toUpperCase() }}</th>
                  <th class="text-center">{{ $t('label.action').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in listLogisticRequest" :key="index">
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td style="min-width: 10.5rem">{{ data.created_at ? $moment(data.created_at).format('D MMMM YYYY') : $t('label.stripe') }}</td>
                  <td style="max-width: 20rem; min-width: 11rem;">{{ data.agency_name }}</td>
                  <td>{{ data.city.kemendagri_kabupaten_nama }}</td>
                  <td style="min-width: 8rem; max-width: 11rem" @click="sendMessage(data)">
                    <span class="applicant-contact">{{ data.applicant.applicant_name }}</span>
                    <v-icon left small color="#2196F3">mdi-whatsapp</v-icon>
                  </td>
                  <td v-if="isArchive" style="max-width: 10rem;">{{ data.applicant.application_letter_number }}</td>
                  <td v-if="isArchive || isAdministration" class="text-center">
                    <v-btn v-if="data.completeness" outlined small color="success">{{ $t('label.completed') }}</v-btn>
                    <v-btn v-else outlined small color="error" @click="completenessDetail(data)">{{ $t('label.not_complete') }}</v-btn>
                  </td>
                  <td v-if="isArchive" style="min-width: 8rem">{{ checkStatus(data.status_request) }}</td>
                  <td>
                    <JDSButton height="28px" width="80px" @click="toDetail(data)">
                      <v-icon left small>mdi-alert-circle</v-icon>
                      <span class="ml-n1">{{ $t('label.detail') }}</span>
                    </JDSButton>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>
    <pagination
      :total="totalListLogisticRequest"
      :total-data="totalDataLogisticRequest"
      :page="listQuery.page"
      :limit.sync="listQuery.limit"
      @update:page="onListQueryPageUpdated"
    />
    <completenessDetail
      ref="completenessDetailForm"
      :show="showcompletenessDetail"
    />
    <referenceDetail
      ref="referenceDetailForm"
      :show="showreferenceDetail"
    />
  </div>
</template>

<script>
import JDSButton from '@/components/Base/JDSButton'
import { mapGetters, mapState } from 'vuex'
import FileSaver from 'file-saver'
import EventBus from '@/utils/eventBus'
import completenessDetail from './completenessDetail'
import referenceDetail from './referenceDetail'

export default {
  name: 'ListPengajuanLogistik',
  components: {
    completenessDetail,
    referenceDetail,
    JDSButton
  },
  data() {
    const faskesType = parseInt(this.$route.query?.faskes_type)
    const isReference = parseInt(this.$route.query?.is_reference)
    const completeness = parseInt(this.$route.query?.completeness)
    const isUrgency = parseInt(this.$route.query?.is_urgency)
    const finalizedBy = parseInt(this.$route.query?.finalized_by)
    return {
      sortOption: [
        { value: 'desc', label: 'Terbaru' },
        { value: 'asc', label: 'Terlama' }
      ],
      listQuery: {
        page: parseInt(this.$route.query?.page || 1),
        limit: parseInt(this.$route.query?.limit || 10),
        sort: this.$route.query?.sort || '',
        city_code: this.$route.query?.city_code || '',
        verification_status: this.$route.query?.verification_status || '',
        agency_name: this.$route.query?.agency_name || '',
        start_date: this.$route.query?.start_date || null,
        end_date: this.$route.query?.end_date || null,
        is_reference: Number.isNaN(isReference) ? null : isReference,
        completeness: Number.isNaN(completeness) ? null : completeness,
        is_urgency: Number.isNaN(isUrgency) ? null : isUrgency,
        finalized_by: Number.isNaN(finalizedBy) ? null : finalizedBy,
        faskes_type: Number.isNaN(faskesType) ? null : faskesType,
        source_data: this.$route.query?.source_data || null,
        status_request: this.$route.query?.status_request || null,
        search: this.$route.query?.search || null
      },
      status: [
        {
          text: this.$t('label.verified'),
          value: this.$t('label.verified_value')
        },
        {
          text: this.$t('label.not_verified'),
          value: this.$t('label.not_verified_value')
        }
      ],
      applicantOrigin: [
        {
          text: this.$t('label.dinkes_province'),
          value: 'dinkes_provinsi'
        },
        {
          text: this.$t('label.pikobar'),
          value: 'pikobar'
        }
      ],
      referenceFaskes: [
        {
          text: this.$t('label.is_reference'),
          value: 1
        },
        {
          text: this.$t('label.is_not_reference'),
          value: 0
        }
      ],
      completeStatus: [
        {
          text: this.$t('label.not_complete'),
          value: 0
        },
        {
          text: this.$t('label.completed'),
          value: 1
        }
      ],
      urgencyStatus: [
        {
          text: this.$t('label.emergency'),
          value: 1
        },
        {
          text: this.$t('label.not_urgency'),
          value: 0
        }
      ],
      finalizedStatus: [
        {
          text: this.$t('label.not_done_yet'),
          value: 0
        },
        {
          text: this.$t('label.done'),
          value: 1
        }
      ],
      statusOptions: [
        {
          text: 'Verifikasi Administrasi',
          value: 'not_approved-not_verified'
        },
        {
          text: 'Ditolak',
          value: 'rejected'
        },
        {
          text: 'Rekomendasi',
          value: 'not_approved-verified'
        },
        {
          text: 'Realisasi',
          value: 'approved-verified'
        },
        {
          text: 'Menunggu Konfirmasi',
          value: 'integrated'
        },
        {
          text: 'Barang Sedang di Packing',
          value: 'booked'
        },
        {
          text: 'Siap Berangkat',
          value: 'do'
        },
        {
          text: 'Sedang dalam perjalanan',
          value: 'intransit'
        },
        {
          text: 'Barang sudah sampai tujuan',
          value: 'delivered'
        }
      ],
      date: null,
      showFilter: true,
      isVerified: false,
      isApproved: false,
      isRejected: false,
      showcompletenessDetail: false,
      showreferenceDetail: false,
      disabledDistrict: false,
      districtCity: null
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listLogisticRequest',
      'totalListLogisticRequest',
      'totalDataLogisticRequest'
    ]),
    ...mapGetters('faskesType', [
      'faskesTypeList'
    ]),
    ...mapState('user', [
      'roles',
      'district_user', // district code
      'district_name'
    ]),
    isArchive() {
      return this.$route.name === 'archive'
    },
    isAdministration() {
      return this.$route.name === 'notVerified'
    }
  },
  async created() {
    if (this.$route.name === 'verified') {
      this.isVerified = true
      this.listQuery.verification_status = 'verified'
      this.listQuery.approval_status = 'not_approved'
    } else if (this.$route.name === 'notVerified') {
      this.listQuery.verification_status = 'not_verified'
    } else if (this.$route.name === 'rejected') {
      this.listQuery.is_rejected = 1
      this.isRejected = true
    } else if (this.$route.name === 'realized' || this.$route.name === 'not_yet_realized') {
      this.listQuery.verification_status = 'verified'
      this.listQuery.approval_status = 'approved'
      this.isApproved = true
      this.listQuery.finalized_by = this.$route.name === 'realized' ? 1 : 0
    }
    await this.$store.dispatch('faskesType/getListFaskesType')
    if (this.roles[0] === 'dinkeskota') this.lockDistrictFilter()
    this.getLogisticRequestList()
    EventBus.$on('hideCompletenessDetail', (value) => {
      this.showcompletenessDetail = false
    })
    EventBus.$on('hideReferenceDetail', (value) => {
      this.showreferenceDetail = false
    })
    if (this.$route.query?.city_code && this.$route.query?.city_name) {
      this.districtCity = {
        kemendagri_kabupaten_kode: this.$route.query?.city_code,
        kemendagri_kabupaten_nama: this.$route.query?.city_name
      }
    }
  },
  methods: {
    checkStatus(status) {
      switch (status) {
        case 'not_approved-not_verified':
          return 'Verifikasi Administrasi'
        case 'rejected':
          return 'Ditolak'
        case 'not_approved-verified':
          return 'Rekomendasi'
        case 'approved-verified':
          return 'Realisasi'
        case 'integrated':
          return 'Menunggu Konfirmasi'
        case 'booked':
          return 'Barang Sedang Dipacking'
        case 'do':
          return 'Siap Berangkat'
        case 'intransit':
          return 'Sedang dalam Perjalanan'
        case 'delivered':
          return 'Barang Sudah Sampai Tujuan'
        default:
          return 'Status Tidak Tersedia'
      }
    },
    sendMessage(payload) {
      const phoneNumber = payload.applicant.primary_phone_number
      let convertPhoneToIntFormat = phoneNumber
      if (phoneNumber.startsWith('0')) {
        convertPhoneToIntFormat = phoneNumber.replace('0', '+62')
      }

      const content = ''

      window.open(`https://wa.me/${convertPhoneToIntFormat}?text=${content}`, '_blank')
    },
    async changeDate(value) {
      this.listQuery.start_date = value.startDate
      this.listQuery.end_date = value.endDate
      this.listQuery.page = 1
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
    },
    async getLogisticRequestList() {
      await this.$store.dispatch('logistics/getListLogisticRequest', this.listQuery)
      this.listLogisticRequest.forEach(element => {
        if (element.master_faskes) {
          element.is_reference = element.master_faskes.is_reference
        }
      })
    },
    async handleSearch() {
      this.listQuery.page = 1
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
    },
    onListQueryPageUpdated(newPage) {
      this.listQuery.page = newPage
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    onSelectDistrictCity(value) {
      if (!value) {
        this.listQuery.city_code = null
        this.handleSearch()
        return
      }
      this.listQuery.city_code = value ? value.kemendagri_kabupaten_kode : null
      this.listQuery.page = 1
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery),
          city_name: value.kemendagri_kabupaten_nama
        }
      })
    },
    toDetail(data) {
      this.$router.push(`/alat-kesehatan/detail/${data.id}`)
    },
    async exportData() {
      const response = await this.$store.dispatch('logistics/logisticRequestExportData', this.listQuery)
      const fileName = `${this.$t('label.export_file_name')}-${this.$moment(Date.now()).format('YYYY-MM-DD-h:mm:ss')}.xlsx`
      await FileSaver.saveAs(response, fileName)
    },
    completenessDetail(data) {
      this.$refs.completenessDetailForm.setData(data.id, data)
      this.showcompletenessDetail = true
    },
    referenceDetail(data) {
      this.$refs.referenceDetailForm.setData(data.id, data)
      this.showreferenceDetail = true
    },
    lockDistrictFilter() {
      this.disabledDistrict = true
      this.districtCity = {
        kemendagri_kabupaten_kode: this.district_user,
        kemendagri_kabupaten_nama: this.district_name
      }
      this.listQuery.city_code = this.districtCity.kemendagri_kabupaten_kode
    },
    filterQuery(oldQuery) {
      const newQuery = { ...oldQuery }
      Object.keys(newQuery).forEach(key => {
        const shouldBeDeleted = newQuery[key] === null ||
          newQuery[key] === undefined ||
          newQuery[key] === '' ||
          key === 'approval_status' ||
          key === 'is_rejected' ||
          key === 'verification_status'
        if (shouldBeDeleted) {
          delete newQuery[key]
        }
      })
      return newQuery
    }
  }
}
</script>

<style>
.applicant-contact {
  color: #2196F3;
  margin-right: 0.2rem;
  text-decoration: underline;
  cursor: pointer;
}
.bg-dark {
  background: linear-gradient(90deg, #4F4F4F 0%, #828282 100%);
}
.bg-success {
  background: linear-gradient(90deg, #219653 0%, #27AE60 100%);
}
.bg-info {
  background: linear-gradient(90deg, #2F80ED 0%, #2D9CDB 100%);
}
.bottom-add-survey {
  margin-top:25px;
}
.margin-top-min-20-list-pengajuan-logistik {
  margin-top: -20px;
}
.margin-top-bot-min-20-list-pengajuan-logistik {
  margin-top: -20px;
  margin-bottom: -20px;
}
.table-title {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #828282;
}
.thin {
  margin-top: 5px;
  margin-bottom: 0px;
}
</style>
