<template>
  <div class="container">
    <div class="app-container">
      <el-button class="btn-add" type="primary" size="mini">添加权限</el-button>
      <el-table row-key="id" :data="permissionList" default-expand-all>
        <el-table-column prop="name" label="名称" />
        <el-table-column align="center" prop="code" label="标识" />
        <el-table-column align="center" prop="description" label="描述" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type===1" type="text" size="mini">添加</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { perGetPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      permissionList: [] //  权限点列表
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限点列表
    async getPermissionList() {
      this.permissionList = transListToTreeData(await perGetPermissionList(), 0)
    }
  }
}
</script>

<style scoped>
.btn-add {
  margin: 10px;
}
</style>
