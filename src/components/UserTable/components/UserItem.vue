<template>
  <div>
    <el-row type="flex">
      <el-col :span="4">
        <img class="user-item-avatar" :src="avatarSrc"/>
      </el-col>
      <el-col :span="10">
        <div class="user-item-upper">
          <span><router-link class="user-item-link" :to="{ name: 'userDetail', params: { userId: this.user.user_id }}">{{this.user.realname}}</router-link></span>
          <span>({{this.user.username}})</span>
        </div>
        <div class="user-item-lower">
          <span><svg-icon icon-class="email"></svg-icon></span>
          <span>{{this.user.email}}</span>
        </div>
      </el-col>
      <el-col :span="5" class="vertically-center-box">
        <div>
          <span class="radius-span male" v-if="this.user.gender == 'male'">
            <svg-icon icon-class="male"/>
            Male
          </span>
          <span class="radius-span female" v-else-if="this.user.gender == 'female'">
            <svg-icon icon-class="female"/>
            Female
          </span>
        </div>
      </el-col>
      <el-col :span="5" class="vertically-center-box">
        <div>
          <span class="radius-span valid" v-if="this.user.is_valid == 1">
            <i class="el-icon-success"></i>
            VALID
          </span>
          <span class="radius-span invalid" v-else-if="this.user.is_valid == 0">
            <i class="el-icon-error"></i>
            INVALID
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: [
    'user',
    // 'user_id',
    // 'username',
    // 'nickname',
    // 'realname',
    // 'email',
    // 'phone',
    // 'homepage',
    // 'gender',
    // 'created_at',
    // 'is_valid'
  ]
})
export default class UserItem extends Vue {
  get avatarSrc() {
    return `/api/users/${this.user.user_id}/avatar`;
  }
}
</script>

<style>
.user-item-avatar {
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
}

.user-item-lower {
  margin-top: 10px;
}

.radius-span {
  padding: 8px;
  border-radius: 4px;
  color: #303133;
}

.radius-span.male {
  background-color: #409EFF;
}

.radius-span.female {
  background-color: #F56C6C;
}

.radius-span.valid {
  background-color: #67C23A;
}

.radius-span.invalid {
  background-color: #909399;
}

.vertically-center-box {
  display: flex;
  align-items: center;
}

.user-item-link {
  font-weight: bold;
  color: #409EFF;
}
</style>
