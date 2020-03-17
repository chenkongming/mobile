<template>
  <div id="footerNav" class="footerNav" :class="{ hide: isHide }">
    <ul id="footerNavUl">
      <li
        v-for="menu in dataset"
        :key="menu.iconFlag"
        :class="{
          selected: $route.name === menu.routeName
        }"
        @click="routerEvent(menu.routeName)"
      >
        <i :class="['icon', menu.icon]" />
        <p>{{ menu.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FooterNav',
  data() {
    /** * 是否高亮通过当前路由名字和router-link-active判断 */
    return {
      isHide: false
    }
  },
  computed: {
    dataset() {
      return [
        {
          iconFlag: 'home',
          text: '首页',
          icon: 'home',
          routeName: 'index'
        },
        {
          iconFlag: 'userCenter',
          text: '我的',
          icon: 'userCenter',
          routeName: 'userCenter'
        }
      ]
    }
  },
  methods: {
    routerEvent(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss">
    .footerNav {
        height: 98px;
        position: fixed;
        z-index: 9;
        bottom: 0;
        transition: all 0.5s;
        ul {
            width: 10rem;
            height: 100%;
            display: flex;
            background: #ffffff;
            box-shadow: 0 -2px 20px 0 rgba(2, 126, 250, 0.1);
        }
        li {
            flex: 1 1 0;
            padding-top: 16px;
            padding-bottom: 6px;
            line-height: 1.1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            i {
                display: inline-block;
                margin-bottom: 8px;

                &.home {
                    width: 50px;
                    height: 46px;
                    background: url('icon/home.png') no-repeat;
                    background-size: 100%;
                }
                &.userCenter {
                    width: 50px;
                    height: 46px;
                    background: url('icon/mine.png') no-repeat;
                    background-size: cover;
                }
            }
            &.selected,
            &.router-link-active {
                .home {
                    width: 50px;
                    height: 46px;
                    background: url('icon/home-selected.png') no-repeat;
                    background-size: 100%;
                }
                .userCenter {
                    width: 50px;
                    height: 46px;
                    background: url('icon/mine-selected.png') no-repeat;
                    background-size: cover;
                }
                p {
                    color: #4A4A4A;
                }
            }
            p {
                font-family: PingFangSC-Regular;
                font-size: 20px;
                color: #DEDEE3;
                letter-spacing: 1.8px;
            }
        }
    }
</style>
