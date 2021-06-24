<template>
    <div>
        <el-table
            :data="nowTableData"
            border
            style="width: 100%">
            <el-table-column
            prop="userHead"
            label="用户头像">
              <template slot-scope="scope">
                <img class="userHead" :src="scope.row.userHead" alt="">
              </template>
            </el-table-column>
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
                <!-- scope.$index获取数据下标,scope.row获取数据内容 -->
                <el-button @click="handleToFreeze(scope.$index,scope.row)" type="text" size="small">{{scope.row.isFreeze ? '已冻结' : '未冻结'}}</el-button>
                <el-button @click="handleToDelete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination class="page"
          background
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="tableData.length">
        </el-pagination>
    </div>
</template>
<script>
export default {
  name: 'users',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 4
    }
  },
  computed: {
    nowTableData() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize) || []
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
              this.$store.commit('user/USER_NAME', { username: '', isAdmin: false, userHead: '' })
            }
          })
        } else {
          this.$alert('冻结操作失败', '信息', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    handleToDelete(index, row) {
      this.axios.post('/api/admin/deleteUser', { username: row.username })
        .then((res) => {
          const status = res.data.status
          if (status === 0) {
            this.$alert('删除操作成功', '信息', {
              confirmButtonText: '确定',
              callback: action => {
                console.log(index)
                this.tableData.splice(index, 1)
              }
            })
          } else {
            this.$alert('删除操作失败', '信息', {
              confirmButtonText: '确定'
            })
          }
        })
    }
  }
}
</script>
<style scoped>
  .page{margin-top: 20px;}
  .userHead{width: 60px;height: 55px;border-radius: 50%;overflow: hidden;margin: auto;}
</style>
