<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="$route.fullPath"
      :collapse="collapse"
    >
      <div v-for="menuItem in menu" :key="menuItem.MDL_UUID">
        <el-submenu
          v-if="menuItem.Children && menuItem.Children.length !== 0"
          :index="menuItem.MDL_URL || menuItem.MDL_NAME"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ $t(menuItem.MDL_NAME) }}</span>
          </template>
          <div v-for="childItem in menuItem.Children" :key="childItem.MDL_UUID">
            <!-- <el-submenu v-if="childItem.children && childItem.children.length !== 0" :index="childItem.MDL_URL || childItem.MDL_NAME">
                          <template slot="title">
                              <i class="el-icon-location"></i>
                              <span>{{$t(childItem.MDL_NAME)}}</span>
                          </template>
                          <template v-for="finItem in childItem.children">
                              <router-link :to="finItem.MDL_URL" @click="permission(childItem)" v-if="!isFrameUrl(finItem.MDL_URL)" :key="finItem.MDL_URL">
                                  <el-menu-item :index="finItem.MDL_URL">
                                      <span slot="title">
                                          {{$t(finItem.MDL_NAME)}}
                                      </span>
                                  </el-menu-item>
                              </router-link>
                              <router-link :to="'/layout/iframe?url='+finItem.MDL_URL+'&title='+childItem.MDL_NAME" v-if="isFrameUrl(finItem.MDL_URL)" :key="finItem.MDL_URL">
                                  <el-menu-item :index="finItem.MDL_URL">
                                      <span slot="title">
                                            {{$t(finItem.MDL_NAME)}}
                                      </span>
                                  </el-menu-item>
                              </router-link>
                          </template>
            </el-submenu>-->
            <template>
              <router-link
                :to="childItem.MDL_URL"
                @click.native="permission(childItem)"
                v-if="!isFrameUrl(childItem.MDL_URL)"
              >
                <el-menu-item :index="childItem.MDL_URL">
                  <span slot="title">{{ $t(childItem.MDL_NAME) }}</span>
                </el-menu-item>
              </router-link>
              <!-- <router-link @click.native="permission(childItem)" :to="'/layout/iframe?url='+childItem.MDL_URL+'&title='+childItem.MDL_NAME+'&perm='+JSON.stringify(childItem.Grandson)" v-if="isFrameUrl(childItem.MDL_URL)"> -->
              <router-link
                @click.native="permission(childItem)"
                :to="
                  '/layout/iframe?url=' +
                    childItem.MDL_URL +
                    '&title=' +
                    childItem.MDL_NAME
                "
                v-if="isFrameUrl(childItem.MDL_URL)"
              >
                <el-menu-item :index="childItem.MDL_URL">
                  <span slot="title">{{ $t(childItem.MDL_NAME) }}</span>
                </el-menu-item>
              </router-link>
            </template>
          </div>
        </el-submenu>
        <template v-else>
          <router-link
            :to="menuItem.MDL_URL"
            v-if="!isFrameUrl(menuItem.MDL_URL)"
          >
            <el-menu-item :index="menuItem.MDL_URL">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ $t(menuItem.MDL_NAME) }}</span>
            </el-menu-item>
          </router-link>
          <router-link
            :to="
              '/layout/iframe?url=' +
                menuItem.MDL_URL +
                '&title=' +
                menuItem.MDL_NAME
            "
            v-if="isFrameUrl(menuItem.MDL_URL)"
          >
            <el-menu-item :index="menuItem.MDL_URL">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ $t(menuItem.MDL_NAME) }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </div>
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { getUserList } from '@/request/system/administrators'
const api = window._$api
export default {
  data() {
    return {
      menu: [
        {
          MDL_NAME: 'router.dataBase',
          Children: [
            {
              MDL_NAME: 'router.advice',
              MDL_URL: api.MENUURL + '/dataBase/advice'
            },
            {
              MDL_NAME: 'router.newManager',
              MDL_URL: api.MENUURL + '/dataBase/newManager'
            },
            {
              MDL_NAME: 'router.pressRelease',
              MDL_URL: api.MENUURL + '/dataBase/pressRelease'
            },
            {
              MDL_NAME: 'router.countryAdm',
              MDL_URL: api.MENUURL + '/dataBase/countryAdm'
            },

            {
              MDL_NAME: 'router.portManage',
              MDL_URL: api.MENUURL + '/dataBase/portManage'
            },

            {
              MDL_NAME: 'router.provinceCity',
              MDL_URL: api.MENUURL + '/dataBase/provinceCity'
            },
            {
              MDL_NAME: 'router.districtCounty',
              MDL_URL: api.MENUURL + '/dataBase/districtCounty'
            },
            {
              MDL_NAME: 'router.supplier',
              MDL_URL: api.MENUURL + '/dataBase/supplier'
            },
            {
              MDL_NAME: 'router.custom',
              MDL_URL: api.MENUURL + '/dataBase/custom'
            }
          ]
        },
        {
          MDL_NAME: 'router.platformManagement',
          Children: [
            {
              MDL_NAME: 'router.baseCode',
              MDL_URL: api.MENUURL + '/platform/code'
            },
            {
              MDL_NAME: 'router.roleManagement',
              MDL_URL: api.MENUURL + '/platform/rolemanager'
            },
            {
              MDL_NAME: 'router.enterpriseAdministrator',
              MDL_URL: api.MENUURL + '/platform/administrator'
            },
            {
              MDL_NAME: 'router.sysmodule',
              MDL_URL: api.MENUURL + '/platform/sysmodule'
            },

            {
              MDL_NAME: 'router.auth',
              MDL_URL: api.MENUURL + '/platform/auth'
            },
            {
              MDL_NAME: 'router.company',
              MDL_URL: api.MENUURL + '/platform/company'
            }
          ]
        },
        {
          MDL_NAME: 'router.example',
          Children: [
            {
              MDL_NAME: '工具样例页面',
              MDL_URL: api.MENUURL + '/example/tool'
            },
            {
              MDL_NAME: '视频样例展示',
              MDL_URL: api.MENUURL + '/example/showVideo'
            },
            {
              MDL_NAME: 'router.tinymce',
              MDL_URL: api.MENUURL + '/example/vuetinymce'
            },
            {
              MDL_NAME: 'router.echarts',
              MDL_URL: api.MENUURL + '/example/echarts'
            },
            {
              MDL_NAME: 'router.upFile',
              MDL_URL: api.MENUURL + '/example/uploadFile'
            },
            {
              MDL_NAME: 'router.upImg',
              MDL_URL: api.MENUURL + '/example/uploadImage'
            },
            {
              MDL_NAME: 'router.export',
              MDL_URL: api.MENUURL + '/example/excel/export-excel'
            },
            {
              MDL_NAME: '导出pdf',
              MDL_URL: api.MENUURL + '/example/pdf'
            },
            {
              MDL_NAME: 'router.import',
              MDL_URL: api.MENUURL + '/example/excel/upload-excel'
            },
            {
              MDL_NAME: 'router.jszip',
              MDL_URL: api.MENUURL + '/example/jszip'
            },
            {
              MDL_NAME: 'router.clipboard',
              MDL_URL: api.MENUURL + '/example/clipboard'
            }
          ]
        }
      ]
    }
  },
  // computed: {
  //     collapse () {
  //         this.$store.state.app.collapse;
  //     }
  // },
  watch: {
    '$store.state.user.FLT_UUID_DX_H'() {
      if (this.$store.state.user.FLT_UUID_DX_H) {
        this.seachList()
      }
    }
  },
  mounted() {
    // this.seachList();
  },
  methods: {
    seachList() {
      let _this = this
      getUserList().then(response => {
        // if(response.success==1){
        var dataList = response.data.DXNXTD
        var list = JSON.parse(JSON.stringify(dataList))
        var title = decodeURIComponent(this.$route.hash).slice(
          this.$route.hash.indexOf('&title=') + 7
        )
        var arr = title.split('=')
        for (let i = 0; i < list.length; i++) {
          for (let f = 0; f < list[i].Children.length; f++) {
            if (list[i].Children[f].MDL_NAME === arr[0]) {
              _this.$store.dispatch(
                'user/buttonPerm',
                JSON.parse(JSON.stringify(list[i].Children[f].Grandson))
              )
            }
          }
        }
        _this.$store.dispatch('user/permList', list)
        for (let i = 0; i < dataList.length; i++) {
          dataList[i].MDL_URL = dataList[i].MDL_URL || ''
          if (dataList[i].Children.length > 0) {
            for (let f = 0; f < dataList[i].Children.length; f++) {
              if (!dataList[i].Children[f].MDL_URL) {
                dataList[i].Children[f].MDL_URL = ''
              } else {
                if (dataList[i].Children[f].MDL_URL.indexOf('http') !== -1) {
                  return
                } else {
                  dataList[i].Children[f].MDL_URL =
                    api.MENUURL + dataList[i].Children[f].MDL_URL
                }
              }
            }
          }
        }
        if (dataList.length > 0) {
          for (let i = 0; i < dataList.length; i++) {
            _this.menu.push(dataList[i])
          }
        }
      })
    },
    permission(val) {
      this.$store.dispatch('user/buttonPerm', val.Grandson)
    },
    isFrameUrl(path) {
      if (!path) return false
      if (path.indexOf('http') !== -1) {
        return true
      }
      return false
    },
    isActive(route) {
      return this.$route.path === route.path
    }
  }
}
</script>

<style lang="scss">
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>

<style lang="scss" scoped>
.router-link-exact-active {
  span,
  i {
    color: rgb(255, 208, 75);
  }
}

.el-scrollbar {
  height: 100%;
}

a {
  display: block;
}
</style>
