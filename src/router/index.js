import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import dashboardRouter from './modules/dashboard'
import pengajuanLogistik from './modules/pengajuanLogistik'
import formPemohonAdmin from './modules/formPemohonAdmin'

/* Router Vaccine Modules */
import immunization from './modules/vaccine/immunization'
import pharmacy from './modules/vaccine/pharmacy'
import logisticPost from './modules/vaccine/logisticPost'
import archive from './modules/vaccine/archive'

/* Sentry */
import * as Sentry from '@sentry/core'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  // Temporary hidden
  // {
  //   path: '/landing-page',
  //   component: () => import('@/views/landingPage/index'),
  //   hidden: true
  // },
  {
    path: '/landing-page',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/',
        component: () => import('@/views/landingPageVaccine/index'),
        hidden: true,
        meta: {
          title: 'landing_page',
          isVaccineContent: true
        }
      }
    ]
  },
  {
    path: '/tracking',
    component: () => import('@/views/tracking/index'),
    hidden: true
  },
  {
    path: '/tracking-vaccine',
    component: () => import('@/views/trackingVaccine/index'),
    hidden: true
  },
  {
    path: '/tracking-vaccine/:id',
    component: () => import('@/views/trackingVaccine/detail/index'),
    hidden: true
  },
  {
    path: '/change-password',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/',
        component: () => import('@/views/changePassword/index'),
        meta: {
          title: 'change_password'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/form-pemohon',
    component: () => import('@/views/permohonan/formPemohon'),
    hidden: true
  },
  {
    path: '/acceptance-report',
    component: () => import('@/views/acceptanceReport/index'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  dashboardRouter,
  formPemohonAdmin,
  pengajuanLogistik,
  immunization,
  pharmacy,
  logisticPost,
  archive,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/', hidden: true }
]

async function beforeEach(to, from, next) {
  Sentry.configureScope((scope) => {
    scope.setTransactionName(to.path)
  })
  next()
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
router.beforeEach(beforeEach)

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
