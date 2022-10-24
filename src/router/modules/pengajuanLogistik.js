import Layout from '@/layout'

const pengajuanLogistik = {
  path: '/pengajuan-logistik/alat-kesehatan',
  component: Layout,
  redirect: '/pengajuan-logistik/alat-kesehatan/terverifikasi',
  meta: {
    title: 'logistic_request_title',
    icon: 'medication',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota']
  },
  active: false,
  children: [
    {
      path: '/alat-kesehatan/belum-terverifikasi',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'notVerified',
      meta: {
        title: 'not_verified_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/alat-kesehatan/terverifikasi',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'verified',
      meta: {
        title: 'verified_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/alat-kesehatan/belum-realisasi',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'not_yet_realized',
      meta: {
        title: 'not_yet_realized_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/alat-kesehatan/selesai-realisasi',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'realized',
      meta: {
        title: 'realized_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/alat-kesehatan/ditolak',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'rejected',
      meta: {
        title: 'rejected_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/alat-kesehatan/detail/:id',
      component: () => import('@/views/pengajuanLogistik/detailRealization'),
      hidden: true,
      meta: {
        title: 'applicant_medical_tools_list_title',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    }
  ]
}

export default pengajuanLogistik
