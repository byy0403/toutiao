<template>
  <div class="image-container">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog">
      <img :src="value || defaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group @change="collectChange" v-model="reqParams.collect" size="mini">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div
              class="img-item"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :total="total"
            :current-page="reqParams.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="uploadHeaders"
            name="image"
          >
            <img v-if="uploadimageUrl" :src="uploadimageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      defaultImage,
      // 图片列表数据
      images: [],
      total: 0,
      // 记录被选中的图片地址
      selectedImageUrl: null,
      // 上传组件头部信息
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 记录上传的图片地址
      uploadimageUrl: null
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
      // 清空之前选中或者上传的图片地址
      this.uploadImageUrl = null
      this.selectedImageUrl = null
      // 获取素材列表数据
      this.getImages()
    },

    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 切换收藏
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页切换
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages(0)
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 成功上传图片
    handleSuccess (res) {
      this.uploadimageUrl = res.data.url
    },
    // 确认tupian
    confirmImage () {
      // 让图片按钮能够显示你选中的或者上传的图片地址。
      if (this.activeName === 'image') {
        this.$emit('input', this.selectedImageUrl)
      } else {
        this.$emit('input', this.uploadimageUrl)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
