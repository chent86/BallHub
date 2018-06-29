<template>
  <div class="app-container">
    <el-table :data="allGame_tableInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column prop="gid" label="球局编号" width="100" sortable>
      </el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="180" sortable>
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="180" sortable>
      </el-table-column>
      <el-table-column prop="location" label="地点" width="180" sortable>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="180">
      </el-table-column>
      <el-table-column prop="number" label="最大人数" width="180" sortable>
      </el-table-column>
      <el-table-column prop="count(uid)" label="当前人数" sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleJoin(scope.$index, scope.row)">申请加入</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        small 
        layout="prev, pager, next"
        :total="total" 
        @current-change="current_change"
        class="page-wrapper">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      total: 0, // 默认数据总数
      pagesize: 9, // 每页的数据条数
      currentPage: 1, // 默认开始页面
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleJoin(index, row) {
      this.$store.dispatch('JoinGame', {
        'gid': row.gid
      }).then((res) => {
        if (res === 'ok') {
          this.$message.success('成功加入球局!');
        } else {
          this.$message.error('您已在该球局中!');
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    },
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    init() {
      this.$store.dispatch('GetAllGame').then((res) => {
        this.loading = false;
        this.total = this.allGame_tableInfo.length * 10 / this.pagesize;
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    }
  },
  computed: {
    ...mapGetters([
      'allGame_tableInfo'
    ]),
    // allGame_tableInfo() {
    //   return this.$store.state.console_user.allGame_tableInfo;
    // }
  },
  mounted() {
    this.init();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page-wrapper{
  margin-top: 20px;
}
</style>

