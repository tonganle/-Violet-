<template>
  <div>
    <div class="sty1">
      <fieldset>
        <legend>菜单信息</legend>
        <div>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;菜单序号:&nbsp;&nbsp;</b
          >{{ data3.id }}
        </div>
        <div>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;菜单代码:&nbsp;&nbsp;</b
          >{{ data3.code }}
        </div>
        <div>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;菜单名称:&nbsp;&nbsp;</b
          >{{ data3.name }}
        </div>
        <div>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;URL地址:&nbsp;&nbsp;</b
          >{{ data3.url }}
        </div>
        <div>
          <b>是否平台菜单:&nbsp;&nbsp;</b>
          <el-checkbox v-model="checked1" disabled></el-checkbox>
        </div>
        <div>
          <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是否可用:&nbsp;&nbsp;</b>
          <el-checkbox v-model="checked2" disabled></el-checkbox>
        </div>
      </fieldset>
    </div>
    <div class="sty1">
      <fieldset>
        <legend>功能列表</legend>
        <el-table :data="data4" height="250" style="width: 100%;">
          <el-table-column
            show-overflow-tooltip
            prop="nums"
            label="序号"
            width="100"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="codes"
            label="功能代码"
            width="200"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="names"
            label="功能名称"
            width="200"
          >
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="users" label="是否可用">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.users" disabled=""></el-checkbox>
            </template>
            <!--<el-checkbox v-model=checked3  disabled></el-checkbox>-->
          </el-table-column>
        </el-table>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      checked1: true,
      checked2: true,
      checked3: true,
      cData: [],
      data6: [
        {
          num: '1.1.1',
          id: '1',
          code: 'MT11',
          name: '寻龙一部曲',
          url: 'www.3dabuliu.com',
          user1: true,
          user2: false
        },
        {
          num: '1.1.2',
          id: '2',
          code: 'MT12',
          name: '寻龙二部曲',
          url: 'www.3dabuliu.com',
          user1: true,
          user2: true
        },
        {
          num: '1.1.3',
          id: '3',
          code: 'MT13',
          name: '寻龙三部曲',
          url: 'www.3dabuliu.com',
          user1: true,
          user2: true
        }
      ],
      data7: [
        {
          num: '1.1.1',
          nums: '1',
          codes: 'MT11',
          names: '寻龙一部曲',
          users: true
        },
        {
          num: '1.1.2',
          nums: '2',
          codes: 'MT12',
          names: '寻龙二部曲',
          users: true
        },
        {
          num: '1.1.3',
          nums: '3',
          codes: 'MT13',
          names: '寻龙三部曲',
          users: true
        }
      ],
      data3: {},
      data4: []
    }
  },
  watch: {
    id: function(newVal) {
      this.cData = newVal // newVal即是id
      this.get()
    }
  },
  methods: {
    get() {
      for (let item of this.data6) {
        if (item.num === this.id) {
          this.data3 = item
          this.checked1 = this.data3.user1
          this.checked2 = this.data3.user2
        }
      }
      for (let j of this.data7) {
        if (j.num === this.id) {
          this.data4 = []
          this.data4.push(j)
          this.checked3 = this.data4[0].users
        }
      }
    }
  }
}
</script>

<style scoped>
.sty1 {
  width: 800px;
  height: 200px;
}
fieldset div {
  font-size: 13px;
}
</style>
