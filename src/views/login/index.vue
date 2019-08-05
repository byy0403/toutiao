<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width:236px;" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      // 校验手机号  1开头 第二位3-9  9位数字
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不正确'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async valid => {
        /*  if (valid) {
          // 请求登录接口
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              console.log(res.data)
              store.setUser(res.data.data)
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        } */
        // async&await使用  怎么处理错误 try{}catch(e){} 捕获异常
        try {
          const {
            data: { data }
          } = await this.$http.post('authorizations', this.loginForm)
          store.setUser(data)
          this.$router.push('/')
        } catch (error) {
          this.$message.error('手机号或验证码错误')
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 320px;
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, 40%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
    .el-checkbox {
      display: block;
      line-height: 46px;
    }
  }
}
</style>
