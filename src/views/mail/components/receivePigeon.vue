<template>
  <div class='app-container'>
    <el-form ref='form' :model='form' label-width='120px' class='wrapper'>
      <el-button type='primary' class='button'>比赛信息</el-button>
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
        <el-input v-model='form.location' style='width: 200px;' ></el-input>
      </el-form-item>      
      <el-form-item label='类型'>
        <el-input v-model='form.type' style='width: 200px;'></el-input>
      </el-form-item>
      <el-form-item label='理想人数'>
        <el-input v-model='form.number' style='width: 200px;'></el-input>
      </el-form-item>
    </el-form>
    <el-form ref='form' :model='form' label-width='120px' class='wrapper'>
      <img :src="pigeon" alt="pigeon">
      <el-form-item label='鸽子王'>
        <el-input v-model='form.sender' style='width: 200px;'></el-input>
      </el-form-item>   
      <el-form-item>
        <el-button type='success' @click='$emit("launch", {"type":"mailbox"})'>返回</el-button>
      </el-form-item> 
    </el-form>
  </div>
</template>

<script>
import pigeon from '@/assets/dove.png';
export default {
  props: ['row'],
  data() {
    return {
      form: {
        start_time: '',
        end_time: '',
        type: '半场',
        location: '',
        number: '',
        sender: ''
      },
      pigeon
    };
  },
  mounted() {
    this.$store.dispatch('GetOneGame', this.row.gid).then((res) => {
      this.loading = false;
      if (res !== 'error') {
        this.form.start_time = res.start_time;
        this.form.end_time = res.end_time;
        this.form.location = res.location;
        this.form.type = res.type;
        this.form.number = res.number;
      } else {
        this.$message.error('获取球局信息失败');
      }
    }).catch((err) => {
      this.loading = false;
      console.log(err);
    });
    this.form.sender = this.row.sender;
  }
};
</script>

<style scoped>
.line{
  text-align: center;
}
.wrapper {
  display: inline-block;
}
.button {
  margin-left: 55px;
  margin-bottom: 15px;
}
</style>

