<template>
  <div class='app-container'>
    <el-form ref='form' :model='form' label-width='120px'>
      <el-form-item label='开始时间'>
        <el-col :span='11'>
          <el-date-picker type='datetime' value-format='yyyy-MM-dd HH:mm:ss' placeholder='Pick a date' v-model='form.start_time' style='width: 200px;'></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label='结束时间'>
        <el-col :span='11'>
          <el-date-picker type='datetime' value-format='yyyy-MM-dd HH:mm:ss' placeholder='Pick a date' v-model='form.end_time' style='width: 200px;'></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label='地点'>
        <el-autocomplete
          class='inline-input'
          v-model='state'
          :fetch-suggestions='querySearch'
          placeholder='Please Input'
          :trigger-on-focus='false'
          @select='handleSelect'>
        </el-autocomplete>
      </el-form-item>      
      <el-form-item label='类型'>
        <el-radio-group v-model='form.type' >
          <el-radio label='半场'></el-radio>
          <el-radio label='全场'></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='人数'>
        <el-input v-model='form.number' style='width: 200px;'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='onSubmit'>启动！</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      form: {
        start_time: '',
        end_time: '',
        type: '半场',
        number: '',
        cid: ''
      },
      links: [],
      state: ''
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('OrganizeGame', this.form).then((res) => {
        this.loading = false;
        this.form.start_time = '';
        this.form.end_time = '';
        this.form.type = '';
        this.form.number = '';
        if (res === 'ok') {
          this.$message.success('成功发起球局!');
          this.$store.dispatch('GetAllGame');
        } else {
          this.$message.error('发起球局失败!');
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
      this.$store.dispatch('GetAllCourt').then((res) => {
        this.loading = false;
        this.links = this.allCourt_tableInfo;
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    },
    handleSelect(item) {
      this.form.cid = item.cid;
    }
  },
  mounted() {
    this.loadAll();
  },
  computed: {
    ...mapGetters([
      'allCourt_tableInfo'
    ])
  }
};
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

