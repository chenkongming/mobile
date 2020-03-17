<template>
  <div id="app" v-wechat-title="metaTitle">
    <keep-alive v-if="$route.meta && $route.meta.keepAlive">
      <pageSwitchAnimation>
        <router-view />
      </pageSwitchAnimation>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <toast :text="toastConfig.text" :icon="toastConfig.icon" :show="toastConfig.show" />
  </div>
</template>
<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import Toast from 'components/toast'
export default {
  name: 'App',
  components: { Toast },
  computed: {
    metaTitle() {
      return this.pageTitle ? this.pageTitle : this.$route.meta.title
    },
    ...mapGetters([
      'pageTitle',
      'toastConfig'
    ])
  },
  mounted() {
    this.$store.dispatch('app/showToast', { show: true, text: 'test' })
  }
}
</script>
<style lang="scss">
</style>
