<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <el-form ref="employeeForm" :model="employeeList" :rules="rules" label-width="220px">
          <!-- 姓名 部门 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="username">
                <el-input
                  v-model="employeeList.username"
                  size="mini"
                  class="inputW"
                  :disabled="!!$route.params.id"
                />
              </el-form-item>
            </el-col>

          </el-row>
          <!-- 工号 入职时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="工号" prop="workNumber">
                <el-input v-model="employeeList.workNumber" disabled size="mini" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机 聘用形式  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机" prop="mobile">
                <el-input
                  v-model="employeeList.mobile"
                  size="mini"
                  class="inputW"
                  :disabled="!!$route.params.id"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <!-- 放置及联部门组件 -->
                <select-tree v-model="employeeList.departmentId" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="employeeList.formOfEmployment" size="mini" class="inputW">
                  <el-option label="正式" :value="1" />
                  <el-option label="非正式" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker
                  v-model="employeeList.timeOfEntry"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker
                  v-model="employeeList.correctionTime"
                  size="mini"
                  type="date"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 员工照片 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工头像">
                <!-- 放置上传图片 -->
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 保存个人信息 -->
          <el-row type="flex">
            <el-col :span="12" style="margin-left:220px">
              <el-button size="mini" type="primary" @click="saveData">保存更新</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import { empAddEmployee, empGetEmployeeInfo, empUpdateEmployee } from '@/api/employee'
import SelectTree from './components/select-tree.vue'

export default {
  components: {
    SelectTree
  },
  data() {
    return {
      employeeList: {
        username: '', //  名字
        mobile: '', //  手机
        formOfEmployment: null, //  聘用形式
        workNumber: '', //  工号
        departmentId: null, //  部门id
        timeOfEntry: '', //  入职日期
        correctionTime: '', //  转正日期
        staffPhoto: '' //  头像
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 4, message: '姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '请选择聘用形式', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '请选择转正时间', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.employeeList.timeOfEntry) {
                if (new Date(this.employeeList.timeOfEntry) > new Date(value)) {
                  callback(new Error('转正时间不能小于入职时间'))
                  return
                }
              }
              callback()
            }
          }
        ]
      }
    }
  },
  created() {
    // 获取路由参数的id
    this.$route.params.id && this.getEmployeeInfo()
  },
  methods: {
    // 保存员工
    saveData() {
      this.$refs.employeeForm.validate(async isOK => {
        if (isOK) {
          if (this.$route.params.id) {
            // 修改员工信息
            await empUpdateEmployee(this.employeeList)
            this.$message.success('修改成功')
          } else {
            // 新增员工
            await empAddEmployee(this.employeeList)
            this.$message.success('添加成功')
          }
          this.$router.push('/employee')
        }
      })
    },
    // 获取员工基本信息
    async getEmployeeInfo() {
      this.employeeList = await empGetEmployeeInfo(this.$route.params.id)
    }
  }
}
</script>

<style scoped lang="scss">
    .edit-form {
      background: #fff;
      padding: 20px;
      .inputW {
        width: 380px
      }
    }

</style>
