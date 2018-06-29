<template>
  <div class="app-container">
    <el-table :data="myMail_tableInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column prop="mid" label="编号" width="100">
      </el-table-column>
      <el-table-column prop="sender" label="发件人">
      </el-table-column>
      <el-table-column prop="message" label="内容">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleYes(scope.$index, scope.row)">好的</el-button>
          <el-button size="mini" type="danger" @click="handleNo(scope.$index, scope.row)">不了</el-button>
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
      pagesize: 10, // 每页的数据条数
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
    handleYes(index, row) {
      this.$emit('launch', row);
    },
    handleNo(index, row) {
      this.$store.dispatch('DeleteMail', {
        'uid': row.uid,
        'mid': row.mid
      }).then((res) => {
        if (res === 'ok') {
          this.$store.dispatch('GetMyMail');
        } else {
          this.$message.error('请求失败!');
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
      this.$store.dispatch('GetMyMail').then((res) => {
        this.loading = false;
        this.total = this.myMail_tableInfo.length * 10 / this.pagesize;
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    }
  },
  computed: {
    ...mapGetters([
      'myMail_tableInfo'
    ])
  },
  mounted() {
    this.init();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
  background: #fff;
  padding: 16px 16px 50px 16px; 
  margin: 32px; 
}
.page-wrapper{
  margin-top: 20px;
}
</style>

