import Layout from '@/layout'

const pengajuanLogistik = {
  path: '/pengajuan-logistik/alat-kesehatan',
  component: Layout,
  redirect: '/pengajuan-logistik/alat-kesehatan/terverifikasi',
  meta: {
    title: 'logistic_request_title',
    icon: 'archive',
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
      path: '/alat-kesehatan/realisasi',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'not_yet_realized',
      meta: {
        title: 'approved_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/alat-kesehatan/arsip',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'archive',
      meta: {
        title: 'archive',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/alat-kesehatan/detail/:id',
      component: () => import('@/views/pengajuanLogistik/detailRealization'),
      hidden: true,
      meta: {
        title: 'request_detail',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    }
  ]
}

export default pengajuanLogistik
