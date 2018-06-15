<template>
  <div class="app-container">
    <el-form>
      <el-form-item class='delete_button'>
        <el-button type="danger" @click="onDelete">确认注销</el-button>
      </el-form-item>
    </el-form>      
  </div>
</template>

<script>
export default {
  methods: {
    onDelete() {
      this.$store.dispatch('DeleteUser').then((res) => {
        this.loading = false;
        if (res === 'ok') {
          this.loading = false;
          this.$store.state.auth = false;
          this.$router.push({ path: '/login' });
        } else if (res === 'error') {
          this.$message.error('注销失败!');
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
.delete_button{
  margin-left: 89px;
  margin-top: 50px;
}
</style>

