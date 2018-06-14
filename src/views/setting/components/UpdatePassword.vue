<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="旧密码">
        <el-input v-model="form.old_pass" :type="old_pass_show" style="width: 200px;"></el-input>
        <span @click="show_old_pass"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.new_pass" :type="new_pass_show" style="width: 200px;"></el-input>
        <span @click="show_new_pass"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.pass_again" :type="again_pass_show" style="width: 200px;"></el-input>
        <span @click="show_again_pass"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
      </el-form-item>
    </el-form>      
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';
const validate = (value) => {
  if (value.length < 5) {
    return 'short';
  }
  if (value.length === 0) {
    return 'empty';
  }
  for (var i = 0; i < value.length; i++) {
    if (value[i] < '0' || value[i] > '9') {
      return 'not a number';
    }
  }
  return 'ok';
};

export default {
  data() {
    return {
      form: {
        'old_pass': '',
        'new_pass': '',
        'pass_again': ''
      },
      old_pass_show: 'password',
      new_pass_show: 'password',
      again_pass_show: 'password'
    };
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    onSubmit() {
      if (validate(this.form.new_pass) === 'short') {
        this.$message.error('密码不能小于5位!');
      } else if (this.form.new_pass !== this.form.pass_again) {
        this.$message.error('两次密码输入不一致!');
      } else if (this.form.old_pass === '') {
        this.$message.error('请输入密码!');
      } else {
        this.$store.dispatch('UpdatePassword', {
          'username': this.username,
          'old_pass': this.form.old_pass,
          'new_pass': this.form.new_pass
        }).then((res) => {
          this.loading = false;
          if (res === 'ok') {
            this.$message.success('成功修改密码!');
            Cookies.set('userInfo', {
              'username': this.username,
              'password': this.form.new_pass
            });
          } else if (res === 'error') {
            this.$message.error('修改失败!');
          }
          this.form.old_pass = '';
          this.form.new_pass = '';
          this.form.pass_again = '';
        }).catch((err) => {
          this.loading = false;
          console.log(err);
        });
      }
    },
    show_old_pass() {
      if (this.old_pass_show === 'password') {
        this.old_pass_show = '';
      } else {
        this.old_pass_show = 'password';
      }
    },
    show_new_pass() {
      if (this.new_pass_show === 'password') {
        this.new_pass_show = '';
      } else {
        this.new_pass_show = 'password';
      }
    },
    show_again_pass() {
      if (this.again_pass_show === 'password') {
        this.again_pass_show = '';
      } else {
        this.again_pass_show = 'password';
      }
    }
  }
};
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

