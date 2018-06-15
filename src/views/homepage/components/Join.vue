<template>
  <div class="app-container">
    <el-table :data="myGame_tableInfo" style="width: 100%">
       <el-table-column prop="start_time" label="开始时间" width="180" sortable>
      </el-table-column>
       <el-table-column prop="end_time" label="结束时间" width="180" sortable>
      </el-table-column>
       <el-table-column prop="type" label="类型" width="100">
      </el-table-column>
       <el-table-column prop="max_number" label="最大人数" width="100" sortable>
      </el-table-column>
       <el-table-column prop="current_number" label="当前人数" sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">申请加入</el-button>
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
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  },
  computed: {
    ...mapGetters([
      'myGame_tableInfo'
    ])
  }
};
</script>

