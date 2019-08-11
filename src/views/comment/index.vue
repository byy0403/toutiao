<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="!scope.row.comment_status"
              size="small"
              type="success"
            >打开评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else size="small" type="danger">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqparams.per_page"
        :current-page="reqparams.page"
        @current-change="changePager"
        style="padding-top:15px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      reqparams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      // 定义总评论数
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    // 获取评论管理列表
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqparams })
      this.comments = data.results
      this.total = data.total_count
    },
    // 切换 打开、关闭、评论功能
    toggleStatus (row) {
      this.$confirm(
        !row.comment_status
          ? '您确认要打开该文章的评论功能吗？'
          : '关闭评论功能后用户将无法对该文章进行评论，您确认要关闭该文章的评论功能吗？',
        '温馨提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async () => {
          const {
            data: { data }
          } = await this.$http.put('comments/status?article_id=' + row.id, {
            allow_comment: !row.comment_status
          })
          this.$message.success('修改文章评论状态成功')
          // 修改数据驱动视图更新
          row.comment_status = data.allow_comment
        })
        .catch(() => {})
    },
    // 分页
    changePager (newPage) {
      this.reqparams.page = newPage
      this.getComments()
    }
  }
}
</script>

<style scoped lang="less">
</style>
