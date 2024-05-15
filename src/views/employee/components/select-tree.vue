<template>
  <el-cascader
    size="mini"
    separator="-"
    :value="value"
    :props="props"
    :options="depts"
    @change="changeValue"
  />
</template>

<script>
import { depGetDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      depts: [], //  部门列表
      props: {
        label: 'name', //  要展示的字段
        value: 'id' //  要存储的字段
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取部门列表
    async getDepartment() {
      this.depts = transListToTreeData(await depGetDepartment(), 0)
    },
    changeValue(list) {
      // 取最后一个数据
      if (list.length > 0) {
        this.$emit('input', list[list.length - 1])
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>

<style>

</style>
