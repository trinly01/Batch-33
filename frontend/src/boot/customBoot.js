// import something here
import MyCalc from 'components/MyCalc'
import Chartkick from 'vue-chartkick'
import Highcharts from 'highcharts'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue }) => {
  // something to do

  Vue.use(Chartkick.use(Highcharts))
  Vue.component('my-calc', MyCalc)
  Vue.prototype.$pdfMake = pdfMake
}
