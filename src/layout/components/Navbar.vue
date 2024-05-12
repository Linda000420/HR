<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <!-- 用户名称 -->
          <span class="name">{{ name }}</span>
          <!-- 图标 -->
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/Linda000420/HR">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 弹层 dialog 组件 -->
    <el-dialog width="500px" :visible.sync="showDialog" :append-to-body="true" title="修改密码" @close="btnCancel">
      <!-- 表单 -->
      <el-form ref="passForm" :model="passForm" :rules="rules" label-width="120px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passForm.newPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="重新输入新密码" prop="confirmPassword">
          <el-input v-model="passForm.confirmPassword" show-password size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="btnOK">确认修改</el-button>
          <el-button size="mini" @click="btnCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { userUpdatePasswordService } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      // 控制弹层
      showDialog: false,
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      // 表单规则
      rules: {
        oldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '新密码长度为 6-10 位字符之间', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.passForm.oldPassword !== value) {
                callback()
              } else {
                callback(new Error('新密码不能与旧密码一致'))
              }
            },
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          { required: true, message: '重复密码不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.passForm.newPassword === value) {
                callback()
              } else {
                callback(new Error('重复密码与新密码不一致'))
              }
            },
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (this.passForm.oldPassword !== value) {
                callback()
              } else {
                callback(new Error('新密码不能与旧密码一致'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    // 引入头像和用户名称
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 退出
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    // 修改密码
    updatePassword() {
      this.showDialog = true
    },
    // 确认
    btnOK() {
      console.log('ok')
      // 表单校验
      this.$refs.passForm.validate(async(isOK) => {
        if (isOK) {
          // 校验通过
          await userUpdatePasswordService(this.passForm)
          this.$message.success('修改成功')
          this.btnCancel()
        }
      })
    },
    // 取消
    btnCancel() {
      // 重置表单
      this.$refs.passForm.resetFields()
      // 关闭弹层
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        // 头像
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .username {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #04c9be;
          border-radius: 50%;
          color: #fff;
        }

        // 用户名称
        .name {
          margin-right: 10px;
          margin-left: 4px;
          font-size: 16px;
        }

        // 图标
        .el-icon-setting {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
