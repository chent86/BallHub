<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="搜索">
        <el-input
          v-model="value"
          @input="onFilterInput"
          @keyup.enter.native="onFilterEnter"
          prefix-icon="el-icon-search"
          placeholder="请输入搜索内容"
          ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class FilterBar extends Vue {
  value = '';
  onFilterInput(val) {
    this.$emit('input', val);
  }
  onFilterEnter(val) {
    this.$emit('enter', this.value);
  }
}
</script>
