import UploadComp from './KwUpload'

let upload = null

export default {
  install (Vue) {
    const _this = this
    const Upload = Vue.extend(UploadComp)

    if (!upload) {
      upload = new Upload().$mount(document.createElement('div'))
    }

    document.body.appendChild(upload.$el)

    Vue.prototype.$file = {
      select (callback) {
        return _this.select(callback)
      }
    }
  },
  select (callback) {
    upload.selectCallback = callback
    const $file = upload.$refs.myFile
    $file.click()
  }
}
