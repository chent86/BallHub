<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="地点">
        <el-input v-model="form.location" style="width: 200px;"></el-input>
      </el-form-item>        
      <el-form-item label="类型">
        <el-radio-group v-model="form.type" >
          <el-radio label="油漆地球场"></el-radio>
          <el-radio label="水泥地球场"></el-radio>
          <el-radio label="木板室内场"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="费用">
        <el-input v-model="form.price" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加！</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        location: '',
        type: '油漆地球场',
        price: ''
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('AddCourt', this.form).then((res) => {
        this.loading = false;
        // this.form.location = '';
        // this.form.type = '油漆地球场';
        // this.form.price = '';
        if (res === 'ok') {
          this.$message.success('成功添加球场!');
          this.$store.dispatch('GetAllCourt');
        } else {
          this.$message.error('添加球场失败!');
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    }
  }
};
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

