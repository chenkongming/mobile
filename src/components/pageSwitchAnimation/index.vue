<template>
  <div class="pageSwitchAnimation">
    <transition :name="animation">
      <slot />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageSwitchAnimation',
  computed: {
    ...mapGetters(['direction']),
    animation() {
      const isIOS = navigator.userAgent.match(/\iPhone OS \w+/)
      const iosVersion = isIOS && isIOS.length > 0 ? isIOS[0] : null
      if (iosVersion) {
        if (iosVersion.split(' ')[2]) {
          if (iosVersion.split(' ')[2].split('_')[0] < 10) {
            return 'none'
          }
        }
      }
      return 'page-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  }
}
</script>

<style lang="scss">
.page-out-enter-active,
.page-out-leave-active,
.page-in-enter-active,
.page-in-leave-active {
  will-change: transform;
  transition: all 250ms;
  height: 100%;
  width: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.page-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.page-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.page-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.page-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.pageSwitchAnimation {
    height: 100%;
}
</style>
