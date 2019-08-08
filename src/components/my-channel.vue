<template>
  <el-select placeholder="请选择" clearable :value="value" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  methods: {
    // 获取获取频道下拉选项数据
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      // 空字符处理成null
      if (val === '') {
        val = null
      }
      this.$emit('input', val)
    }
  },
  created () {
    // 获取获取频道下拉选项数据
    this.getChannelOptions()
  }
}
</script>

<style>
</style>
