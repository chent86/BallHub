<template>
  <div class="app-container">
    <el-table :data="allCourt_tableInfo" style="width: 100%">
      <el-table-column prop="cid" label="编号" width="100">
      </el-table-column>
     <el-table-column prop="location" label="地点">
      </el-table-column>
      <el-table-column prop="price" label="费用" sortable>
      </el-table-column>
      <el-table-column prop="link" label="引用次数" sortable>
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
    }
  },
  computed: {
    ...mapGetters([
      'allCourt_tableInfo'
    ])
  }
};
</script>

