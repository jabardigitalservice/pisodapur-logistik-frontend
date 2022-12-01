import i18n from '@/lang'

export const mailOptions = [
  {
    text: 'Draft',
    value: 0
  },
  {
    text: 'Final',
    value: 1
  }
]

export const verificationOptions = [
  {
    text: i18n.t('status.not_verified'),
    value: 'not_verified'
  },
  {
    text: 'Terverifikasi',
    value: 'verified'
  },
  {
    text: i18n.t('label.accepted_with_note'),
    value: 'verified_with_note'
  }
]

export const warrantOptions = [
  {
    text: 'Belum Tersedia',
    value: 'not_yet'
  },
  {
    text: 'Tersedia',
    value: 'available'
  }
]

export const stageOptions = [
  {
    text: i18n.t('label.dashboard_unverified'),
    value: 'not_approved-not_verified'
  },
  {
    text: i18n.t('label.dashboard_rejected'),
    value: 'rejected'
  },
  {
    text: i18n.t('label.recommend'),
    value: 'not_approved-verified'
  },
  {
    text: i18n.t('label.realization'),
    value: 'approved-verified'
  },
  {
    text: 'Menunggu konfirmasi',
    value: 'integrated'
  },
  {
    text: 'Barang sedang di Packing',
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
]
