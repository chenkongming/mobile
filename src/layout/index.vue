<template>
  <div class="index-frame">
    <router-view />
    <footerTabs />
  </div>
</template>

<script>
import footerTabs from './footerTabs/index'
export default {
  name: 'PageIndexFrame',
  components: {
    footerTabs
  }
}
</script>

<style lang="scss" scoped>
.index-frame {
    height: 100vh;
}
</style>
