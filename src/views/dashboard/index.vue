<template>
  <div v-if="true">
    <UnderDevelopment />
  </div>
  <v-container v-else fluid grid-list-xl py-0>
    <div>
      <v-row>
        <v-col>
          <div class="text-title-dashboard">{{ $t('label.dashboard_title') }}</div>
          <div class="text-last-update-dashboard">({{ $t('label.last_update') }}: {{ dataLogisticRequestSummary.last_update === null ? $t('label.stripe') : $moment(dataLogisticRequestSummary.last_update).format('LLL') }})</div>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row>
        <v-col>
          <v-card
            class="mx-auto"
            color="#16A75C"
          >
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-card-text>
                  <div>
                    <span class="text-card-source-dashboard text-card-white">{{ $t('label.dashboard_title_text') }}</span>
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-card
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col sm="12" md="4">
                    <v-list-item-title class="text-card-source-dashboard text-card-data-title">
                      <b>{{ $t('label.incoming_request_statistic') }}</b>
                    </v-list-item-title>
                    <div class="text-card-time-range text-card-time-range-space">{{ $t('label.dashboard_time_range') }}</div>
                    <date-picker-dashboard
                      :date="listQuery.start_date"
                      @selected="updateChart"
                    />
                    <v-list-item-title>
                      <div class="value-card-source-dashboard">
                        {{ currency(dataLogisticRequestSummary.total_request) }}
                      </div>
                      <small class="text-card-time-range value-card-prefix-color">
                        {{ $t('label.total_applicant') }}
                      </small>
                    </v-list-item-title>
                  </v-col>
                  <v-col sm="12" md="2" offset-md="1">
                    <div class="approved">
                      <div class="title-card-data amber--text darken-4">
                        <b>{{ $t('label.dashboard_unverified') }}</b>
                      </div>
                      <div class="value-card-data amber--text darken-4">
                        {{ currency(dataLogisticRequestSummary.total_unverified) }}
                      </div>
                      <a href="/#/alat-kesehatan/belum-terverifikasi">
                        <span class="in-full-text">
                          {{ $t('label.in_full') }}
                        </span>
                        <span>
                          <img class="in-full-image" src="../../static/in-full-icon.png">
                        </span>
                      </a>
                    </div>
                    <div class="verified space-data-card">
                      <div class="title-card-data light-blue--text darken-4">
                        <b>{{ $t('label.dashboard_verified') }}</b>
                      </div>
                      <div class="value-card-data light-blue--text darken-4">
                        {{ currency(dataLogisticRequestSummary.total_verified) }}
                      </div>
                      <a href="/#/alat-kesehatan/terverifikasi">
                        <span class="in-full-text">
                          {{ $t('label.in_full') }}
                        </span>
                        <span>
                          <img class="in-full-image" src="../../static/in-full-icon.png">
                        </span>
                      </a>
                    </div>
                    <div class="verified space-data-card">
                      <div class="title-card-data purple--text accent-4">
                        <b>{{ $t('label.dashboard_approved') }}</b>
                      </div>
                      <div class="value-card-data purple--text accent-4">
                        {{ currency(dataLogisticRequestSummary.total_approved) }}
                      </div>
                      <a href="/#/alat-kesehatan/belum-realisasi">
                        <span class="in-full-text">
                          {{ $t('label.in_full') }}
                        </span>
                        <span>
                          <img class="in-full-image" src="../../static/in-full-icon.png">
                        </span>
                      </a>
                    </div>
                  </v-col>
                  <v-col sm="12" md="2">
                    <div class="approved">
                      <div class="title-card-data green--text accent-4">
                        <b>{{ $t('label.dashboard_final') }}</b>
                      </div>
                      <div class="value-card-data green--text accent-4">
                        {{ currency(dataLogisticRequestSummary.total_final) }}
                      </div>
                      <a href="/#/alat-kesehatan/selesai-realisasi">
                        <span class="in-full-text">
                          {{ $t('label.in_full') }}
                        </span>
                        <span>
                          <img class="in-full-image" src="../../static/in-full-icon.png">
                        </span>
                      </a>
                    </div>
                    <div class="verified space-data-card">
                      <div class="title-card-data red-text">
                        <b>{{ $t('label.tracking_step4') }}</b>
                      </div>
                      <div class="value-card-data red-text">
                        {{ currency(dataLogisticRequestSummary.total_rejected) }}
                      </div>
                      <a href="/#/alat-kesehatan/ditolak">
                        <span class="in-full-text">
                          {{ $t('label.in_full') }}
                        </span>
                        <span>
                          <img class="in-full-image" src="../../static/in-full-icon.png">
                        </span>
                      </a>
                    </div>
                  </v-col>
                  <v-col md="3">
                    <summary-chart />
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <div v-if="dataLogisticRequestSummary.total_request > 0">
                  <v-row>
                    <v-col cols="12" sm="12" md="6">
                      <tools-type-chart />
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <applicant-instance-chart />
                    </v-col>
                  </v-row>
                  <v-row v-if="roles[0] !== 'dinkeskota'">
                    <v-col cols="12" sm="12" md="12">
                      <statistic-applicant-chart />
                    </v-col>
                  </v-row>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import EventBus from '@/utils/eventBus'
import FormatingNumber from '../../helpers/formattingNumber'
import UnderDevelopment from '../../components/UnderDevelopment'

export default {
  name: 'Dashboard',
  components: {
    UnderDevelopment
  },
  data() {
    return {
      baseURL: process.env.VUE_APP_URL,
      listQuery: {
        start_date: null,
        end_date: null
      }
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'dataLogisticRequestSummary'
    ]),
    ...mapState('user', [
      'roles',
      'app'
    ])
  },
  methods: {
    async getLogisticRequestSummary() {
      await this.$store.dispatch('logistics/getLogisticRequestSummary', this.listQuery)
    },
    async updateChart(value) {
      this.listQuery.start_date = value.startDate
      this.listQuery.end_date = value.endDate
      EventBus.$emit('getCityTotalRequest', this.listQuery)
      EventBus.$emit('getProductTotalRequest', this.listQuery)
      EventBus.$emit('getFaskesTypeTotalRequest', this.listQuery)
      EventBus.$emit('getLogisticRequestSummary', this.listQuery)
    },
    currency(value) {
      const formattingNumber = new FormatingNumber()
      return formattingNumber.formatCurrency(value)
    }
  }
}
</script>

<style>
  .text-title-dashboard {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    line-height: 29px;
  }
  .text-last-update-dashboard {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #828282;
  }
  .text-card-source-dashboard {
    font-family: 'Lato';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
  }
  .text-card-data-title {
    font-size: 20px;
  }
  .text-card-white {
    color: #FFFFFF !important;
  }
  .value-card-source-dashboard {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    line-height: 66px;
    display: flex;
    align-items: center;
    color: #1565C0;
    margin-top: -10px;
  }
  .margin-top-min-20-dashboard {
    margin-top: -20px;
  }
  .margin-bot-min-40-dashboard {
    margin-bottom: -40px;
  }
  .text-card-time-range {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
  }
  .text-card-time-range-space {
    padding: 10px 0;
  }
  .value-card-prefix-color {
    color: #1565C0;
  }
  .title-data-card {
    font-family: Lato;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
  }
  .green-text {
    color: #16A75C;
  }
  .dongker-text {
    color: #1A4373
  }
  .red-text {
    color: #E53935;
  }
  .purple-text {
    color: #8D24AA;
  }
  .value-card-data {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 42px;
    line-height: 37px;
    margin: 10px 0;
  }
  .in-full-text {
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 23px;
    color: #1565C0;
  }
  .in-full-image {
    padding-left: 5px;
  }
  .space-data-card {
    margin-top: 30px;
  }
</style>
