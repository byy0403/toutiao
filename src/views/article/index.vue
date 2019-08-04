<template>
  <div class="container">article</div>
</template>

<script>
export default {
  mounted () {
    this.$http
      .get('http://ttapi.research.itcast.cn/mp/v1_0/followers')
      .then(result => {
        console.log(result.data)
      })
  }
}
</script>

<style>
</style>
