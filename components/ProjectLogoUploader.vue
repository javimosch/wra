<template>
<div class="ProjectLogoUploader">
  <div class="row no-gutters">
    <div class="col-12">
    	<LightLabel>Brand logo</LightLabel>
      <UploadInput type="file"
                   ref="fileInput"></UploadInput>
      
    </div>
    <div class="col-12 col-sm-4 mt-2">
      <img :src="imageUrl" class="Image img-thumbnail img-fluid"/>
    </div>
  </div>
</div>

</template>

<script>
import {LightLabel} from '@/styledComponents/labels'
import UploadInput from '@/styledComponents/UploadInput';
import { call } from '@/plugins/rpcApi';
export default {
  name: 'ProjectLogoUploader',
  props: ['project','image'],
  fetch() {},
  data() {
    return {
      uploading: false
    }
  },
  async asyncData() {
    return {}
  },
  computed: {
    imageUrl(){
      return this.image && this.image.url||''
    }
  },
  methods: {
    async upload(file) {
      if (this.uploading) {
        return
      } else {
      	this.uploading = true;
        this.$noty.success(`${file.name} uploading...`)
        try {
        	
          let res = await call('wraUploadProjectLogo', {
            logoFile: file,
            project: this.project
            //public_id: 'wra/projects/test/brand_logo'
          }, {
            isMultipart: true,
            multipartKey: 'logoFile'
          })
          console.info(res)
          this.uploading = false;
          this.$noty.success(`${file.name} uploaded!`)
        } catch (err) {
        	console.error(err)
        	this.uploading = false;
        	this.$noty.warning('Upload fail')
        }
        

      }
    }
  },
  components: {
    UploadInput,
    LightLabel
  },
  created() {},
  mounted() {
    if (process.server) {
      return
    }
    var self = this
    function handleFileSelect(evt) {
      var files = evt.target.files // FileList object
      for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
          continue
        }
        var reader = new FileReader()
        reader.onload = (function(file) {
          return function(e) {
            self.upload(file)
          }
        })(f)
        reader.readAsDataURL(f)
      }
    }
    this.$refs.fileInput.$el.addEventListener('change', handleFileSelect, false)
  }
}

</script>

<style lang="scss" scoped="">
.ProjectLogoUploader {}
.Image{

}
</style>
