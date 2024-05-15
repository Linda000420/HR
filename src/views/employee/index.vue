<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom:10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
          @input="searchEmployee"
        />
        <!-- 树形组件 -->
        <el-tree
          ref="deptTree"
          node-key="id"
          :expand-on-click-node="false"
          highlight-current
          default-expand-all
          :data="deptList"
          :props="defaultProps"
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary" @click="goDetail">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog = true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="employeeList">
          <el-table-column prop="staffPhoto" align="center" label="头像">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30" />
              <span v-else class="username">{{ row.username.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" align="center" label="姓名" />
          <el-table-column prop="mobile" sortable align="center" label="手机号" />
          <el-table-column prop="workNumber" sortable align="center" label="工号" />
          <el-table-column prop="formOfEmployment" align="center" label="聘用形式">
            <template v-slot="{ row }">
              <span>{{ row.formOfEmployment === 1 ? '正式' : row.formOfEmployment === 2 ? '非正式' : '无' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" align="center" label="部门" />
          <el-table-column prop="timeOfEntry" sortable align="center" label="入职时间" />
          <el-table-column align="center" width="280px" label="操作">
            <template v-slot="{ row }">
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-popconfirm style="margin-left: 10px" title="您确认要删除吗？" @onConfirm="del(row.id)">
                <template #reference>
                  <el-button size="mini" type="text">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            layout="total, prev, pager, next"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="changePage"
          />
        </el-row>
      </div>
    </div>
    <!-- 导入弹层 -->
    <import-excel :show-excel-dialog.sync="showExcelDialog" @uplodaSuccess="getEmployeeList" />
  </div>
</template>

<script>
import { depGetDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import { empGetEmployeeList, empExportEmployee, empDelEmployee } from '@/api/employee'
import FileSaver from 'file-saver'
import ImportExcel from './components/import-excel.vue'
export default {
  name: 'Employee',
  components: {
    ImportExcel
  },
  data() {
    return {
      deptList: [], //  部门数据
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      queryParams: {
        departmentId: null, //  部门id
        page: 1, //  当前页码数
        pagesize: 10, //  一页的数据数量
        keyword: '' //  关键词
      },
      employeeList: [], //  当前页员工列表
      total: 0, //  员工总数
      showExcelDialog: false //  控制导入文件弹层
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取部门
    async getDepartment() {
      this.deptList = transListToTreeData(await depGetDepartment(), 0)
      this.queryParams.departmentId = this.deptList[0].id
      this.$nextTick(() => {
        // 设置选中节点
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
      this.getEmployeeList()
    },
    // 选中节点，记录 id
    selectNode(node) {
      this.queryParams.departmentId = node.id
      this.queryParams.page = 1
      this.getEmployeeList()
    },
    // 获取员工列表
    async getEmployeeList() {
      const { total, rows } = await empGetEmployeeList(this.queryParams)
      this.employeeList = rows
      this.total = total
    },
    // 切换页码
    changePage(newPage) {
      this.queryParams.page = newPage
      this.getEmployeeList()
    },
    // 搜索员工
    searchEmployee() {
      // 清理上一次定时器
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployeeList()
      }, 500)
    },
    // 导出export
    async exportEmployee() {
      const res = await empExportEmployee()
      // 下载文件
      FileSaver.saveAs(res, '员工信息表.xlsx')
    },
    // 删除员工
    async del(id) {
      await empDelEmployee(id)
      if (this.employeeList.length === 1 && this.queryParams.page > 1) this.queryParams.page--
      this.$message.success('删除成功')
      this.getEmployeeList()
    },
    // 跳转员工详情
    goDetail() {
      this.$router.push('/employee/detail')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
