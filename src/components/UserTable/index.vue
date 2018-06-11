<template>
  <el-container>
    <el-main>
      <el-header>
        <filter-bar @enter="onFilterEnter" class="filter-bar"></filter-bar>
      </el-header>
      <vuetable
        ref="vuetable"
        api-url="/api/users/table"
        :fields="fields"
        :append-params="appendParams"
        @vuetable:pagination-data="onPaginationData"
        pagination-path=""
      >
        <user-item
          slot="user-info"
          slot-scope="props"
          :user="props.rowData"
          />
      </vuetable>
      <div class="pagination">
        <vuetable-pagination
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
          >
        </vuetable-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Vuetable from 'vuetable-2/src/components/Vuetable';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
import FilterBar from './components/FilterBar';
import UserItem from './components/UserItem';

@Component({
  components: {
    Vuetable,
    VuetablePagination,
    FilterBar,
    UserItem
  }
})
export default class UserTable extends Vue {
  appendParams = {};
  fields = [
    {
      name: '__slot:user-info',
      title: 'UserInfo',
      titleClass: 'center aligned'
    }
  ];
  onPaginationData(paginationData) {
    this.$refs.pagination.setPaginationData(paginationData);
  }
  onChangePage(page) {
    this.$refs.vuetable.changePage(page);
  }
  onFilterEnter(filterText) {
    const filterTextTrim = filterText.trim();
    if (filterTextTrim.length > 0) {
      this.appendParams = {
        'filter': filterText
      };
    } else {
      this.appendParams = {};
    }
    Vue.nextTick(() => this.$refs.vuetable.refresh());
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 10px;
}
</style>
