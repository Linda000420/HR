<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理 -->
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showDialog=true">添加角色</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="roleList">
        <el-table-column prop="name" width="200" align="center" label="角色">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" width="200" align="center" label="启用">
          <template v-slot="{ row }">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" size="mini" />
            <span v-else>{{ row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" size="mini" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini" @click="btnEditOk(row)">确定</el-button>
              <el-button size="mini" @click="btnCancelEdit(row)">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text" size="mini">分配权限</el-button>
              <el-button type="text" size="mini" @click="btnEditRow(row)">编辑</el-button>
              <el-popconfirm title="您确认要删除吗？" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" style="margin-left: 10px" type="text" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="end" style="height: 60px" align="middle">
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="prev, pager, next"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <!-- 弹层 -->
    <el-dialog width="500px" title="添加角色" :visible.sync="showDialog" @close="btncancel">
      <!-- 表单 -->
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" size="mini" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" style="width:300px" size="mini" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button size="mini" type="primary" @click="btnOk">确定</el-button>
              <el-button size="mini" @click="btncancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { roleGetRoleList, roleAddRole, roleUpdateRole, roleDelRole } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      roleList: [], //  角色列表
      pageParams: {
        page: 1, //  所在页数
        pagesize: 5, //  每页展示数量
        total: 0 //  角色总数
      },
      showDialog: false, //  控制弹层显示隐藏
      roleForm: {
        name: '',
        state: 0,
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await roleGetRoleList(this.pageParams)
      this.roleList = rows
      this.pageParams.total = total
      // 针对每一行增加编辑标记
      this.roleList.forEach(item => {
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },
    // 切换页码
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    },
    // 确定按钮
    btnOk() {
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          await roleAddRole(this.roleForm)
          this.$message.success('增加成功')
        }
      })
      this.btncancel()
      this.pageParams.page = this.pageParams.total / this.pageParams.pagesize + 1
      this.getRoleList()
    },
    // 取消按钮
    btncancel() {
      this.roleForm = {
        name: '',
        state: 0,
        description: ''
      }
      this.showDialog = false
    },
    // 编辑按钮
    btnEditRow(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    // 确定编辑
    async btnEditOk(row) {
      if (row.editRow.name && row.editRow.description) {
        await roleUpdateRole({ ...row.editRow, id: row.id })
        this.$message.success('编辑成功')
        // 更新显示数据
        Object.assign(row, {
          ...row.editRow,
          isEdit: false
        })
      } else {
        this.$message.warning('角色名称和角色描述不能为空')
      }
    },
    // 取消编辑
    btnCancelEdit(row) {
      row.isEdit = false
    },
    // 确认删除
    async confirmDel(id) {
      await roleDelRole(id)
      this.$message.success('删除成功')
      if (this.roleList.length === 1 && this.pageParams.page > 1) this.pageParams.page--
      this.getRoleList()
    }
  }
}
</script>

<style scoped>
.role-operate{
  padding: 10px;
}
</style>
