<template>
  <v-container>
    <ValidationObserver ref="firtstep">
      <v-form
        ref="form"
        lazy-validation
      >
        <div class="text-center my-2 pb-6">
          <v-label class="title"><b>{{ $t('label.applicant_form_header') }}</b></v-label>
        </div>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredInstanceType"
            >
              <v-label class="title"><b>{{ $t('label.instance_type') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.instanceType"
                outlined
                clearable
                return-object
                :error-messages="errors"
                item-value="id"
                item-text="name"
                :items="instanceTypeList"
                :placeholder="$t('label.autocomplete_instance_placeholder')"
                @change="onSelectFaskesType"
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="!isEtc && !isVaccineEtc"
              v-slot="{ errors }"
              rules="requiredInstanceName"
            >
              <v-label class="title"><b>{{ $t('label.instance_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.instance"
                :items="instanceNameList"
                item-value="id"
                :item-text="itemText"
                single-line
                solo
                outlined
                autocomplete
                clearable
                return-object
                :error-messages="errors"
                placeholder="Masukkan Nama Instansi Anda"
                @input.native="querySearchFaskes"
                @change="onSelectFaskes"
              />
            </ValidationProvider>
            <ValidationProvider
              v-else
              v-slot="{ errors }"
              rules="requiredInstanceName"
            >
              <v-label class="title"><b>{{ $t('label.instance_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formApplicant.instanceEtc"
                outlined
                :error-messages="errors"
                placeholder="Masukkan Nama Instansi Anda"
                solo-inverted
              />
            </ValidationProvider>
            <div v-if="!isEtc && !isVaccineContent" class="mb-5">
              <v-label class="title"><b>{{ $t('label.instance_not_found_title') }}</b></v-label>
              <v-btn
                outlined
                color="#2E7D32"
                large
                style="margin-left: 30px"
                @click.stop="showInstanceDialog()"
              >
                {{ $t('label.adding') }}
              </v-btn>
              <form-add-instance
                ref="addInstanceForm"
                :show="showForm"
              />
            </div>
            <ValidationProvider
              v-slot="{ errors }"
              rules="isPhoneNumber"
            >
              <v-label class="title"><b>{{ $t('label.instance_phone_number') }}</b></v-label>
              <v-text-field
                v-model="formApplicant.instancePhoneNumber"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.example_phone_number')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredCityName"
            >
              <v-label class="title"><b>{{ $t('label.city_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.cityNameId"
                outlined
                return-object
                :error-messages="errors"
                :items="cityList"
                :placeholder="$t('label.autocomplete_city_placeholder')"
                @change="getListDistrict"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredDistrictName"
            >
              <v-label class="title"><b>{{ $t('label.district_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.districtNameId"
                outlined
                return-object
                :error-messages="errors"
                :items="districtList"
                :placeholder="$t('label.autocomplete_capital_placeholder')"
                @change="getListVillage"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredVillageName"
            >
              <v-label class="title"><b>{{ $t('label.village_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.villageNameId"
                outlined
                return-object
                :error-messages="errors"
                :items="villageList"
                :placeholder="$t('label.autocomplete_capital_placeholder')"
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="!isAdmin"
              v-slot="{ errors }"
              rules="requiredFullAddress"
            >
              <v-label class="title">
                <b>
                  {{
                    isVaccineContent
                      ? $t('label.pharmacy_installation_full_address')
                      : $t('label.full_address')
                  }}
                </b>
                <i class="text-small-first-step">
                  {{ $t('label.must_fill') }}
                </i>
              </v-label>
              <v-textarea
                v-model="formApplicant.fullAddress"
                outlined
                :height="100"
                :no-resize="true"
                :error-messages="errors"
                :placeholder="$t('label.example_full_address')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-else
              v-slot="{ errors }"
            >
              <v-label class="title"><b>{{ $t('label.full_address') }}</b></v-label>
              <v-textarea
                v-model="formApplicant.fullAddress"
                outlined
                :height="100"
                :no-resize="true"
                :error-messages="errors"
                :placeholder="$t('label.example_full_address')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-col cols="6" sm="6" md="6" class="float-right-first-step">
            <v-btn
              class="btn-margin-positive"
              color="primary"
              @click="onNext()"
            >{{ $t('label.next') }}</v-btn>
            <v-btn
              class="btn-margin-positive"
              outlined
              text
              @click="onBack()"
            >{{ $t('label.cancel') }}</v-btn>
          </v-col>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'IdentitasInstansiPemohon',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    formApplicant: {
      type: Object,
      default: null
    },
    isAdmin: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      step: 1,
      nameFaskes: '',
      listQueryFaskes: {
        nama_faskes: null,
        id_tipe_faskes: null,
        medical_facility_type_id: null
      },
      showForm: false,
      isEtc: false,
      isVaccineEtc: false,
      instanceNamePlaceholder: this.$t('label.example_instance_name'),
      cityList: [],
      districtList: [],
      villageList: []
    }
  },
  computed: {
    ...mapGetters('region', [
      'applicantListCity',
      'applicantListDistrict',
      'applicantListVillage'
    ]),
    ...mapGetters('faskes', [
      'faskesList',
      'faskesDetail'
    ]),
    ...mapGetters('faskesType', [
      'faskesTypeList'
    ]),
    ...mapState('faskesType', [
      'listVaccineFaskesType'
    ]),
    ...mapState('faskes', [
      'listFaskesVaccine'
    ]),
    instanceTypeList() {
      return !this.isVaccineContent
        ? this.faskesTypeList
        : this.listVaccineFaskesType
    },
    instanceNameList() {
      return !this.isVaccineContent
        ? this.faskesList
        : this.listFaskesVaccine
    },
    itemText() {
      return !this.isVaccineContent ? 'nama_faskes' : 'name'
    },
    isVaccineContent() {
      return this.$route.query.type === 'vaksin'
    }
  },
  async created() {
    await this.getListCity()
    if (this.isAdmin) {
      await this.$store.dispatch('faskesType/getListFaskesType', { non_public: 1 })
    } else {
      const actionName = !this.isVaccineContent ? 'getListFaskesType' : 'getVaccineListFaskesType'
      await this.$store.dispatch(`faskesType/${actionName}`)
    }
    EventBus.$on('dialogHide', (value) => {
      this.showForm = value
    })
  },
  methods: {
    async onNext() {
      const valid = await this.$refs.firtstep.validate()
      if (!valid) {
        return
      }
      EventBus.$emit('nextStep', this.step)
    },
    onBack() {
      this.$router.go(-1)
    },
    async getListCity() {
      await this.$store.dispatch('region/getApplicantFormListCity')
      this.cityList = this.applicantListCity.map(element => {
        return {
          id: element.kemendagri_kabupaten_kode,
          value: element.kemendagri_kabupaten_kode,
          text: element.kemendagri_kabupaten_nama
        }
      })
    },
    async getListDistrict() {
      await this.$store.dispatch('region/getApplicantFormListDistrict', { city_code: this.formApplicant.cityNameId.id })
      this.districtList = this.applicantListDistrict.map(element => {
        return {
          id: element.kemendagri_kecamatan_kode,
          value: element.kemendagri_kecamatan_kode,
          text: element.kemendagri_kecamatan_nama
        }
      })
    },
    async getListVillage() {
      await this.$store.dispatch('region/getApplicantFormListVillage', { subdistrict_code: this.formApplicant.districtNameId.id, area_type: 'village' })
      this.villageList = this.applicantListVillage.map(element => {
        return {
          id: element.kemendagri_desa_kode,
          value: element.kemendagri_desa_kode,
          text: element.kemendagri_desa_nama
        }
      })
    },
    async onSelectFaskesType(value) {
      this.resetForm()
      const { id, name } = value
      this.formApplicant.instanceTypeName = name
      if (!this.isVaccineContent) {
        this.listQueryFaskes.id_tipe_faskes = id
      } else {
        this.listQueryFaskes.medical_facility_type_id = id
      }
      this.isEtc = this.formApplicant.instanceType === 4 ||
        this.formApplicant.instanceType === 5 ||
        this.formApplicant.instanceType === 99
      this.isVaccineEtc = this.formApplicant.instanceType.id === 99
      await this.getListFaskes()
    },
    async getListFaskes() {
      if (!this.isVaccineContent) {
        if (this.isAdmin) this.listQueryFaskes.is_imported = 0
        await this.$store.dispatch('faskes/getListFaskes', this.listQueryFaskes)
      } else {
        await this.$store.dispatch('faskes/getListFaskesVaccine', this.listQueryFaskes)
      }
    },
    async querySearchFaskes(event) {
      this.listQueryFaskes.nama_faskes = event.target.value
      await this.getListFaskes()
    },
    onSelectFaskes(val) {
      const { id } = val
      if (!this.isVaccineContent && val) {
        this.formApplicant.instanceName = val.nama_faskes
        this.$store.dispatch('faskes/getDetailFaskes', id)
      } else {
        this.formApplicant.instanceName = val.name
        this.$set(this.formApplicant, 'fullAddress', val.address)
        this.$set(this.formApplicant, 'instancePhoneNumber', val.phone)
        this.formApplicant.cityNameId = {
          text: val.city.name,
          value: val.city.kemendagri_kabupaten_kode,
          id: val.city.kemendagri_kabupaten_kode
        }
        this.formApplicant.districtNameId = {
          text: val.district.name,
          value: val.district.kemendagri_kecamatan_kode,
          id: val.district.kemendagri_kecamatan_kode
        }
        this.formApplicant.villageNameId = {
          text: val.village.name,
          value: val.village.kemendagri_desa_kode,
          id: val.village.kemendagri_desa_kode
        }
        this.getListCity()
        this.getListDistrict()
        this.getListVillage()
      }
    },
    showInstanceDialog() {
      this.showForm = true
      this.$refs.addInstanceForm.setShowDialog(this.isAdmin)
    },
    resetForm() {
      this.$set(this.formApplicant, 'instance', null)
      this.$set(this.formApplicant, 'instanceEtc', null)
      this.$set(this.formApplicant, 'instanceName', null)
      this.$set(this.formApplicant, 'instancePhoneNumber', null)
      this.$set(this.formApplicant, 'cityNameId', null)
      this.$set(this.formApplicant, 'districtNameId', null)
      this.$set(this.formApplicant, 'villageNameId', null)
      this.$set(this.formApplicant, 'fullAddress', null)
      this.districtList = []
      this.villageList = []
    }
  }
}
</script>
<style>
.text-small-first-step {
  font-size: 13px;
}
.float-right-first-step {
  float: right;
}
</style>
