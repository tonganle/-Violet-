<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init"></editor>
  </div>
</template>
<script>
// 将tinymce的baseURL修改为static下面的路径，fix 404报错问题
// 包含theme skin langs
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'

// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/media'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/autosave'
import { upImage } from '@/request/api'

window.tinymce.baseURL = './tinymce'
// 使用min文件
window.tinymce.suffix = '.min'

export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: ' lists image media table wordcount paste'
    },
    toolbar: {
      type: [String, Array],
      default:
        '  undo redo paste|  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image  table | removeformat'
    }
  },
  data() {
    return {
      init: {
        language: 'zh_CN',
        skin: 'oxide',
        theme: 'silver',
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        elementpath: false, // 禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        menubar: false,
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        style_formats: [
          {
            title: '首行缩进',
            block: 'p',
            styles: {
              'text-indent': '2em'
            }
          },
          {
            title: '行高',
            items: [
              {
                title: '1',
                styles: {
                  'line-height': '1'
                },
                inline: 'span'
              },
              {
                title: '1.5',
                styles: {
                  'line-height': '1.5'
                },
                inline: 'span'
              },
              {
                title: '2',
                styles: {
                  'line-height': '2'
                },
                inline: 'span'
              },
              {
                title: '2.5',
                styles: {
                  'line-height': '2.5'
                },
                inline: 'span'
              },
              {
                title: '3',
                styles: {
                  'line-height': '3'
                },
                inline: 'span'
              }
            ]
          }
        ],
        autosave_retention: '20m',
        autosave_interval: '40s',
        // powerpaste_allow_local_images: true,
        // powerpaste_word_import: 'prompt',
        // powerpaste_html_import: 'prompt',
        font_formats: `
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;`,
        images_upload_handler: (blobInfo, success, failure) => {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          upImage(formData)
            .then(res => {
              if (res.success === '1') {
                success(res.data[0].ImagePath)
                return
              }
              failure('上传失败')
            })
            .catch(() => {
              failure('上传出错')
            })
        }
        // paste_postprocess: function(plugin, args) {}
      },
      myValue: this.value
    }
  },

  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  },

  mounted() {
    tinymce.init({})
  },
  beforeDestroy() {
    // 销毁tinymce
    tinymce.remove()
  },
  methods: {
    setContent(content) {
      this.Editor.setContent(content)
    },

    getContent() {
      return this.Editor.getContent()
    },
    clear() {
      this.myValue = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.tox .tox-sidebar-wrap {
  width: 120px;
  padding: 5px;
}

.tox-edit-area {
  height: -webkit-fill-available;

  .mce-content-body {
    position: relative;
    top: -1em;
    height: -webkit-fill-available;
    padding-top: 1em;
  }
}
</style>
