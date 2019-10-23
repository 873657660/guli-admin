<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0" controls-position="right"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item>
        <pan-thumb :image="teacher.avatar"/>

        <el-button
          type="primary"
          icon="upload"
          style="position: absolute;bottom: 15px;margin-left: 40px;"
          @click="imagecropperShow=true">选择头像
        </el-button>

        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API +'/admin/oss/file/upload?fileHost=avatar'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

const defaultForm = {
  name: '',
  sort: 0,
  level: 1,
  career: '',
  intro: '',
  avatar: process.env.OSS_PATH + '/avatar/default.jpg'
}
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false, // 是否显示头像剪裁组件
      imagecropperKey: 0, // 上传组件id
      BASE_API: process.env.BASE_API // 接口API地址
    }
  },

  // 监听路由，路由变化时初始化页面（从修改页面跳转添加页面时，重新初始化页面，将表单清空）
  watch: {
    $route(to, from) {
      console.log('路由变化')
      this.init()
    }
  },

  // 生命周期方法，（在路由切换，组件不变的情况下不会被调用）
  created() {
    // console.log('created')
    this.init()
  },

  methods: {
    // 表单初始化
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 对象扩展运算符，拷贝对象，而不是赋值对象引用
        this.teacher = { ...defaultForm }
      }
    },
    // 保存或是修改操作
    saveOrUpdate() {
      this.saveBtnDisabled = true
      // 判断是从哪儿来的，修改时携带id，添加时无id
      if (!this.teacher.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    // 保存数据的方法
    saveData() {
      teacher.save(this.teacher).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          // 通过改变路由，刷新页面
          this.$router.push({ path: '/edu/teacher' })
        }
      })
    },
    // 根据id获取对象信息
    fetchDataById(id) {
      teacher.getById(id).then(response => {
        this.teacher = response.data.item
        console.log(this.teacher)
        // this.$router.push({ path: `/edu/teacher/edit/${this.teacher.id}` })
      })
    },
    // 修改信息
    updateData() {
      teacher.updateById(this.teacher).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(resposne => {
        // 刷新页面
        this.$router.push({ path: '/edu/teacher' })
      })
    },

    // 头像长传成功的回调函数
    cropSuccess(resData) {
      this.imagecropperShow = false
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
      this.teacher.avatar = resData.url
    },
    // 关闭方法
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>
