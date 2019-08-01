<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  .my-card {
    width: 350px;
    height: 300px;
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, 60%);
    img {
      display: block;
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
