<template>
  <header>
    <!-- <router-link to="/" class="header_left">
      <img src="@/assets/images/logo.png" alt="">
    </router-link>-->
    <router-link to="/" class="header_left_two">
      <img src="@/assets/images/logo.png" alt />
    </router-link>
    <!-- <Breadcrumb class="Breadcrumb"></Breadcrumb> -->

    <ul class="header_right">
      <li>
        <full-screen></full-screen>
      </li>
      <li>
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link" style="cursor:pointer;">
            {{ name }}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePassword">
              {{ $t('message.changePassword') }}
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              {{ $t('message.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <!-- <li><i18n></i18n></li> -->
    </ul>
  </header>
</template>

<script>
// import i18n from '@/components/i18n'
import fullScreen from '@/components/FullScreen'

export default {
  data() {
    return {}
  },
  computed: {
    name() {
      return this.$store.state.user.USERNAME_DX_H
    }
  },
  components: {
    // i18n,
    fullScreen
  },
  methods: {
    handleCommand(command) {
      if (command == 'logout') {
        this.logout()
      } else if (command == 'changePassword') {
        this.$store.dispatch('user/setPasswordPageStatus', true)
        // this.$store.commit('user/SET_PASSWORD_PAGE_STATUS', true)
      }
    },
    logout() {
      this.$confirm('是否确认退出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('user/logOut').then(() => {
            this.$router.push('/login')
          })
        })
        .catch(() => {
          return false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header_left {
    display: block;
    height: 100%;
    text-align: center;
  }
  .Breadcrumb {
    flex: 1;
  }
  .header_right {
    height: 100%;
    color: #333;
  }
  .header_left_two {
    height: 70%;
    vertical-align: middle;
    padding-left: 1%;
  }
}

.header_left_two {
  img {
    width: auto;
    max-width: 100%;
    max-height: 65%;
  }
}

.header_left {
  img {
    width: auto;
    max-width: 100%;
    max-height: 65%;
    height: 70%;
    vertical-align: middle;
  }
}

.header_right {
  li {
    display: inline-block;
    font-size: 1.6rem;
    padding: 0 8px;
  }
}
.loginTop {
  width: 100%;
  background-color: #fff;
  .login_top_center {
    width: 80%;
    margin: 0 auto;
    height: 100px;
    line-height: 100px;
    padding: 20px 0;
    img {
      width: auto;
      height: 100%;
    }
  }
}
</style>
