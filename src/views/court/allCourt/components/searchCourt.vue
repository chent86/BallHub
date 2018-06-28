<template>
  <div class="app-container">
    <el-table :data="allCourt_tableInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column prop="cid" label="编号" width="100">
      </el-table-column>
     <el-table-column prop="location" label="地点">
      </el-table-column>
      <el-table-column prop="price" label="费用" sortable>
      </el-table-column>
      <el-table-column prop="link" label="引用次数" sortable>
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
    handleJoin(index, row) {
      this.$store.dispatch('JoinGame', {
        'gid': row.gid
      }).then((res) => {
        if (res === 'ok') {
          this.$message.success('成功加入球局!');
          this.$store.dispatch('GetAllGame');
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
      this.$store.dispatch('GetAllCourt').then((res) => {
        this.loading = false;
        this.total = this.allCourt_tableInfo.length * 10 / this.pagesize;
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    }
  },
  computed: {
    ...mapGetters([
      'allCourt_tableInfo'
    ])
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.page-wrapper{
  margin-top: 20px;
}
</style>


