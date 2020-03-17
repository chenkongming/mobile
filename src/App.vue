<template>
  <div id="app" v-wechat-title="metaTitle">
    <keep-alive v-if="$route.meta && $route.meta.keepAlive">
      <pageSwitchAnimation>
        <router-view />
      </pageSwitchAnimation>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    metaTitle() {
      return this.pageTitle ? this.pageTitle : this.$route.meta.title
    },
    ...mapGetters(['pageTitle'])
  }
}
</script>
<style lang="scss">
</style>
