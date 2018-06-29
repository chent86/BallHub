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
      <el-form-item label='得分'>
        <el-input v-model='form.score' style='width: 200px;'></el-input>
      </el-form-item>
      <el-form-item label='助攻'>
        <el-input v-model='form.assist' style='width: 200px;'></el-input>
      </el-form-item>
      <el-form-item label='盖帽'>
        <el-input v-model='form.defend' style='width: 200px;'></el-input>
      </el-form-item>
      <el-form-item label='篮板'>
        <el-input v-model='form.rebound' style='width: 200px;'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='success' @click='onSubmit'>确定</el-button>
        <el-button type='info' @click='$emit("launch", {"type":"mailbox"})'>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['row'],
  data() {
    return {
      form: {
        score: '',
        assist: '',
        defend: '',
        rebound: '',
        start_time: '',
        end_time: '',
        type: '半场',
        location: '',
        number: ''
      }
    };
  },
  methods: {
    onSubmit() {
      // TODO: 验证是否时数字
      this.$store.dispatch('UpdateResult', {
        'gid': this.row.gid,
        'score': this.form.score,
        'assist': this.form.assist,
        'defend': this.form.defend,
        'rebound': this.form.rebound
      }).then((res) => {
        this.loading = false;
        this.form.score = '';
        this.form.assist = '';
        this.form.defend = '';
        this.form.rebound = '';
        if (res === 'ok') {
          this.$message.success('成功记录比赛结果!');
          this.$store.dispatch('DeleteMail', {
            'uid': this.row.uid,
            'mid': this.row.mid
          });
        } else {
          this.$message.error('请求失败!');
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    }
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

