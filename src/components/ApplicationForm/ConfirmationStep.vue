<template>
  <div class="background-landing-page">
    <div class="full-landing-page main-page-data-confirmation">
      <div class="header-landing-page">
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="8" xs="12">
            <v-row>
              <router-link :to="landingPage">
                <v-img :max-width="40" src="../../static/logistik_logo_lingkar.svg" />
              </router-link>
              <router-link :to="landingPage">
                <div class="title-page-data-confirmation">
                  {{
                    !isVaccineContent
                      ? $t('label.applicant_med_form_title')
                      : $t('label.applicant_vaccine_form_title')
                  }}
                </div>
              </router-link>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div class="header-landing-page-mobile">
        <div class="d-flex flex-row align-center justify-space-between py-3">
          <div class="d-flex flex-row align-center">
            <img height="40" src="../../static/logistik_logo_lingkar.svg">
            <div class="title-page-landing-page-mobile ml-4 pt-0">
              {{ $t('label.applicant_med_form_title') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="negative-landing-page main-page-data-confirmation">
      <v-card class="main-card-data-confirmation" outlined>
        <div v-if="isLoading" class="mt-n5">
          <v-row align="center" justify="center">
            <img height="200" src="../../static/mengirim.svg">
          </v-row>
          <v-row align="center" justify="center" class="margin-wait-data-confirmation">
            {{ $t('label.wait') }}
          </v-row>
          <v-row align="center" justify="center" class="mt-5">
            {{ $t('label.loading_step_one') }}
          </v-row>
          <v-row align="center" justify="center">
            {{ $t('label.loading_step_two') }}
          </v-row>
        </div>
        <VaccineSuccess
          v-else-if="showVaccineSuccessPage"
          :request-id="requestId"
        />
        <div v-else-if="isDone" class="mt-n5">
          <v-row align="center" justify="center">
            <img height="200" src="../../static/berhasil.svg">
          </v-row>
          <v-row align="center" justify="center">
            <div class="save-style-data-confirmation">{{ $t('label.save_success') }}</div>
          </v-row>
          <v-row align="center" justify="center" class="confirmation-text mt-7">
            {{ $t('label.loading_done_one') }}
          </v-row>
          <v-row align="center" justify="center" class="confirmation-text mt-3">
            Jika Anda memiliki pertanyaan lebih lanjut, silahkan hubungi Hotline PIKOBAR pada nomor {{ hotlinePikobar }} atau melalui e-mail kami di digital.service@jabarprov.go.id.
          </v-row>
          <EmoticonRating
            class="ma-10"
            @rated="(score) => { rateValue = score }"
          />
          <v-row align="center" justify="center" class="mt-3 mb-15">
            <JDSButton inverted height="38px" @click="onBack">
              {{ $t('label.back') }}
            </JDSButton>
          </v-row>
        </div>
        <div v-else>
          <div class="data-confirmation-text">{{ $t('label.confirm_data') }}</div>
          <hr>
          <div class="main-color-data-confirmation">{{ $t('label.instance_identity') }}</div>
          <v-row>
            <v-col>
              <v-card class="mx-auto" outlined>
                <v-row>
                  <v-col class="margin-20">
                    <v-row class="margin-top-min-15">
                      <v-col>
                        <span class="main-color-data-confirmation">{{ $t('label.instance_type') }}</span>
                        <br>
                        <v-label>{{ formApplicant.instanceTypeName }}</v-label>
                      </v-col>
                      <v-col>
                        <span class="main-color-data-confirmation">{{ $t('label.city_district') }}</span>
                        <br>
                        <v-label>{{ formApplicant.cityNameId.text || formApplicant.cityNameId.name }}</v-label>
                      </v-col>
                      <v-col>
                        <span class="main-color-data-confirmation">{{ $t('label.full_address') }}</span>
                        <br>
                        <v-label>{{ formApplicant.fullAddress }}</v-label>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <span class="main-color-data-confirmation">{{ $t('label.instance_name') }}</span>
                        <br>
                        <v-label v-if="formApplicant.instanceEtc">{{ formApplicant.instanceEtc }}</v-label>
                        <v-label v-else>{{ formApplicant.instanceName }}</v-label>
                      </v-col>
                      <v-col>
                        <span class="main-color-data-confirmation">{{ $t('label.select_sub_district_full_name') }}</span>
                        <br>
                        <v-label>{{ formApplicant.districtNameId.text || formApplicant.districtNameId.name }}</v-label>
                      </v-col>
                      <v-col />
                    </v-row>
                    <v-row>
                      <v-col>
                        <span class="main-color-data-confirmation">{{ $t('label.number_phone') }}</span>
                        <br>
                        <v-label>{{ formApplicant.instancePhoneNumber }}</v-label>
                      </v-col>
                      <v-col>
                        <span class="main-color-data-confirmation">{{ $t('label.village') }}</span>
                        <br>
                        <v-label>{{ formApplicant.villageNameId.text || formApplicant.villageNameId.name }}</v-label>
                      </v-col>
                      <v-col />
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <div class="main-color-data-confirmation">{{ $t('label.step_title_2') }}</div>
          <v-card class="mx-auto" outlined>
            <v-row>
              <v-col cols="7" class="margin-20">
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span class="main-color-data-confirmation">{{ $t('label.contact_person') }}</span>
                    <br>
                    <v-label>{{ formIdentityApplicant.applicantName }}</v-label>
                  </v-col>
                  <v-col>
                    <span class="main-color-data-confirmation">{{ $t('label.capital_email') }}</span>
                    <br>
                    <v-label>{{ formIdentityApplicant.applicantEmail }}</v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="main-color-data-confirmation">{{ $t('label.applicant_position_identity') }}</span>
                    <br>
                    <v-label>{{ formIdentityApplicant.applicantPosition }}</v-label>
                  </v-col>
                  <v-col>
                    <span class="main-color-data-confirmation">{{ $t('label.applicant_phone') }}</span>
                    <br>
                    <v-label>{{ formIdentityApplicant.applicantPhoneNumber }}</v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col offset-md="6" offset-sm="6">
                    <span class="main-color-data-confirmation">{{ $t('label.applicant_phone_sub') }}</span>
                    <br>
                    <v-label>{{ formIdentityApplicant.applicantPhoneNumber2 }}</v-label>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="4" class="margin-20">
                <span class="main-color-data-confirmation">{{ $t('label.applicant_ktp') }}</span>
                <br>
                <img v-if="formIdentityApplicant.dataFile.type !== 'application/pdf'" class="image-style-data-confirmation" :src="url">
                <a v-else :href="url" target="_blank" class="download-button py-1 px-3">
                  {{ $t('label.download') }}
                </a>
              </v-col>
            </v-row>
          </v-card>
          <div class="main-color-data-confirmation">{{ $t('label.step_title_4') }}</div>
          <v-card outlined class="py-3">
            <v-row class="ml-2">
              <v-col cols="1" md="1">
                <span class="main-color-data-confirmation">#</span>
              </v-col>
              <v-col cols="3" md="3">
                <span class="main-color-data-confirmation">{{ $t('label.letter_number') }}</span>
              </v-col>
            </v-row>
            <v-row class="ml-2">
              <v-col cols="1" md="1">
                <span>1</span>
              </v-col>
              <v-col cols="3" md="3">
                <span class="grey--text">{{ formApplicant.letterNumber }}</span>
              </v-col>
              <v-col>
                <a
                  :href="urlLetter"
                  target="_blank"
                  class="download-button py-1 px-3"
                >
                  {{ $t('label.download') }}
                </a>
              </v-col>
            </v-row>
          </v-card>
          <div v-if="formApplicant.instanceType <= 3">
            <div class="main-color-data-confirmation">Detail Kondisi Fasilitas Kesehatan</div>
            <v-card class="mx-auto" outlined>
              <v-col>
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span class="main-color-data-confirmation">Jumlah Pasien COVID-19 yang ditangani</span>
                    <br>
                    <v-label>
                      {{ applicantLetter.total_covid_patients | '-' }} Orang
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="main-color-data-confirmation">Jumlah Tempat Tidur</span>
                    <br>
                    <v-label>
                      {{ applicantLetter.total_bedroom | '-' }} Tempat Tidur
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="main-color-data-confirmation">Jumlah Ruang Isolasi</span>
                    <br>
                    <v-label>
                      {{ applicantLetter.total_isolation_room | '-' }} Ruangan
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="main-color-data-confirmation">Jumlah Tenaga Kesehatan</span>
                    <br>
                    <v-label>
                      {{ applicantLetter.total_health_worker | '-' }} Orang
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
            </v-card>
          </div>
          <div class="main-color-data-confirmation">
            {{ isVaccineContent
              ? $t('label.list_vaccine_need')
              : $t('label.list_logistic_need')
            }}
          </div>
          <v-card outlined>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
                    <th class="text-left">{{ $t('label.apd_name_specification') }}</th>
                    <th v-if="!isVaccineContent" class="text-left">{{ $t('label.description') }}</th>
                    <th class="text-left">{{ $t('label.total') }}</th>
                    <th class="text-left">{{ $t('label.unit') }}</th>
                    <th class="text-left">{{ $t('label.purpose') }}</th>
                    <th v-if="isVaccineContent" class="text-left">{{ $t('label.note') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="logisticNeeds.length === 0">
                    <td class="text-center-data-confirmation" :colspan="7">{{ $t('label.no_data') }}</td>
                  </tr>
                  <tr v-for="(item, index) in dataShow" v-else :key="item.index">
                    <td>{{ getTableRowNumbering(index) }}</td>
                    <td>{{ item.unitName || '-' }}</td>
                    <td v-if="!isVaccineContent">{{ item.description || '-' }}</td>
                    <td>{{ item.total || '-' }}</td>
                    <td>{{ isVaccineContent ? item.unitId : item.unitList[0].unit }}</td>
                    <td>{{ item.purpose || '-' }}</td>
                    <td v-if="isVaccineContent">{{ item.note || '-' }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
          <div v-if="isVaccineContent" class="main-color-data-confirmation">
            {{ $t('label.list_vaccine_support_need') }}
          </div>
          <v-card v-if="isVaccineContent" outlined>
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
                  <tr v-if="vaccineSupportList.length === 0">
                    <td class="text-center-data-confirmation" :colspan="7">{{ $t('label.no_data') }}</td>
                  </tr>
                  <tr v-for="(item, index) in vaccineSupportList" v-else :key="item.index">
                    <td>{{ getTableRowNumbering(index) }}</td>
                    <td>{{ item.unitName || '-' }}</td>
                    <td>{{ item.description || '-' }}</td>
                    <td>{{ item.total || '-' }}</td>
                    <td>{{ item.unitId || '-' }}</td>
                    <td>{{ item.purpose || '-' }}</td>
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
          <v-row justify="end">
            <v-btn class="ml-5 white--text" min-width="140px" color="success" outlined @click="onPrev()">{{ $t('label.back') }}</v-btn>
            <v-btn class="ml-5 white--text" min-width="140px" color="success" @click="submitData">{{ $t('label.save') }}</v-btn>
          </v-row>
        </div>
      </v-card>
    </div>
    <div class="full-landing-page main-page-mobile-data-confirmation">
      <div class="ml-10 mb-3">
        <div class="d-flex flex-row align-center justify-space-between py-3">
          <div class="d-flex flex-row align-center">
            <img height="40" src="../../static/logistik_logo_lingkar.svg">
            <div class="title-page-landing-page-mobile ml-4 pt-0">
              {{ $t('label.applicant_med_form_title') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-page-mobile-data-confirmation bg-mobile-data-confirmation">
      <div v-if="isLoading" class="mt-n12">
        <v-row align="center" justify="center">
          <img height="200" src="../../static/mengirim.svg">
        </v-row>
        <v-row align="center" justify="center" class="margin-wait-data-confirmation text-center-data-confirmation">
          {{ $t('label.wait') }}
        </v-row>
        <v-row class="text-center mr-1 ml-1 mt-3">{{ $t('label.loading_step_one') + $t('label.loading_step_two') }}</v-row>
      </div>
      <VaccineSuccess
        v-else-if="showVaccineSuccessPage"
        :request-id="requestId"
      />
      <div v-else-if="isDone" class="mt-n12">
        <v-row align="center" justify="center">
          <img height="200" src="../../static/berhasil.svg">
        </v-row>
        <v-row align="center" justify="center">
          <div class="save-style-data-confirmation text-center-data-confirmation">{{ $t('label.save_success') }}</div>
        </v-row>
        <v-row class="text-center mr-1 ml-1 mt-5">{{ $t('label.loading_done_one') }}</v-row>
        <v-row class="text-center mr-1 ml-1 mt-3">
          Jika Anda memiliki pertanyaan lebih lanjut, silahkan hubungi Hotline PIKOBAR pada nomor {{ hotlinePikobar }} atau melalui e-mail kami di digital.service@jabarprov.go.id.
        </v-row>
        <EmoticonRating
          class="ma-10"
          @rated="(score) => { rateValue = score }"
        />
        <v-row justify="center" class="mt-3 mb-15">
          <JDSButton inverted height="38px" @click="onBack">
            {{ $t('label.back') }}
          </JDSButton>
        </v-row>
      </div>
      <div v-else>
        <v-row class="margin-top-min-50-data-confirmation">
          <v-col class="ml-1 mr-1">
            <v-label class="title"><b>{{ $t('label.confirm_data') }}</b></v-label>
          </v-col>
        </v-row>
        <hr>
        <div class="mr-1 ml-1">
          <div class="main-color-data-confirmation">{{ $t('label.instance_identity') }}</div>
          <v-card class="mx-auto" outlined>
            <v-col>
              <v-row class="margin-top-min-15">
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.instance_type') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.instanceTypeName }}</v-label>
                </v-col>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.city_district') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.cityNameId.name }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.instance_name') }}</b></span>
                  <br>
                  <v-label v-if="formApplicant.instanceEtc">{{ formApplicant.instanceEtc }}</v-label>
                  <v-label v-else>{{ formApplicant.instanceName }}</v-label>
                </v-col>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.select_sub_district_full_name') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.districtNameId.name }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.number_phone') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.instancePhoneNumber }}</v-label>
                </v-col>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.village') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.villageNameId.name }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.full_address') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.fullAddress }}</v-label>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </div>
        <br>
        <div class="mr-1 ml-1">
          <div class="main-color-data-confirmation">{{ $t('label.step_title_2') }}</div>
          <v-card class="mx-auto" outlined>
            <v-col>
              <v-row class="margin-top-min-15">
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.contact_person') }}</b></span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantName }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.applicant_position_identity') }}</b></span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantPosition }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.email') }}</b></span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantEmail }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.applicant_phone') }}</b></span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantPhoneNumber }}</v-label>
                </v-col>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.applicant_phone_sub') }}</b></span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantPhoneNumber2 }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.applicant_ktp') }}</b></span>
                  <br>
                  <img class="image-style-data-confirmation" :src="url">
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </div>
        <div class="mr-1 ml-1">
          <div class="main-color-data-confirmation">{{ $t('label.step_title_4') }}</div>
          <v-card class="mx-auto" outlined>
            <v-row class="mr-1 ml-1">
              <v-col cols="8" sm="8">
                <span>{{ letterName }}</span>
              </v-col>
              <v-col cols="4" sm="4">
                <v-btn :href="urlLetter" x-small target="_blank">{{ $t('label.download') }}</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <div v-if="formApplicant.instanceType <= 3" class="mr-1 ml-1">
          <div class="main-color-data-confirmation">Detail Kondisi Fasilitas Kesehatan</div>
          <v-card class="mx-auto" outlined>
            <v-col>
              <v-row class="margin-top-min-15">
                <v-col>
                  <span class="main-color-data-confirmation">Jumlah Pasien COVID-19 yang ditangani</span>
                  <br>
                  <v-label>
                    {{ applicantLetter.total_covid_patients | '-' }} Orang
                  </v-label>
                </v-col>
                <v-col>
                  <span class="main-color-data-confirmation">Jumlah Tempat Tidur</span>
                  <br>
                  <v-label>
                    {{ applicantLetter.total_bedroom | '-' }} Tempat Tidur
                  </v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="main-color-data-confirmation">Jumlah Ruang Isolasi</span>
                  <br>
                  <v-label>
                    {{ applicantLetter.total_isolation_room | '-' }} Ruangan
                  </v-label>
                </v-col>
                <v-col>
                  <span class="main-color-data-confirmation">Jumlah Tenaga Kesehatan</span>
                  <br>
                  <v-label>
                    {{ applicantLetter.total_health_worker | '-' }} Orang
                  </v-label>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </div>
        <div class="mr-1 ml-1">
          <div class="main-color-data-confirmation">{{ $t('label.list_logistic_need') }}</div>
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
                    <td class="text-center-data-confirmation" :colspan="7">{{ $t('label.no_data') }}</td>
                  </tr>
                  <tr v-for="(item, index) in dataShow" v-else :key="item.index">
                    <td>{{ getTableRowNumbering(index) }}</td>
                    <td>{{ item.unitList[0].name }}</td>
                    <td>{{ item.brand }}</td>
                    <td>{{ item.total }}</td>
                    <td>{{ item.unitList[0].unit }}</td>
                    <td>{{ item.purpose }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </div>
        <v-pagination
          v-model="listQuery.page"
          :length="total"
          :total-visible="3"
          @input="onNext"
        />
        <hr>
        <v-row>
          <v-col cols="5" sm="5">
            <v-btn class="ml-5 white--text" min-width="140px" color="success" outlined @click="onPrev()">{{ $t('label.back') }}</v-btn>
          </v-col>
          <v-col cols="5" sm="5">
            <v-btn class="ml-5 white--text" min-width="140px" color="success" @click="submitData">{{ $t('label.save') }}</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
import VaccineSuccess from './VaccineSuccess.vue'
import EmoticonRating from '@/components/EmoticonRating'
import JDSButton from '@/components/Base/JDSButton'

export default {
  name: 'TahapKonfirmasi',
  components: {
    VaccineSuccess,
    EmoticonRating,
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
      default: () => []
    },
    vaccineSupportList: {
      type: Array,
      default: () => []
    },
    applicantLetter: {
      type: Object,
      default: null
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
      requestId: null,
      hotlinePikobar: process.env.VUE_APP_HOTLINE_PIKOBAR_ALKES,
      rateValue: null
    }
  },
  computed: {
    showVaccineSuccessPage() {
      return this.isVaccineContent && this.isDone
    },
    isVaccineContent() {
      return this.$route.query.type === 'vaksin'
    },
    landingPage() {
      return '/landing-page'
    }
  },
  mounted() {
    this.letterName = this.applicantLetter.name
    this.url = URL.createObjectURL(this.formIdentityApplicant.dataFile)
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
      let dataLogistics = []
      let dataVaccineSupportList = []

      if (this.isVaccineContent) {
        dataLogistics = this.logisticNeeds.map(element => {
          return {
            usage: element.purpose,
            priority: element.urgency,
            product_id: element.apd,
            brand: element.brand,
            quantity: element.total,
            unit: element.unitId,
            description: element.description,
            note: element.note,
            category: 'vaccine'
          }
        })
        dataVaccineSupportList = this.vaccineSupportList.map(element => {
          return {
            usage: element.purpose,
            product_id: element.apd,
            quantity: element.total,
            unit: element.unitId,
            description: element.description,
            note: element.note,
            category: 'vaccine_support'
          }
        })
      } else {
        dataLogistics = this.logisticNeeds.map(element => {
          return {
            usage: element.purpose,
            priority: element.urgency,
            product_id: element.apd,
            brand: element.brand,
            quantity: element.total,
            unit: element.unitId,
            description: element.description
          }
        })
      }

      const formData = new FormData()
      formData.append('logistic_request', JSON.stringify([...dataLogistics, ...dataVaccineSupportList]))
      formData.append('agency_type', this.formApplicant.instanceType.id)
      if (this.formApplicant.instanceEtc) {
        formData.append('agency_name', this.formApplicant.instanceEtc)
      } else {
        formData.append('agency_name', this.formApplicant.instanceName)
        formData.append('master_faskes_id', this.formApplicant.instance.id)
      }
      if (this.formApplicant.instancePhoneNumber != null) {
        formData.append('phone_number', this.formApplicant.instancePhoneNumber)
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
      formData.append('is_letter_file_final', this.applicantLetter.is_letter_file_final)
      formData.append('total_covid_patients', this.applicantLetter.total_covid_patients ?? 0)
      formData.append('total_isolation_room', this.applicantLetter.total_isolation_room ?? 0)
      formData.append('total_bedroom', this.applicantLetter.total_bedroom ?? 0)
      formData.append('total_health_worker', this.applicantLetter.total_health_worker ?? 0)
      formData.append('applicant_file', this.formIdentityApplicant.dataFile)
      formData.append('source_data', 'pikobar')
      formData.append('url', location.host + '/#')
      const actionName = this.isVaccineContent
        ? 'logistics/postApplicantVaksinAdmin'
        : 'logistics/postApplicantForm'
      const response = await this.$store.dispatch(actionName, formData)
      this.requestId = response.data.id
      this.isDone = response.status === 200 || response.status === 201
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
    async onBack() {
      await this.submitFeedbackRating()
      this.$router.push('/landing-page')
    },
    submitFeedbackRating() {
      if (this.rateValue) {
        const payload = {
          phase: 'request',
          score: this.rateValue,
          agency_id: this.requestId
        }
        this.$store.dispatch('logistics/giveRating', payload)
      }
    }
  }
}
</script>
<style>
  .main-card-data-confirmation {
    padding: 30px;
    margin: 10px 120px 30px 120px;
  }
  .data-confirmation-text {
    font-size: 20px;
    font-weight: bold;
  }
  .main-color-data-confirmation {
    color: #27ae60;
    font-weight: bold;
    margin-top: 20px !important;
  }
  .image-style-data-confirmation {
    max-width: 100%;
    max-height: 500px;
  }
  .main-page-data-confirmation {
    display: block;
  }
  .main-page-mobile-data-confirmation {
    display: none;
  }
  .margin-top-min-50-data-confirmation {
    margin-top: -50px;
  }
  .margin-20-data-confirmation {
    margin: 20px;
  }
  .margin-instance-mobile-data-confirmation {
    margin: -20px 20px 0px 20px
  }
  .margin-wait-data-confirmation {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .save-style-data-confirmation {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .text-center-data-confirmation {
    text-align: center;
  }
  .title-page-data-confirmation {
    padding: 5px 20px;
    font-size: 22px;
    color: white;
    line-height: 29px;
  }
  .confirmation-text {
    text-align: center;
    padding-left: 75px;
    padding-right: 75px;
  }
@media (max-width: 588px) and (min-width: 320px) {
  .main-page-mobile-data-confirmation {
    display: block;
  }
  .main-page-data-confirmation {
    display: none;
  }
  .bg-mobile-data-confirmation {
    background-color: white !important;
  }
}
</style>
<style lang="scss" scoped>
.download-button {
  border-style: solid;
  border-radius: 8px;
  border-color: #4caf50;
  border-width: 1px;
}
</style>
