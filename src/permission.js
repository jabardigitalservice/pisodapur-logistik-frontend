import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/cookies' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/form-pemohon', '/landing-page', '/tracking', '/acceptance-report', '/usability-report', '/tracking-vaccine'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  await NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      await next({ path: '/' })
      await NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = await store.getters['user/roles'] && store.getters['user/roles'].length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const roles = await store.dispatch('user/getInfo')
          const isVaccineModule = store.state.user.app === 'vaccine'
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, isVaccineModule })
          // dynamically add accessible routes
          await router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          await next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          await next(`/login?redirect=${to.path}`)
          await NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(`/${to.path.split('/')[1]}`) !== -1) {
      // in the free login whitelist, go directly
      await next()
    } else {
      // other pages that do not have permission to access are redirected to the landing page.
      await next(`/login?redirect=${to.path}`)
      await NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
