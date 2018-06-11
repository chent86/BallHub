<template>
  <el-container class="outer-container">
    <el-aside width="400px">
      <div class="aside-block">
        <el-button type="primary" @click="userFormVisible = true;">新建用户</el-button>
        <el-button type="primary">批量导入用户</el-button>
        <div class="user-count-container">
          <div class="card">
            <svg-icon icon-class="user" class="user-count-icon"></svg-icon>
            <div class="user-count-text">
              <div>用户数:</div>
              <div style="margin-top: 10px; font-weight: bold;">{{userCountText}}</div>
            </div>
          </div>
        </div>
      </div>
    </el-aside>
    <user-table></user-table>
    <user-form-dialog :visible.sync="userFormVisible" title="新建用户" @confirm="confirmCreateUser" @cancel="cancelCreateUser"/>
  </el-container>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import UserTable from '@/components/UserTable';
import UserFormDialog from './components/UserFormDialog';
import { getUserCount } from '@/api/users';

@Component({
  name: 'user-manage',
  components: {
    UserTable,
    UserFormDialog
  }
})
export default class UserManage extends Vue {
  userCount = -1;
  userFormVisible = false;
  created() {
    getUserCount().then((resp) => {
      this.userCount = parseInt(resp.data);
    });
  }
  get userCountText() {
    if (this.userCount > 0) return this.userCount + '';
    else return ' 获取中...';
  }
  confirmCreateUser(form) {
    console.log(form);
  }
  cancelCreateUser() {
    console.log('cancelled');
  }
}
</script>

<style scoped>
.outer-container {
  margin-top: 20px;
}

.aside-block {
  margin-left: 5%;
}

.el-aside {
  padding: 20px;
}

.user-count-container {
  margin-top: 20px;
}

.user-count-icon {
  background-color: #409EFF;
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  transition: 0.3s;
}

.user-count-text {
  display: inline-block;
  margin-left: 10px;
  font-size: 18px;
}

.card {
  border-radius: 4px;
  background-color: #F2F6FC;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
}
</style>
