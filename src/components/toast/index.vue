<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" class="toast-container">
      <div class="toast">
        <template v-if="icon">
          <img
            v-if="icon === 'success'"
            src="../../assets/icon/success-icon.png"
            alt="图标"
            class="toast-icon"
          >
          <img
            v-if="icon === 'warning'"
            src="../../assets/icon/warning-icon.png"
            alt="图标"
            class="toast-icon"
          >
        </template>
        {{ text }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    text: {
      required: true,
      type: String,
      default: ''
    },
    icon: {
      required: false,
      type: String,
      default: 'success'
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
.toast-container {
    position: fixed;
    display: flex;
    top: 50%;
    left: 0;
    right: 0;
    z-index: 9999;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translate(0, -50%);
    .toast {
        margin-bottom: 10px;
        min-width: 180px;
        background: #191919;
        text-align: center;
        opacity: 0.75;
        border-radius: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px 54px;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 50px;
        .toast-icon{
            width: 66px;
            height: 66px;
            margin-bottom: 22px;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
