<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <!-- 内容 -->
    <el-form ref="addDept" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" size="mini" style="width: 80%" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" size="mini" style="width: 80%" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select v-model="formData.managerId" size="mini" style="width: 80%" placeholder="请选择负责人">
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" size="mini" type="textarea" :rows="4" style="width: 80%" placeholder="1-100个字符" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="mini" type="primary" @click="btnOk">确定</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { depGetDepartment, depGetManagerList, depAddDepartment, depGetDepartmentInfo } from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      managerList: {}, //  部门负责人列表
      formData: {
        name: '', //  部门名称
        code: '', //  部门编码
        managerId: '', //  部门负责人
        introduce: '', //  部门介绍
        pid: '' //  父级部门的id
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入 2-10 个字符', trigger: 'blur' },
          {
            validator: async(rule, value, callback) => {
              const res = await depGetDepartment()
              if (res.some(item => item.name === value)) {
                callback(new Error('部门名称重复'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入 2-10 个字符', trigger: 'blur' },
          {
            validator: async(rule, value, callback) => {
              const res = await depGetDepartment()
              if (res.some(item => item.code === value)) {
                callback(new Error('部门编码重复'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        managerId: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '请输入 1-100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      // 重置表单
      this.$refs.addDept.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 获取部门负责人列表
    async getManagerList() {
      this.managerList = await depGetManagerList()
    },
    // 确定
    btnOk() {
      this.$refs.addDept.validate(async(isOK) => {
        if (isOK) {
          await depAddDepartment({ ...this.formData, pid: this.currentNodeId })
          // 通知父组件更新
          this.$emit('updateDepartment')
          // 提示
          this.$message.success('添加成功')
          this.close()
        }
      })
    },
    // 获取部门信息详情
    async getDepartmentInfo() {
      this.formData = await depGetDepartmentInfo(this.currentNodeId)
    }
  }
}
</script>

<style>
</style>
