<template>
  <div class="app-container">
    <el-dialog
    title="邀请"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form label-width='120px'>
      <el-form-item label='用户'>
        <el-autocomplete
          class='inline-input'
          v-model='state'
          :fetch-suggestions='querySearch'
          placeholder='请输入用户名'
          :trigger-on-focus='false'
          @select='handleSelect'>
        </el-autocomplete>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sendInvitation">确定</el-button>
      </span>
    </el-dialog>
    <el-table :data="myGame_tableInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>球局编号: {{ props.row.gid }}</p>
          <p>类型: {{ props.row.type }}</p>
          <p>最大人数: {{ props.row.number }}</p>
          <!-- <p>当前人数: {{ props.row.count(uid) }}</p> -->
        </template>
      </el-table-column>
       <el-table-column prop="start_time" label="开始时间" width="180" sortable>
      </el-table-column>
       <el-table-column prop="end_time" label="结束时间" width="180" sortable>
      </el-table-column>
       <el-table-column prop="location" label="地点" width="180">
      </el-table-column>
       <el-table-column prop="count(uid)" label="当前人数" width="180" sortable>
      </el-table-column>
      <el-table-column prop="role" label="身份">
        <template slot-scope="scope">
          <el-tag :type="scope.row.role === '组织者' ? 'primary' : 'success'" disable-transitions>{{scope.row.role}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleInvite(scope.$index, scope.row)">发出邀请</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">放鸽子</el-button>
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
      dialogVisible: false,
      links: [],
      state: '',
      uid: 0,
      gid: 0
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.role === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleDelete(index, row) {
      this.$store.dispatch('QuitGame', {
        'gid': row.gid
      }).then((res) => {
        if (res === 'ok') {
          this.$store.dispatch('GetMyGame');
          this.$store.dispatch('SendPigeon', {
            'gid': row.gid
          }).then((res) => {
            this.loading = false;
            this.$message.success('已发送退赛邮件');
            this.state = '';
            this.dialogVisible = false;
          });
        } else {
          this.$message.error('请求失败！');
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    },
    handleInvite(index, row) {
      this.uid = 0;
      this.state = 0;
      this.gid = row.gid;
      this.dialogVisible = true;
    },
    sendInvitation() {
      if (this.uid === 0) {
        this.$message.error('请选择一个用户');
      } else {
        this.$store.dispatch('SendInvitation', {
          'uid': this.uid,
          'gid': this.gid
        }).then((res) => {
          this.loading = false;
          this.$message.success('成功发送邀请');
          this.state = '';
          this.dialogVisible = false;
        }).catch((err) => {
          this.loading = false;
          this.$message.success('请求失败');
          console.log(err);
        });
      }
    },
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    init() {
      this.$store.dispatch('GetMyGame').then((res) => {
        this.loading = false;
        if (res === 'error') {
          this.$message.error('请求失败!');
        } else {
          this.total = this.myGame_tableInfo.length * 10 / this.pagesize;
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    },
    querySearch(queryString, callback) {
      var links = this.links;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;
      // call callback function to return suggestions
      callback(results);
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      this.$store.dispatch('GetAllUser').then((res) => {
        this.loading = false;
        this.links = this.all_user;
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    },
    handleSelect(item) {
      this.uid = item.uid;
    }
  },
  computed: {
    ...mapGetters([
      'myGame_tableInfo',
      'all_user'
    ])
  },
  mounted() {
    this.init();
    this.loadAll();
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

