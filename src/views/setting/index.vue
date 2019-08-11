<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">1</el-form-item>
            <el-form-item label="手机：">13999999999</el-form-item>

            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="saveUserInfo" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="myUpload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: null,
        name: null,
        intro: null,
        email: null,
        photo: null,
        mobile: null
      },
      imageUrl: null
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    // 上传头像
    myUpload (result) {
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传头像成功
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 同步本地存储
        store.setUser({ photo: this.userForm.photo })
        // 同步HOME组件
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    },
    // 获取用户信息
    async getUserInfo () {
      // 后台的头像可能和前端本地保存头像 不一致。保存后进行过修改,重新登录可同步。
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    },

    // 保存用户信息
    /* - 提交用户信息给后台
- 更新本地存储用户信息
- 更新home组件的用户名 */
    async saveUserInfo () {
      // PATCH 请求类型做修改  局部修改
      // PUT 请求类型做修改 完整修改
      await this.$http.patch('user/profile', {
        // 按照后台需要提交数据
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('保存设置成功')
      store.setUser({ name: this.userForm.name })

      eventBus.$emit('updateName', this.userForm.name)
    }
  }
}
</script>

<style>
</style>
