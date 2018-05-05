<template>
<div class="AdminEditor">
  <WrapkendEditor></WrapkendEditor>
</div>

</template>

<script>
import WrapkendEditor from '@/components/WrapkendEditor';
export default {
  components: {
    WrapkendEditor
  },
  name: 'AdminEditor',
  layout:'app-minimal',
  props: [],
  fetch() {},
  data() {
    return {}
  },
  async asyncData() {
    return {}
  },
  computed: {

  },
  methods: {

  },

  created() {},
  mounted() {}
}

</script>

<style lang="scss" scoped="">
.AdminEditor {}
</style>
