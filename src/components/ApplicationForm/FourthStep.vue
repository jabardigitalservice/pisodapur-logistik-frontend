<template>
  <v-container>
    <div>
      <v-alert v-if="formApplicant.instanceType <= 3" text outlined type="info">
        <strong class="alert__text">{{ $t('label.applicant_letter_note') }}</strong>
        <br>
        <p class="alert__text">Jika Anda mengunggah <strong>Surat yang Belum Ditandatangani <em>(draft)</em></strong> maka:</p>
        <ol>
          <li class="alert__text">Jumlah permohonan barang pada surat yang belum ditandatangani <em>(draft)</em> yang diunggah tidak dapat diubah pada surat telah ditandatangani (final).</li>
          <li class="alert__text">Batas waktu pengiriman surat final adalah <strong>1x24</strong> jam surat <em>draft</em> disimpan.</li>
          <li class="alert__text">Kirim surat final Anda melalui <strong>WhatsApp Hotline PIKOBAR ({{ hotlinePikobar }})</strong>.</li>
        </ol>
      </v-alert>
      <div class="text-center my-2">
        <v-label class="title"><b>{{ $t('label.applicant_form_header_letter') }}</b></v-label>
      </div>
      <br>
    </div>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
        class="mt-5"
      >
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredApplicantLetterNumber"
            >
              <v-label class="title"><b>{{ $t('label.applicant_letter_number') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="applicantLetter.name"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_letter_number_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="isVaccineContent"
              v-slot="{ errors }"
              rules="required"
              :name="$t('label.signing_status')"
            >
              <v-label class="title">
                <b>{{ $t('label.is_signed_by_head_of_instance') }}</b>
                <i class="text-small-first-step">{{ $t('label.must_fill') }}</i>
              </v-label>
              <v-radio-group
                v-model="applicantLetter.is_letter_file_final"
                :error-messages="errors"
              >
                <v-radio
                  :label="$t('label.done_final')"
                  value="1"
                />
                <v-radio
                  :label="$t('label.not_yet_draft')"
                  value="0"
                />
              </v-radio-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              ref="provider"
              name="Surat Permohonan"
              rules="required|size:10000|ext:jpg,png,jpeg,pdf"
            >
              <upload-file
                :suffix-title="$t('label.must_fill')"
                :empty-file="$t('label.not_yet_upload_file')"
                :title="$t('label.applicant_letter_number_upload')"
                note="JPG, JPEG, PNG, PDF up to 10MB"
                accept=".jpg, .jpeg, .png, .pdf"
                :is-upload="isUpload"
                :selected-file-name="selectedFileName"
                @saveImage="saveImage"
              />
              <p v-if="errors.length" class="ma-2 error--text error--message">{{ errors[0] }}</p>
            </ValidationProvider>
          </v-col>
          <v-col v-if="formApplicant.instanceType <= 3 && logisticRequestType === 'alkes'" cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredCovidPatientTotal"
            >
              <v-label class="title"><b>Jumlah Pasien COVID-19 yang ditangani</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="applicantLetter.total_covid_patients"
                outlined
                :error-messages="errors"
                placeholder="Masukkan jumlah pasien"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredIsolationRoomTotal"
            >
              <v-label class="title"><b>Jumlah ruang isolasi</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="applicantLetter.total_isolation_room"
                outlined
                :error-messages="errors"
                placeholder="Masukkan jumlah ruang isolasi"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredBedroomTotal"
            >
              <v-label class="title"><b>Jumlah ruang tidur</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="applicantLetter.total_bedroom"
                outlined
                :error-messages="errors"
                placeholder="Masukkan jumlah ruang tidur"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredHealthWorkerTotal"
            >
              <v-label class="title"><b>Jumlah tenaga kesehatan yang menangani</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="applicantLetter.total_health_worker"
                outlined
                :error-messages="errors"
                placeholder="Masukkan jumlah tenaga kesehatan"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-col cols="12" sm="12" md="6" class="float-right-fourth-step">
            <v-btn
              class="btn-margin-positive"
              color="primary"
              @click="onNext"
            >{{ $t('label.next') }}</v-btn>
            <v-btn
              class="btn-margin-positive"
              outlined
              text
              @click="onPrev"
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
import { mapGetters } from 'vuex'

export default {
  name: 'SuratPermohonan',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    formApplicant: {
      type: Object,
      default: null
    },
    applicantLetter: {
      type: Object,
      default: null
    },
    isVaccineContent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      step: 4,
      file: null,
      isUpload: false,
      selectedFile: null,
      letterNumber: null,
      selectedFileName: null,
      hotlinePikobar: process.env.VUE_APP_HOTLINE_PIKOBAR_ALKES
    }
  },
  computed: {
    ...mapGetters('logistics', ['logisticRequestType'])
  },
  created() {
    this.reloadData()
  },
  methods: {
    async saveImage(e) {
      this.isUpload = false
      this.file = e.target.files[0]
      this.selectedFileName = this.file.name
      const valid = await this.$refs.provider.validate(this.file)
      if (!valid.valid) return
      this.isUpload = true
      const formData = new FormData()
      formData.append('file', this.file)
      this.applicantLetter.dataFile = this.file
    },
    async reloadData() {
      if (this.applicantLetter.dataFile) {
        this.file = this.applicantLetter.dataFile
        this.selectedFileName = this.file.name
        this.isUpload = true
      } else {
        this.applicantLetter.name = null
        this.applicantLetter.dataFile = null
      }
    },
    async onNext() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      EventBus.$emit('confirmStep', this.applicantLetter)
    },
    onPrev() {
      this.isAddAPD = false
      EventBus.$emit('prevStep', this.step)
    }
  }
}
</script>
<style lang="scss" scoped>
.float-right-fourth-step {
  float: right;
}
.alert {
  &__text {
    color: #212121 !important;
    font-weight: normal !important;
  }
}
</style>
