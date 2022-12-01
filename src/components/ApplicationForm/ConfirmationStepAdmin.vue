<template>
  <div v-if="isLoading">
    <v-row align="center" justify="center">
      <img height="200" src="../../static/mengirim.svg">
    </v-row>
    <v-row align="center" justify="center" class="margin-wait-data-confirmation-admin">
      {{ $t('label.wait') }}
    </v-row>
    <v-row align="center" justify="center" class="mt-7">
      {{ $t('label.loading_step_one') }}
    </v-row>
    <v-row align="center" justify="center" class="mt-3">
      {{ $t('label.loading_step_two') }}
    </v-row>
  </div>
  <div v-else-if="isDone">
    <v-row align="center" justify="center">
      <img height="200" src="../../static/berhasil.svg">
    </v-row>
    <v-row align="center" justify="center">
      <div class="save-style-data-confirmation-admin">{{ $t('label.save_success') }}</div>
    </v-row>
    <v-row align="center" justify="center" class="confirmation-text mt-7">
      {{ $t('label.loading_done_one') }}
    </v-row>
    <v-row align="center" justify="center" class="confirmation-text mt-3">
      Jika Anda memiliki pertanyaan lebih lanjut, silahkan hubungi Hotline PIKOBAR pada nomor {{ hotlinePikobar }} atau melalui e-mail kami di digital.service@jabarprov.go.id.
    </v-row>
    <br>
    <v-row align="center" justify="center" class="mt-3 mb-15">
      <v-btn @click="refreshPage()">{{ $t('label.back') }}</v-btn>
    </v-row>
  </div>
  <div v-else>
    <div class="data-confirmation-text-admin">{{ $t('label.confirm_data') }}</div>
    <hr>
    <div class="main-color-data-confirmation-admin">{{ $t('label.instance_identity') }}</div>
    <v-row>
      <v-col>
        <v-card class="mx-auto" outlined>
          <v-row>
            <v-col class="margin-20">
              <v-row class="margin-top-min-15">
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.instance_type') }}</span>
                  <br>
                  <v-label>{{ formApplicant.instanceTypeName || '-' }}</v-label>
                </v-col>
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.city_district') }}</span>
                  <br>
                  <v-label>{{ areaDisplay('cityNameId') }}</v-label>
                </v-col>
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.full_address') }}</span>
                  <br>
                  <v-label>{{ formApplicant.fullAddress || '-' }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.instance_name') }}</span>
                  <br>
                  <v-label v-if="formApplicant.instanceEtc">{{ formApplicant.instanceEtc || '-' }}</v-label>
                  <v-label v-else>{{ formApplicant.instanceName || '-' }}</v-label>
                </v-col>
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.select_sub_district_full_name') }}</span>
                  <br>
                  <v-label>{{ areaDisplay('districtNameId') }}</v-label>
                </v-col>
                <v-col />
              </v-row>
              <v-row>
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.number_phone') }}</span>
                  <br>
                  <v-label>{{ formApplicant.instancePhoneNumber || '-' }}</v-label>
                </v-col>
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.village') }}</span>
                  <br>
                  <v-label>{{ areaDisplay('villageNameId') }}</v-label>
                </v-col>
                <v-col />
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="main-color-data-confirmation-admin">{{ $t('label.step_title_2') }}</div>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" outlined>
          <v-row>
            <v-col class="margin-20" cols="12" sm="6" md="6">
              <v-row class="margin-top-min-15">
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.contact_person') }}</span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantName || '-' }}</v-label>
                </v-col>
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.capital_email') }}</span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantEmail || '-' }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.applicant_position_identity') }}</span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantPosition || '-' }}</v-label>
                </v-col>
                <v-col>
                  <span class="main-color-data-confirmation-admin">{{ $t('label.applicant_phone') }}</span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantPhoneNumber || '-' }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col offset-md="6" offset-sm="6">
                  <span class="main-color-data-confirmation-admin">{{ $t('label.applicant_phone_sub') }}</span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantPhoneNumber2 || '-' }}</v-label>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="d-flex flex-column">
              <span class="main-color-data-confirmation-admin">{{ $t('label.applicant_ktp') }}</span>
              <img class="image-style-data-confirmation-admin mt-3" height="100" width="149" :src="url">
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="main-color-data-confirmation-admin">{{ $t('label.step_title_4') }}</div>
    <v-card outlined>
      <v-row class="ml-2">
        <v-col cols="1" md="1">
          <span class="main-color-data-confirmation-admin">#</span>
        </v-col>
        <v-col cols="3" md="3">
          <span class="main-color-data-confirmation-admin">{{ $t('label.letter_number') }}</span>
        </v-col>
      </v-row>
      <v-row class="ml-2">
        <v-col cols="1" md="1">
          <span>1</span>
        </v-col>
        <v-col cols="3" md="3">
          <span class="grey--text">{{ formApplicant.letterNumber || '-' }}</span>
        </v-col>
        <v-col cols="4" md="4">
          <a :href="urlLetter" target="_blank" class="blue--text"><u>{{ applicantLetter.name || '-' }}</u></a>
        </v-col>
        <v-col>
          <span class="main-color-data-confirmation-admin">{{ $t('label.download') }}</span>
        </v-col>
      </v-row>
    </v-card>
    <div v-if="formApplicant.instanceType <= 3 && logisticRequestType === 'alkes'">
      <div class="main-color-data-confirmation-admin">Detail Kondisi Fasilitas Kesehatan</div>
      <v-row>
        <v-col>
          <v-card class="mx-auto" outlined>
            <v-row>
              <v-col class="margin-20">
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span class="main-color-data-confirmation-admin">Jumlah Pasien COVID-19 yang ditangani</span>
                    <br>
                    <v-label>
                      {{ applicantLetter.total_covid_patients || '0' }} Orang
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="main-color-data-confirmation-admin">Jumlah Tempat Tidur</span>
                    <br>
                    <v-label>
                      {{ applicantLetter.total_bedroom || '0' }} Tempat Tidur
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="main-color-data-confirmation-admin">Jumlah Ruang Isolasi</span>
                    <br>
                    <v-label>
                      {{ applicantLetter.total_isolation_room || '0' }} Ruangan
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="main-color-data-confirmation-admin">Jumlah Tenaga Kesehatan</span>
                    <br>
                    <v-label>
                      {{ applicantLetter.total_health_worker || '0' }} Orang
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <hr>
    <div class="main-color-data-confirmation-admin">{{ $t('label.list_logistic_need') }}</div>
    <v-card outlined>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
              <th class="text-left">{{ $t('label.apd_name_specification') }}</th>
              <th class="text-left">{{ $t('label.description') }}</th>
              <th class="text-left">{{ $t('label.total') }}</th>
              <th class="text-left">{{ $t('label.unit') }}</th>
              <th class="text-left">{{ $t('label.purpose') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="logisticNeeds.length === 0">
              <td class="text-center-data-confirmation-admin" :colspan="7">{{ $t('label.no_data') }}</td>
            </tr>
            <tr v-for="(item, index) in dataShow" v-else :key="item.index">
              <td>{{ getTableRowNumbering(index) }}</td>
              <td>{{ item.unitName }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.total }}</td>
              <td>{{ item.unitList[0].unit }}</td>
              <td>{{ item.purpose }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-pagination
      v-model="listQuery.page"
      :length="total"
      :total-visible="3"
      @input="onNext"
    />
    <hr>
    <v-row justify="end" class="mb-12 mr-1 mt-1">
      <JDSButton inverted height="42px" @click="onPrev()">
        {{ $t('label.back') }}
      </JDSButton>
      <JDSButton height="42px" class="ml-2" @click="submitData">
        {{ $t('label.save') }}
      </JDSButton>
    </v-row>
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
import JDSButton from '@/components/Base/JDSButton'
import { mapGetters } from 'vuex'

export default {
  name: 'TahapKonfirmasiAdmin',
  components: {
    JDSButton
  },
  props: {
    formApplicant: {
      type: Object,
      default: null
    },
    formIdentityApplicant: {
      type: Object,
      default: null
    },
    logisticNeeds: {
      type: Array,
      default: null
    },
    applicantLetter: {
      type: Object,
      default: null
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      step: 5,
      dataShow: [],
      listQuery: {
        page: 1,
        limit: 3
      },
      total: 0,
      url: null,
      urlLetter: null,
      letterName: '',
      isLoading: false,
      isDone: false,
      hotlinePikobar: 'askdas'
    }
  },
  computed: {
    ...mapGetters('user', [
      'user'
    ]),
    ...mapGetters('logistics', [
      'logisticRequestType'
    ])
  },
  mounted() {
    this.letterName = this.applicantLetter.name
    if (this.isAdmin) {
      try {
        this.url = URL.createObjectURL(this.formIdentityApplicant.dataFile)
      } catch (error) {
        this.url = ''
      }
    } else {
      this.url = URL.createObjectURL(this.formIdentityApplicant.dataFile)
    }
    this.urlLetter = URL.createObjectURL(this.applicantLetter.dataFile)
    this.total = Math.ceil(this.logisticNeeds.length / 3)
    if (this.total === 1) {
      for (let index = 0; index < this.logisticNeeds.length; index++) {
        this.dataShow.push(this.logisticNeeds[index])
      }
    } else {
      for (let index = 0; index < 3; index++) {
        this.dataShow.push(this.logisticNeeds[index])
      }
    }
  },
  methods: {
    getTableRowNumbering(index) {
      return ((parseInt(this.listQuery.page) - 1) * parseInt(this.listQuery.limit)) + (parseInt(index) + 1)
    },
    onNext() {
      this.dataShow = []
      const x = (this.listQuery.page - 1) * 3
      for (let index = x; index < this.logisticNeeds.length; index++) {
        if (this.dataShow.length > 2) {
          return
        } else {
          this.dataShow.push(this.logisticNeeds[index])
        }
      }
    },
    onPrev() {
      EventBus.$emit('prevStep', this.step)
    },
    async submitData() {
      this.isLoading = true
      const dataLogistics = []
      this.logisticNeeds.forEach(element => {
        dataLogistics.push({
          usage: element.purpose,
          priority: element.urgency,
          product_id: element.apd,
          description: element.description,
          quantity: element.total,
          unit: element.unitId
        })
      })

      // untuk mengirim file dengan request POST harus pakai formData
      const formData = new FormData()
      formData.append('logistic_request', JSON.stringify(dataLogistics))
      formData.append('agency_type', this.formApplicant.instanceType.id)
      if (this.formApplicant.instanceEtc) {
        formData.append('agency_name', this.formApplicant.instanceEtc)
      } else {
        formData.append('agency_name', this.formApplicant.instanceName)
        formData.append('master_faskes_id', this.formApplicant.instance.id)
      }
      if (this.formApplicant.instancePhoneNumber) {
        formData.append('phone_number', this.formApplicant.instancePhoneNumber)
      }
      if (this.formIdentityApplicant.dataFile) {
        formData.append('applicant_file', this.formIdentityApplicant.dataFile)
      }
      formData.append('location_district_code', this.formApplicant.cityNameId.id)
      formData.append('location_subdistrict_code', this.formApplicant.districtNameId.id)
      formData.append('location_village_code', this.formApplicant.villageNameId.id)
      formData.append('location_address', this.formApplicant.fullAddress)
      formData.append('applicant_name', this.formIdentityApplicant.applicantName)
      formData.append('applicants_office', this.formIdentityApplicant.applicantPosition)
      formData.append('email', this.formIdentityApplicant.applicantEmail)
      formData.append('primary_phone_number', this.formIdentityApplicant.applicantPhoneNumber)
      formData.append('secondary_phone_number', this.formIdentityApplicant.applicantPhoneNumber2)
      formData.append('letter_file', this.applicantLetter.dataFile)
      formData.append('application_letter_number', this.formApplicant.letterNumber)
      formData.append('total_covid_patients', this.applicantLetter.total_covid_patients ?? 0)
      formData.append('total_isolation_room', this.applicantLetter.total_isolation_room ?? 0)
      formData.append('total_bedroom', this.applicantLetter.total_bedroom ?? 0)
      formData.append('total_health_worker', this.applicantLetter.total_health_worker ?? 0)
      formData.append('source_data', 'dinkes_provinsi')
      formData.append('created_by', this.user.id)
      formData.append('url', location.host + '/#')
      const requestFormAdmin = this.logisticRequestType === 'vaksin' ? 'logistics/postApplicantVaksinAdmin' : 'logistics/postApplicantFormAdmin'
      const response = await this.$store.dispatch(requestFormAdmin, formData)
      if (response.status === 200) {
        this.isDone = true
      } else {
        this.isDone = false
      }
      this.isLoading = false
    },
    onDone() {
      this.isDone = false
    },
    onLoading() {
      this.isDone = true
      this.isLoading = false
    },
    refreshPage() {
      window.location.reload()
    },
    areaDisplay(propName) {
      if (this.formApplicant[propName].name) {
        return this.formApplicant[propName].name
      } else if (this.formApplicant[propName].text) {
        return this.formApplicant[propName].text
      }
      return '-'
    }
  }
}
</script>
<style>
  .data-confirmation-text-admin {
    font-size: 20px;
    font-weight: bold;
  }
  .main-color-data-confirmation-admin {
    color: #27ae60;
    font-weight: bold;
    margin-top: 20px !important;
  }
  .image-style-data-confirmation-admin {
    max-width: 100%;
    max-height: 500px;
  }
  .margin-wait-data-confirmation-admin {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .save-style-data-confirmation-admin {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .text-center-data-confirmation-admin {
    text-align: center;
  }
  .confirmation-text {
    text-align: center;
    padding-left: 75px;
    padding-right: 75px;
  }
</style>
