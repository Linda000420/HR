<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadImage"
  >
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
// import COS from 'cos-js-sdk-v5'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 检查函数，判断文件类型和大小
    beforeAvatarUpload(file) {
      // jpeg / png / gif / bmp
      const isJPG = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、PNG、GIF、BMP 格式！')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB！')
      }
      return isJPG && isLt5M
    },
    // 上传图片
    uploadImage(params) {
      console.log(params.file)
      // cos 对象初始化
    //   const cos = new COS({
    //     SecretId: 'AKIDEMK7iZcoaBcsvhJjx40QhGzfJqAHAxdQ',
    //     SecretKey: '77xYz2xjLmFeu01veFiDXecXS5yjMtO5'
    //   })
    //   cos.putObject({
    //     Bucket: 'linns-1326604282', //  存储桶名称
    //     Region: 'ap-guangzhou', //  地域名称
    //     Key: params.file.name, //  文件名称
    //     StorageClass: 'STANDARD', //  固定值
    //     Body: params.file //  文件对象
    //   }, (err, data) => {
    //     // err 错误信息， data 返回值
    //     if (data.statusCode === 200 && data.Location) {
    //       // 拿到腾讯云返回的地址后通过 input 自定义事件传出去
    //       // 返回地址
    //       this.$emit('input', 'http://' + data.Location)
    //     } else {
    //       // 失败信息
    //       this.$message.error(err.Message)
    //     }
    //   })
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
