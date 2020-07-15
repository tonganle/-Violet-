<template>
  <div style="display:inline-block">
    <el-button type="primary" size="mini" @click="dialogVisible = true">{{
      btn
    }}</el-button>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="30%"
      style="z-index:999"
      :append-to-body="true"
    >
      <img width="100%" :src="imageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    btn: {
      type: String,
      default: '图片查看'
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped></style>
