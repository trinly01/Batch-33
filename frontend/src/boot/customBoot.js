// import something here
import MyCalc from 'components/MyCalc'
import Chartkick from 'vue-chartkick'
import Highcharts from 'highcharts'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
import wings from 'wings4'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue }) => {
  // something to do
  Vue.prototype.$dbCon = wings('https://sleepy-ridge-77568.herokuapp.com/')
  Vue.prototype.$dbCon.authenticate()

  Vue.use(Chartkick.use(Highcharts))
  Vue.component('my-calc', MyCalc)
  Vue.prototype.$pdfMake = pdfMake

  const $global = {
    username: null
  }

  $global.install = () => {
    Object.defineProperty(Vue.prototype, '$global', {
      get () { return $global }
    })
  }

  router.beforeEach((to, from, next) => {
    // if (to.path === '/' && $global.username) return 1
    if (to.path !== '/' && !$global.username) return next({ path: '/' })
    next()
  })

  Vue.use($global)
}
