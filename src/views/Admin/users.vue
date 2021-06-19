<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="注册日期">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户姓名">
            </el-table-column>
            <el-table-column
            prop="email"
            label="用户邮箱">
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button @click="handleToFreeze(scope.$index,scope.row)" type="text" size="small">{{scope.row.isFreeze ? '已冻结' : '未冻结'}}</el-button>
                <el-button type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  name: 'users',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.axios.get('/api/admin/usersList').then((res) => {
    //   console.log(res)
      const status = res.data.status
      if (status === 0) {
        this.tableData = res.data.data.usersList
      }
    })
  },
  methods: {
    handleToFreeze(index, row) {
    //   console.log(row)
      this.axios.post('/api/admin/updateFreeze', {
        username: row.username,
        isFreeze: !row.isFreeze
      }).then((res) => {
        console.log(res)
        const status = res.data.status
        if (status === 0) {
          this.$alert('冻结操作成功', '信息', {
            confirmButtonText: '确定',
            callback: action => {
              this.tableData[index].isFreeze = !row.isFreeze
            }
          })
        } else {
          this.$alert('冻结操作失败', '信息', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
