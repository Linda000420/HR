<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree default-expand-all :expand-on-click-node="false" :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <template v-slot="{ data }">
          <el-row style="width: 100%; height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- 下拉菜单 -->
              <el-dropdown @command="operateDept($event, data.id)">
                <span class="el-dropdown-link">
                  操作
                  <el-icon class="el-icon-arrow-down el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                    <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                    <el-dropdown-item command="del">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 弹层 -->
    <add-dept ref="addDept" :current-node-id="currentNodeId" :show-dialog.sync="showDialog" @updateDepartment="getDepartment" />
  </div>
</template>
<script>
import { depGetDepartment, depDelDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'Department',
  components: {
    AddDept
  },
  data() {
    return {
      depts: [], //  部门列表
      defaultProps: {
        label: 'name', // 要显示的字段的名字
        children: 'children' // 读取子节点的字段名
      },
      showDialog: false, //  控制弹层显示隐藏
      currentNodeId: null //  存储当前点击的 id
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
    },
    // 操作部门
    operateDept(type, id) {
      // 添加子部门
      if (type === 'add') {
        this.currentNodeId = id
        this.showDialog = true
      } else if (type === 'edit') {
        // 编辑部门
        this.showDialog = true
        this.currentNodeId = id
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentInfo()
        })
      } else {
        // 删除部门
        this.$confirm('您确认要删除该部门吗？', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await depDelDepartment(id)
          this.$message.success('删除成功')
          this.getDepartment()
        })
      }
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
