<template>
  <div class="app-container">
    <el-table :data="myGame_tableInfo" style="width: 100%">
      <el-table-column prop="gid" label="编号" width="100" sortable>
      </el-table-column>
       <el-table-column prop="start_time" label="开始时间" width="180" sortable>
      </el-table-column>
       <el-table-column prop="end_time" label="结束时间" width="180" sortable>
      </el-table-column>
       <el-table-column prop="type" label="类型" width="100">
      </el-table-column>
       <el-table-column prop="number" label="最大人数" width="100" sortable>
      </el-table-column>
       <el-table-column prop="count(uid)" label="当前人数" width="100" sortable>
      </el-table-column>
      <el-table-column prop="role" label="身份">
        <template slot-scope="scope">
          <el-tag :type="scope.row.role === '组织者' ? 'primary' : 'success'" disable-transitions>{{scope.row.role}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">放鸽子</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
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
          this.$message.success('真的不鸽了!');
          this.$store.dispatch('GetMyGame');
        } else {
          this.$message.error('不给鸽!');
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    }
  },
  computed: {
    ...mapGetters([
      'myGame_tableInfo'
    ])
  }
};
</script>

