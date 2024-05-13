<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理 -->
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="roleList">
        <el-table-column prop="name" width="200" align="center" label="角色" />
        <el-table-column prop="state" width="200" align="center" label="启用">
          <template v-slot="{ row }">
            <span>{{ row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template>
            <el-button type="text" size="mini">分配权限</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="end" style="height: 60px" align="middle">
        <el-pagination layout="prev, pager, next" />
      </el-row>
    </div>
  </div>
</template>
<script>
import { roleGetRoleList } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      roleList: [], //  角色列表
      total: null //  角色总数
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await roleGetRoleList()
      this.roleList = rows
      this.total = total
    }
  }
}
</script>

<style scoped>
.role-operate{
  padding: 10px;
}
</style>
