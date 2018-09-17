<template>
<div class="WrakendDashboard">
  <ProjectsBlocks></ProjectsBlocks>
</div>

</template>

<script>

import ProjectsBlocks from '@/components/ProjectsBlocks'
import WelcomeText from '@/components/WelcomeText'
export default {
  layout: 'app',
  middleware: [
    'appAuth'
  ],
  name: 'WrakendDashboard',
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
  components: {
    WelcomeText,
    ProjectsBlocks
  },
  created() {

  },
  mounted() {
    
  }
}

</script>

<style lang="scss" scoped="">
.WrakendDashboard {}
</style>
