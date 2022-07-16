<template>
  <div>
    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column type="index" width="50" label="#" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="tel" label="电话" width="180" />
      <el-table-column prop="rol" label="角色" width="180" />
      <el-table-column prop="state" label="状态" width="180">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.state"
            :active-value="1"
            :inactive-value="0"
            @change="changeState(state)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" />
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        state: 1,
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        state: 1,
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        state: 1,
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        state: 0,
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    changeState (row) {
      this.$confirm('是否处理权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '更改成功!'
        })
      }).catch(() => {
        if (row.state === 1) {
          row.state = 0
        } else {
          row.state = 1
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
