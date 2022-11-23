<template>
  <div class="container mb-10">
    <!-- Detail title -->
    <div class="table-title mb-4">
      {{ detailTitle }}
    </div>
    <!-- Alert -->
    <v-card
      v-if="detailLogisticRequest.status === 'NOT_VERIFIED'"
      class="mx-auto mb-4"
      color="#219653"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span class="text-wrap" style="color: white">{{ $t('label.verify_text_alert_1') }}<b>{{ $t('label.verify_text_alert_2') }}</b> {{ $t('label.verify_text_alert_3') }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <!-- Detail info -->
    <DetailInfo :items="infoDetail" />

    <div class="mt-10 d-flex flex-row flex-wrap min-width-full">
      <!-- Request Urgency -->
      <CardStatus
        v-for="(item, index) in statusDetail"
        :key="item.type"
        :type="item.type"
        :title="item.title"
        :content="item.content"
        :strong="item.strong"
        :length="statusDetail.length"
        :button-label="item.button_label"
        :class="{ 'ml-auto': index === 1 }"
        @change-urgency="urgencyChange(detailLogisticRequest.applicant.id, !detailLogisticRequest.is_urgency)"
        @restore-status="restoreStatus(detailLogisticRequest.applicant.agency_id)"
      />
    </div>
    <!-- Letter -->
    <div class="mt-5">
      <CardLetter
        title="Surat Permohonan"
        :letter="detailLogisticRequest.letter"
        @update="updateLetter"
      />
    </div>

    <!-- Instance -->
    <div v-for="item in identityDetail" :key="item.title" class="mt-5">
      <CardIdentity
        :items="item"
        @update-agency="showAgencyIdentityDialog"
        @update-applicant="showApplicantIdentityDialog"
        @hide="hideIdentity"
        @show="showIdentity"
      />
    </div>

    <!-- Logistic request -->
    <div class="mt-5">
      <CardLogistic
        title="Daftar Kebutuhan Logistik"
        :items="logisticItems"
        :status="detailLogisticRequest.status"
        @update="updateItem"
        @hide="hideLogisticRequest"
        @show="showLogisticRequest"
      />
    </div>
    <div v-if="displayAdditionalItem" class="mt-5">
      <CardLogistic
        title="Daftar Barang Rekomendasi Salur Lainnya"
        :items="logisticItemsRealization"
        :status="detailLogisticRequest.status"
        :is-admin-realization="true"
        @update="updateItem"
        @hide="hideAdminRealization"
        @show="showAdminRealization"
      >
        <template v-slot:item-prop="{ item }">
          <span class="mx-1">
            <JDSButton inverted danger height="25px" width="75px" @click="deleteRealization(item)">
              <span>{{ 'Hapus' }}</span>
            </JDSButton>
          </span>
        </template>
        <div v-if="displayButtonAddItem" class="d-flex justify-end ml-auto mt-7">
          <JDSButton inverted height="42px" @click="addRealizationAdmin()">
            <v-icon left dark>mdi-archive-plus-outline</v-icon>
            <span>{{ 'Tambah Barang' }}</span>
          </JDSButton>
        </div>
      </CardLogistic>
    </div>
    <!-- Footer -->
    <div>
      <ActionButton
        :stage="detailLogisticRequest.status"
        @verif-confirmation="submitVerification"
        @recommend="submitRecommendation"
        @realize="submitRealization"
        @show-note="showDialogReasonReject = true"
        @reject-approval="showDialogReject = true"
        @reject-verification="showDialogReject = true"
      />
    </div>
    <DialogDelete
      :dialog="dialogDelete"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialogDelete"
      :delete-date.sync="dataDelete"
      :store-path-delete="`logistics/deleteRealization`"
      @get-logistic-realization="getLogisticAdditionalRealization"
    />
    <rejectKebutuhanLogistik
      :show="showDialogReject"
      :item="detailLogisticRequest"
      :total="itemsRequest.total"
      @submitReject="rejectData"
    />
    <reasonDeniedLogisticNeeds
      :show="showDialogReasonReject"
      :item="detailLogisticRequest"
      :total="itemsRequest.total"
    />
    <updateKebutuhanLogistik ref="updateForm" :show="showForm" />
    <dialogReturn ref="dialogReturnForm" :show="showReturnForm" />
    <dialogUrgency ref="dialogUrgencyForm" :show="showUrgencyForm" />
    <updateLetter ref="dialogUpdateLetterForm" :show="updateLetterForm" />
    <agencyIdentity ref="agencyIdentityForm" :show="showAgencyIdentity" />
    <applicantIdentity ref="dialogApplicantIdentityForm" :show="showApplicantIdentity" />
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'
import agencyIdentity from './agencyIdentity'
import updateKebutuhanLogistik from './update'
import rejectKebutuhanLogistik from './reject'
import applicantIdentity from './applicantIdentity'
import JDSButton from '@/components/Base/JDSButton'
import DialogDelete from '@/components/DialogDelete'
import { formatDatetime } from '@/utils/parseDatetime'
import reasonDeniedLogisticNeeds from './reasonReject'
import updateLetter from '@/views/pengajuanLogistik/updateLetter'
import dialogReturn from '@/views/pengajuanLogistik/dialogReturn'
import dialogUrgency from '@/views/pengajuanLogistik/dialogUrgency'
import DetailInfo from '@/components/RequestLogistic/Detail/info.vue'
import CardStatus from '@/components/RequestLogistic/Detail/status.vue'
import CardLetter from '@/components/RequestLogistic/Detail/letter.vue'
import CardIdentity from '@/components/RequestLogistic/Detail/identity.vue'
import CardLogistic from '@/components/RequestLogistic/Detail/logistic.vue'
import ActionButton from '@/components/RequestLogistic/Detail/ActionButton.vue'
export default {
  name: 'DetailRealization',
  components: {
    DialogDelete,
    JDSButton,
    DetailInfo,
    CardStatus,
    CardLetter,
    CardIdentity,
    CardLogistic,
    ActionButton,
    updateLetter,
    dialogUrgency,
    dialogReturn,
    agencyIdentity,
    applicantIdentity,
    updateKebutuhanLogistik,
    rejectKebutuhanLogistik,
    reasonDeniedLogisticNeeds
  },
  data() {
    return {
      showDialogReasonReject: false,
      showDialogReject: false,
      detailTitle: null,
      dataDelete: null,
      isRequestOpen: false,
      isRealizationOpen: false,
      isRecommendationOpen: false,
      isIdentityApplicantOpen: false,
      isAdminRealizationOpen: false,
      isAdminRecommendationOpen: false,
      isCreate: false,
      showForm: false,
      dialogDelete: false,
      showReturnForm: false,
      showUrgencyForm: false,
      updateLetterForm: false,
      showAgencyIdentity: false,
      showApplicantIdentity: false,
      itemsRequest: [],
      itemsRecommendation: [],
      itemsRealization: [],
      logisticItems: [],
      itemsRecommendationAdmin: [],
      itemsRealizationAdmin: [],
      logisticItemsRealization: [],
      listQuery: {},
      headersRequest: [
        { text: 'No', sortable: false },
        { text: 'Nama Barang', sortable: false },
        { text: 'Deskripsi', sortable: false },
        { text: 'Jumlah', sortable: false },
        { text: 'Satuan', sortable: false },
        { text: 'Jenis Barang', sortable: false }
      ],
      headersRecommendationRealization: [
        { text: 'No', sortable: false },
        { text: 'Nama Barang', sortable: false },
        { text: 'Deskripsi', sortable: false },
        { text: 'Jumlah', sortable: false },
        { text: 'Satuan', sortable: false },
        { text: 'Status', sortable: false },
        { text: 'Aksi', sortable: false }
      ],
      dataUrgencyConfirmation: {
        id: null,
        agency_name: '-',
        applicant: {
          application_letter_number: '-',
          applicant_name: '-'
        }
      },
      infoDetail: [],
      statusDetail: [],
      identityDetail: []
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'detailLogisticRequest',
      'listStock'
    ]),
    letterUrl() {
      return this.detailLogisticRequest?.letter?.letter ?? '-'
    },
    letterName() {
      return this.detailLogisticRequest?.applicant?.application_letter_number || '-'
    },
    displayButtonAddItem() {
      const statusAllowed = ['VERIFIED', 'APPROVED']
      return this.checkStatusAllowed(statusAllowed)
    },
    displayAdditionalItem() {
      const statusAllowed = ['VERIFIED', 'APPROVED', 'FINALIZED', 'APPROVAL_REJECTED']
      return this.checkStatusAllowed(statusAllowed)
    }
  },
  async created() {
    await this.getDetail()
    await this.setDefaultDisplayTable(this.detailLogisticRequest.status)
    this.listQuery.agency_id = this.$route.params.id
    EventBus.$on('hideUpdateLetter', (value) => {
      this.updateLetterForm = false
      if (value) {
        this.getDetail()
      }
    })
    EventBus.$on('dialogUrgencyConfirmation', (value) => {
      this.showUrgencyForm = false
      if (value) {
        this.getDetail()
      }
    })
    EventBus.$on('dialogReturnConfirmation', async(value) => {
      this.showReturnForm = false
      if (value) {
        await this.getDetail()
        await this.setDefaultDisplayTable(this.detailLogisticRequest.status)
      }
    })
    EventBus.$on('hideAgencyIdentity', (value) => {
      this.showAgencyIdentity = false
      if (value) {
        this.getDetail()
      }
    })
    EventBus.$on('hideApplicantIdentity', (value) => {
      this.showApplicantIdentity = false
      if (value) {
        this.getDetail()
      }
    })
    EventBus.$on('dialogHide', (value) => {
      this.showForm = value
      this.getLogisticRequest()
      this.getLogisticAdditionalRealization()
    })
    EventBus.$on('dialogHideReject', (value) => {
      this.showDialogReject = value
      this.showDialogReasonReject = value
    })
  },
  methods: {
    formatDatetime,
    checkStatusAllowed(status) {
      return status.some(el => this.detailLogisticRequest.status === el)
    },
    setFormData() {
      const formData = new FormData()
      formData.append('agency_id', this.detailLogisticRequest.agency.id)
      formData.append('applicant_id', this.detailLogisticRequest.applicant.id)
      formData.append('url', location.host + '/#')
      return formData
    },
    async submitRealization() {
      try {
        const formData = this.setFormData()
        formData.append('approval_status', 'approved')
        await this.$store.dispatch('logistics/postFinalStatus', formData)
        await this.getDetail()
        await this.setDefaultDisplayTable(this.detailLogisticRequest.status)
      } catch (err) {
        return err
      }
    },
    async submitRecommendation() {
      try {
        const formData = this.setFormData()
        formData.append('approval_status', 'approved')
        await this.$store.dispatch('logistics/postApprovalStatus', formData)
        await this.getDetail()
        await this.setDefaultDisplayTable(this.detailLogisticRequest.status)
      } catch (err) {
        return err
      }
    },
    async submitVerification() {
      try {
        const formData = this.setFormData()
        formData.append('verification_status', 'verified')
        await this.$store.dispatch('logistics/postVerificationStatus', formData)
        await this.getDetail()
        await this.setDefaultDisplayTable(this.detailLogisticRequest.status)
      } catch (err) {
        return err
      }
    },
    rejectData(value) {
      this.showDialogReject = false
      try {
        const formData = this.setFormData()
        if (this.detailLogisticRequest.status === 'VERIFIED') {
          formData.append('approval_status', 'rejected')
          formData.append('approval_note', value)
          this.postRejectApproval(formData)
        } else {
          formData.append('verification_status', 'rejected')
          formData.append('note', value)
          this.postReject(formData)
        }
      } catch (err) {
        return err
      }
    },
    async postRejectApproval(formData) {
      await this.$store.dispatch('logistics/postApprovalStatus', formData)
      await this.getDetail()
      await this.setDefaultDisplayTable(this.detailLogisticRequest.status)
    },
    async postReject(formData) {
      await this.$store.dispatch('logistics/postVerificationStatus', formData)
      await this.getDetail()
      await this.setDefaultDisplayTable(this.detailLogisticRequest.status)
    },
    showApplicantIdentityDialog() {
      this.$refs.dialogApplicantIdentityForm.setData(this.detailLogisticRequest.agency.id, this.detailLogisticRequest)
      this.showApplicantIdentity = true
    },
    showAgencyIdentityDialog() {
      this.$refs.agencyIdentityForm.setData(this.detailLogisticRequest.agency.id, this.detailLogisticRequest)
      this.showAgencyIdentity = true
    },
    restoreStatus(id) {
      this.showReturnForm = true
      this.dataReturnConfirmation = this.detailLogisticRequest
      this.$refs.dialogReturnForm.setData(id, this.dataReturnConfirmation)
    },
    urgencyChange(id, value) {
      this.showUrgencyForm = true
      this.dataUrgencyConfirmation = this.detailLogisticRequest
      this.$refs.dialogUrgencyForm.setData(id, Number(value), this.dataUrgencyConfirmation)
    },
    updateLetter() {
      this.$refs.dialogUpdateLetterForm.setData(this.detailLogisticRequest.letter.agency_id, this.detailLogisticRequest)
      this.updateLetterForm = true
    },
    async getDetail() {
      this.infoDetail = []
      this.statusDetail = []
      this.identityDetail = []
      const res = await this.$store.dispatch('logistics/getListDetailLogisticRequest', this.$route.params.id)
      if (!res.data) {
        this.$router.push('/dashboard')
        return
      }
      // Info
      this.setDataInfo()
      // Status
      this.setDataStatus()
      // identitas instansi
      this.setDataIdentity()
    },
    setDataInfo() {
      this.infoDetail.push({
        title: 'Tanggal Pengajuan',
        value: this.formatDatetime(this.detailLogisticRequest?.info?.created_at, 'DD MMMM YYYY') || '-'
      },
      {
        title: 'Status',
        value: this.setStatusLabel(this.detailLogisticRequest?.status) || '-'
      },
      {
        title: 'Disetujui oleh',
        value: this.detailLogisticRequest?.info?.approved_by || '-'
      },
      {
        title: 'Nomor ID',
        value: this.detailLogisticRequest?.info?.id || '-'
      })
    },
    setDataStatus() {
      if (this.detailLogisticRequest.is_urgency) {
        this.statusDetail.push({
          type: 'urgent',
          title: 'Urgensi Permohonan',
          content: 'Permohonan ini adalah',
          strong: 'Permohonan Darurat',
          button_label: 'DARURAT!'
        })
      } else {
        this.statusDetail.push({
          type: 'regular',
          title: 'Urgensi Permohonan',
          content: 'Tandai permohonan sebagai',
          strong: 'darurat',
          button_label: 'TANDAI DARURAT'
        })
      }

      if (this.checkStatusAllowed(['VERIFIED', 'APPROVED', 'VERIFICATION_REJECTED', 'APPROVAL_REJECTED'])) {
        this.statusDetail.push({
          type: 'status-request',
          title: 'Status Permohonan',
          content: 'Permohonan ini berada pada tahapan',
          strong: this.setStatusLabel(this.detailLogisticRequest.status),
          button_label: 'KEMBALIKAN KE STATUS SEBELUMNYA'
        })
      }
    },
    setDataIdentity() {
      this.identityDetail = [{
        title: 'Identitas Instansi',
        isOpen: true,
        data: [
          {
            title: 'Jenis Instansi',
            value: this.detailLogisticRequest?.agency?.agency_type_name
          },
          {
            title: 'Nomor Telepon',
            value: this.detailLogisticRequest?.agency?.phone_number
          },
          {
            title: 'Kelurahan',
            value: this.detailLogisticRequest?.agency?.village_name
          },
          {
            title: 'Nama Instansi',
            value: this.detailLogisticRequest?.agency?.agency_name
          },
          {
            title: 'Kota/Kab.',
            value: this.detailLogisticRequest?.agency?.city_name
          },
          {
            title: 'Alamat lengkap',
            value: this.detailLogisticRequest?.agency?.address
          },
          {
            title: 'Tipe Instansi',
            value: this.detailLogisticRequest?.agency?.is_reference === 1 ? 'RS Rujukan' : 'RS Bukan Rujukan'
          },
          {
            title: 'Kecamatan',
            value: this.detailLogisticRequest?.agency?.district_name
          },
          {
            title: 'Status Rujukan',
            value: this.detailLogisticRequest?.agency?.is_reference === 1 ? 'Rujukan' : 'Bukan Rujukan'
          }
        ]
      },
      {
        title: 'Identitas Pemohon',
        isOpen: this.isIdentityApplicantOpen,
        data: [
          {
            title: 'Nama Pemohon',
            value: this.detailLogisticRequest?.applicant?.applicant_name
          },
          {
            title: 'Email Pemohon',
            value: this.detailLogisticRequest?.applicant?.email
          },
          {
            type: this.setTypeFile(this.detailLogisticRequest?.applicant?.file),
            title: 'KTP/Kartu Pegawai/Surat Tugas',
            value: this.detailLogisticRequest?.applicant?.file
          },
          {
            title: 'Jabatan Pemohon',
            value: this.detailLogisticRequest?.applicant?.applicants_office
          },
          {
            title: 'Nomor Handphone Pemohon',
            value: this.detailLogisticRequest?.applicant?.primary_phone_number
          },
          {
            title: 'Nomor Handphone Pengganti',
            value: this.detailLogisticRequest?.applicant?.secondary_phone_number
          }
        ]
      }]
    },
    setStatusLabel(payload) {
      switch (payload) {
        case 'NOT_VERIFIED':
          return this.$t('label.not_verified')
        case 'VERIFIED':
          return this.$t('label.verified')
        case 'APPROVED':
          return this.$t('label.approved')
        case 'FINALIZED':
          return this.$t('label.finalized')
        case 'VERIFICATION_REJECTED':
          return this.$t('label.verification_rejected')
        case 'APPROVAL_REJECTED':
          return this.$t('label.approval_rejected')
        default: 'Status tidak terdefinisikan'
      }
    },
    setTypeFile(payload) {
      return payload.split('.').pop() === 'pdf' ? 'link' : 'image'
    },
    async deleteRealization(item) {
      this.dialogDelete = true
      this.dataDelete = await item
    },
    async getLogisticAdditionalRealization() {
      const res = await this.$store.dispatch('logistics/getLogisticNeedsAdmin', this.listQuery)
      const [recommendationAdmin, realizationAdmin] = res.data
      this.itemsRecommendationAdmin = recommendationAdmin
      this.itemsRealizationAdmin = realizationAdmin
      this.setLogisticRealizationAdmin()
    },
    setLogisticRealizationAdmin() {
      const filteredHeaderRecommendation = this.filteredHeaderLogisticTable('VERIFIED').filter(el => el.text !== 'Deskripsi')
      const filteredHeaderRealization = this.filteredHeaderLogisticTable('APPROVED').filter(el => el.text !== 'Deskripsi')
      const dataLogistic = [
        {
          type: 'recommendation',
          subtitle: 'Rekomendasi Salur Lainnya',
          headers: filteredHeaderRecommendation,
          items: this.itemsRecommendationAdmin,
          isOpen: this.isAdminRecommendationOpen
        },
        {
          type: 'realization',
          subtitle: 'Realisasi Salur Lainnya',
          headers: filteredHeaderRealization,
          items: this.itemsRealizationAdmin,
          isOpen: this.isAdminRealizationOpen
        }
      ]
      this.logisticItemsRealization = this.filteredLogisticItems(dataLogistic)
    },
    async getLogisticRequest() {
      const res = await this.$store.dispatch('logistics/getListDetailLogisticNeeds', this.listQuery)
      const [request, recommendation, realization] = res.data
      this.itemsRequest = request
      this.itemsRecommendation = recommendation
      this.itemsRealization = realization
      this.setLogisticItem()
    },
    setLogisticItem() {
      const filteredHeaderRecommendation = this.filteredHeaderLogisticTable('VERIFIED')
      const filterHeaderRealization = this.filteredHeaderLogisticTable('APPROVED')
      const dataLogistic = [
        {
          type: 'request',
          subtitle: 'Permohonan Masuk',
          headers: this.headersRequest,
          items: this.itemsRequest,
          isOpen: this.isRequestOpen
        },
        {
          type: 'recommendation',
          subtitle: 'Rekomendasi Salur',
          headers: filteredHeaderRecommendation,
          items: this.itemsRecommendation,
          isOpen: this.isRecommendationOpen
        },
        {
          type: 'realization',
          subtitle: 'Realisasi Salur',
          headers: filterHeaderRealization,
          items: this.itemsRealization,
          isOpen: this.isRealizationOpen
        }
      ]
      this.logisticItems = this.filteredLogisticItems(dataLogistic)
    },
    filteredHeaderLogisticTable(status) {
      if (this.detailLogisticRequest.status === status) {
        return this.headersRecommendationRealization
      } else {
        return this.headersRecommendationRealization.filter(el => el.text !== 'Aksi')
      }
    },
    filteredLogisticItems(item) {
      let itemFiltered = null
      switch (this.detailLogisticRequest.status) {
        case 'NOT_VERIFIED':
        case 'VERIFICATION_REJECTED':
          itemFiltered = item.filter((el) => el.type === 'request')
          break
        case 'VERIFIED':
        case 'APPROVAL_REJECTED':
          itemFiltered = item.filter((el) => el.type !== 'realization')
          break
        default: itemFiltered = item
          break
      }
      return itemFiltered
    },
    setDefaultDisplayTable(status) {
      switch (status) {
        case 'NOT_VERIFIED':
        case 'VERIFICATION_REJECTED':
          this.isRequestOpen = true
          this.detailTitle = 'Detail Administrasi'
          break
        case 'VERIFIED':
        case 'APPROVAL_REJECTED':
          this.isRequestOpen = false
          this.isRecommendationOpen = true
          this.isAdminRecommendationOpen = true
          this.detailTitle = 'Detail Rekomendasi'
          break
        case 'APPROVED':
        case 'FINALIZED':
          this.isRealizationOpen = true
          this.isAdminRealizationOpen = true
          this.isRequestOpen = false
          this.isRecommendationOpen = false
          this.isAdminRecommendationOpen = false
          this.detailTitle = 'Detail Realisasi'
          break
        default: null
      }
      this.getLogisticRequest()
      this.getLogisticAdditionalRealization()
    },
    hideAndShowAdminRealization(type, isOpen) {
      if (type === 'recommendation') {
        this.isAdminRecommendationOpen = isOpen
      } else {
        this.isAdminRealizationOpen = isOpen
      }
      this.setLogisticRealizationAdmin()
    },
    hideAdminRealization(type) {
      this.hideAndShowAdminRealization(type, false)
    },
    showAdminRealization(type) {
      this.hideAndShowAdminRealization(type, true)
    },
    hideAndShowLogisticRequest(type, isOpen) {
      if (type === 'request') {
        this.isRequestOpen = isOpen
      } else if (type === 'recommendation') {
        this.isRecommendationOpen = isOpen
      } else {
        this.isRealizationOpen = isOpen
      }
      this.setLogisticItem()
    },
    hideLogisticRequest(type) {
      this.hideAndShowLogisticRequest(type, false)
    },
    showLogisticRequest(type) {
      this.hideAndShowLogisticRequest(type, true)
    },
    updateItem(item, type, isAdminRealization) {
      this.showForm = true
      this.$refs.updateForm.setDataUpdateItem(item, type, isAdminRealization, this.detailLogisticRequest)
    },
    addRealizationAdmin() {
      this.showForm = true
      this.$refs.updateForm.setDataAddRealizationAdmin(this.detailLogisticRequest)
    },
    hideIdentity() {
      this.isIdentityApplicantOpen = false
      this.setDataIdentity()
    },
    showIdentity() {
      this.isIdentityApplicantOpen = true
      this.setDataIdentity()
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background: transparent;
}
.table-title {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: #424242;
}
.text-label {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 27px;
  color: #757575;
}
.min-width-full {
  min-width: 100%;
}
</style>
