<template>
  <v-container>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row v-if="isVaccineContent">
          <v-col cols="12" sm="12">
            <!-- @todo: create JDSAlert component -->
            <v-alert
              dense
              outlined
              type="info"
              color="#1565C0"
            >
              Pemohon adalah orang yang bertugas menginput permohonan, seperti
              <strong>admin</strong>
              dan
              <strong>PIC</strong>
              yang ditugaskan.
            </v-alert>
          </v-col>
        </v-row>
        <div v-else class="text-center my-2 pb-6">
          <v-label class="title"><b>{{ $t('label.applicant_form_header_step_2') }}</b></v-label>
        </div>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredApplicantName"
            >
              <v-label class="title"><b>{{ $t('label.contact_person') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantName"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.input_full_name')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="!isAdmin"
              v-slot="{ errors }"
              rules="requiredApplicantPosition"
            >
              <v-label class="title"><b>{{ $t('label.applicant_position') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantPosition"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_position_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-else
              v-slot="{ errors }"
            >
              <v-label class="title"><b>{{ $t('label.applicant_position') }}</b></v-label>
              <v-textarea
                v-model="formIdentityApplicant.applicantPosition"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_position_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              ref="provider"
              name="KTP"
              :rules="isAdmin ? 'size:10000|ext:jpg,png,jpeg,pdf' : 'required|size:10000|ext:jpg,png,jpeg,pdf'"
            >
              <upload-file
                :suffix-title="isAdmin ? null : $t('label.must_fill')"
                :empty-file="$t('label.file_input_placeholder')"
                :title="$t('label.upload_applicant_ktp')"
                note="(JPG, JPEG, PNG, DOC, PDF) max 10MB"
                accept=".jpg, .jpeg, .png, .pdf"
                :is-upload="isUpload"
                :selected-file-name="selectedFileName"
                @saveImage="saveImage"
              />
              <p v-if="errors.length" class="ma-2 error--text error--message">{{ errors[0] }}</p>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-if="!isAdmin"
              v-slot="{ errors }"
              rules="requiredApplicantEmail|email"
            >
              <v-label class="title"><b>{{ $t('label.applicant_email') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantEmail"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_email_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-else
              v-slot="{ errors }"
            >
              <v-label class="title"><b>{{ $t('label.applicant_email') }}</b></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantEmail"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_email_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredApplicantPhoneNumber|isPhoneNumber"
            >
              <v-label class="title"><b>{{ $t('label.applicant_phone_number') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantPhoneNumber"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_phone_number_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="!isAdmin"
              v-slot="{ errors }"
              rules="requiredApplicantPhoneNumber|isPhoneNumber"
            >
              <v-label class="title"><b>{{ $t('label.other_applicant_phone_number') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantPhoneNumber2"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_phone_number_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-else
              v-slot="{ errors }"
            >
              <v-label class="title"><b>{{ $t('label.other_applicant_phone_number') }}</b></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantPhoneNumber2"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_phone_number_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-col cols="6" sm="6" md="6" class="float-right-second-step">
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
            >{{ $t('label.back') }}</v-btn>
          </v-col>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'

export default {
  name: 'IdentitasPemohon',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    formIdentityApplicant: {
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
      step: 2,
      isSelecting: false,
      selectedFile: null,
      selectedFileName: '',
      isUpload: false,
      file: null
    }
  },
  computed: {
    isVaccineContent() {
      return this.$route.query.type === 'vaksin'
    }
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
      this.formIdentityApplicant.dataFile = this.file
    },
    async reloadData() {
      if (this.formIdentityApplicant.dataFile) {
        this.file = this.formIdentityApplicant.dataFile
        this.selectedFileName = this.file.name
        this.isUpload = true
      }
    },
    async onNext() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      EventBus.$emit('nextStep', this.step)
    },
    onPrev() {
      EventBus.$emit('prevStep', this.step)
    }
  }
}
</script>
<style lang="scss" scoped>
.text-small-second-step {
  font-size: 13px;
}
.float-right-second-step {
  float: right;
}
@media (max-width: 588px) and (min-width: 320px) {
  .btn-delete-mobile-second-step {
    display: block;
    margin: 10px;
  }
}
.v-alert::v-deep {
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  margin: 0 !important;

  .v-alert__content {
    color: #212121 !important;
  }
}
.v-alert--outlined::v-deep {
  background: #E3F2FD !important;
}
</style>
