<template>
  <el-dialog
    :title="this.title"
    :visible="show"
    @close="$emit('update:visible', false);">
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="formData.verifyPassword" type="password" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formData.gender">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formData.studentId" placeholder="学号(选填)"></el-input>
      </el-form-item>
      <el-form-item label="学院">
        <el-input v-model="formData.academy" placeholder="学院(选填)"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="formData.specialty" placeholder="专业(选填)"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: [
    'visible',
    'title',
    'form'
  ]
})
export default class UserFormDialog extends Vue {
  formData = {
    username: '',
    password: '',
    verifyPassword: '',
    realname: '',
    gender: '',
    studentId: '',
    academy: '',
    specialty: ''
  };
  get show() {
    return this.visible;
  }
  created() {
    if (this.form) {
      this.formData = this.form;
    }
  }
  confirm() {
    this.$emit('confirm', this.formData);
    this.close();
  }
  cancel() {
    this.$emit('cancel');
    this.close();
  }
  close() {
    this.$emit('update:visible', false);
  }
}
</script>
