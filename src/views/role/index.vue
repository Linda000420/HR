<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理 -->
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <!-- 表格 -->
      <el-table>
        <el-table-column width="200" align="center" label="角色">
          <span />
        </el-table-column>
        <el-table-column width="200" align="center" label="启用">
          <span />
        </el-table-column>
        <el-table-column align="center" label="描述">
          <span />
        </el-table-column>
        <el-table-column align="center" label="操作">
          <el-button>新建</el-button>
          <el-button>编辑</el-button>
          <el-button>删除</el-button>
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
export default {
  name: 'Role'
}
</script>

<style scoped>
.role-operate{
  padding: 10px;
}
</style>
