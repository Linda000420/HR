<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree default-expand-all :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <template v-slot="{ data }">
          <el-row style="width: 100%; height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- 下拉菜单 -->
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作
                  <el-icon class="el-icon-arrow-down el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                    <el-dropdown-item>编辑部门</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script>
import { depGetDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Department',
  data() {
    return {
      // 数据属性
      depts: [],
      defaultProps: {
        // 要显示的字段的名字
        label: 'name',
        // 读取子节点的字段名
        children: 'children'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取部门列表数据
    async getDepartment() {
      const res = await depGetDepartment()
      this.depts = transListToTreeData(res, 0)
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 150px;
  font-size: 14px;
}

.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 10px;
}

.el-dropdown-link {
  padding: 0 30px;
}
</style>
