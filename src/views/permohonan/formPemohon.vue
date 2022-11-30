<template>
  <div v-if="!isConfirm" class="background-landing-page landing-page-height">
    <div class="full-landing-page">
      <div class="header-landing-page">
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="8" xs="12">
            <v-row>
              <router-link :to="landingPage">
                <img height="40" width="40" src="@/static/logistik_logo_lingkar.svg">
              </router-link>
              <router-link :to="landingPage">
                <div class="title-page-form-pemohon">
                  {{
                    !isVaccineContent
                      ? $t('label.applicant_med_form_title')
                      : $t('label.applicant_vaccine_form_title')
                  }}
                </div>
              </router-link>
            </v-row>
          </v-col>
          <v-col cols="12" md="4" xs="12">
            <v-row class="float-right-landing-page">
              <a :href="linkTutorial" target="_blank"><v-icon color="white" size="25">{{ $t('label.icon_help') }}</v-icon></a>
              <a :href="linkTutorial" target="_blank"><div class="tutorial-class-form-pemohon pusat-bantuan-landing-page">{{ $t('label.tutorial') }}</div></a>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div class="header-landing-page-mobile">
        <div class="d-flex flex-row align-center justify-space-between py-3">
          <div class="d-flex flex-row align-center">
            <img height="40" src="../../static/logistik_logo_lingkar.svg">
            <div class="title-page-landing-page-mobile ml-4 pt-0">
              {{
                !isVaccineContent
                  ? $t('label.applicant_med_form_title')
                  : $t('label.applicant_vaccine_form_title')
              }}
            </div>
          </div>
          <a :href="linkTutorial" target="_blank">
            <v-icon color="white" size="25">
              {{ $t('label.icon_help') }}
            </v-icon>
          </a>
        </div>
      </div>
    </div>
    <div class="negative-landing-page">
      <v-card class="main-card-form-pemohon" outlined>
        <v-stepper v-model="step" class="stepper-margin-form-pemohon" :alt-labels="true">
          <v-stepper-header>
            <v-stepper-step class="left-margin-form-pemohon" :complete="step > 1" step="1">
              <center>{{ $t('label.step_title_1') }}</center>
            </v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="step > 2" step="2">
              <center>{{ $t('label.step_title_2') }}</center>
            </v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="step > 3" step="3">
              <center>{{ $t('label.step_title_3') }}</center>
            </v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="step > 4" class="right-margin-form-pemohon" step="4">
              <center>{{ $t('label.step_title_4') }}</center>
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <identitas-instansi-pemohon
                :form-applicant="formApplicant"
                :is-admin="isAdmin"
              />
            </v-stepper-content>
            <v-stepper-content step="2">
              <identitas-pemohon
                :form-identity-applicant="formIdentityApplicant"
                :instance-type="formApplicant.instanceType"
                :is-admin="isAdmin"
              />
            </v-stepper-content>
            <v-stepper-content step="3" class="px-0">
              <kebutuhan-logistik
                ref="updateData"
                :logistic-needs="logisticNeeds"
                :vaccine-support-list.sync="vaccineSupportList"
              />
            </v-stepper-content>
            <v-stepper-content step="4">
              <surat-permohonan
                :form-applicant="formApplicant"
                :applicant-letter="applicantLetter"
                :is-vaccine-content="isVaccineContent"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </div>
  </div>
  <div v-else>
    <tahap-konfirmasi
      :form-applicant="formApplicant"
      :form-identity-applicant="formIdentityApplicant"
      :logistic-needs="logisticNeeds"
      :vaccine-support-list="vaccineSupportList"
      :applicant-letter="applicantLetter"
    />
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'FormPermohonanLogistik',
  data() {
    return {
      step: 1,
      formApplicant: {},
      formIdentityApplicant: {},
      logisticNeeds: [],
      vaccineSupportList: [],
      applicantLetter: {},
      isConfirm: false,
      isAdmin: false
    }
  },
  computed: {
    isVaccineContent() {
      return this.$route.query.type === 'vaksin'
    },
    landingPage() {
      return '/landing-page'
    },
    linkTutorial() {
      return this.isVaccineContent
        ? 'https://bit.ly/PanduanPemohonVaksin'
        : this.$t('label.link_tutorial')
    }
  },
  created() {
    EventBus.$on('nextStep', (value) => {
      this.step = value + 1
      if (this.step === 3) {
        this.getDataForm()
      }
    })
    EventBus.$on('prevStep', (value) => {
      this.isConfirm = false
      this.step = value - 1
    })
    EventBus.$on('confirmStep', (value) => {
      this.applicantLetter = value
      this.formApplicant.letterNumber = value.name
      this.isConfirm = true
      this.step = 5
    })
  },
  methods: {
    getDataForm() {
      this.$refs.updateData?.getData(this.formApplicant.instanceType)
    }
  }
}
</script>
<style>
.landing-page-height {
 min-height: 100%;
}
.main-card-form-pemohon {
  margin: -50px 120px 30px 120px;
  padding-top: 100px;
}
.title-page-form-pemohon {
  padding: 5px 20px;
  font-size: 22px;
  color: white;
  line-height: 29px;
}
.left-margin-form-pemohon {
  margin-left: 200px;
}
.right-margin-form-pemohon {
  margin-right: 200px;
}
.stepper-margin-form-pemohon {
  margin: -100px -10px 0px -10px;
}
.tutorial-class-form-pemohon {
  font-family: 'Product Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
}
.btn-margin-positive {
  margin: 10px;
  float: right;
}
.btn-desktop {
  display:block;
}
.btn-mobile {
  display: none;
}
.margin-10 {
  margin: 10px;
}
@media (max-width: 588px) and (min-width: 320px) {
  .main-card-form-pemohon {
    margin: 150px 0px -30px 0px;
  }
  .left-margin-form-pemohon {
    margin-left: 0px;
  }
  .right-margin-form-pemohon {
    margin-right: 0px;
  }
  .stepper-margin-form-pemohon {
    margin: -200px -10px 0px -10px;
  }
  .btn-desktop {
    display: none;
  }
  .btn-mobile {
    display: block;
  }
  .left-margin {
    margin-left: 0px;
  }
  .right-margin {
    margin-right: 0px;
  }
  .stepper-margin {
    margin: -200px -10px 0px -10px;
  }
}
</style>
