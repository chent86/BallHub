<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="昵称">
        <el-input type="text" v-model="name_entry" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="生日" v-if="people_seen">
        <el-col :span="11">
          <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="birthday_entry" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="成立时间" v-if="team_seen">
        <el-col :span="11">
          <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="birthday_entry" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" v-if="people_seen">
        <el-radio-group v-model="sex_entry" >
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="费用" v-if="referee_seen" prop="price_entry">
        <el-input v-model="price_entry" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="球队描述" v-if="team_seen" prop="motto_entry">
        <el-input v-model="motto_entry" style="width: 200px;"></el-input>
      </el-form-item>            
      <el-form-item label="本周空闲时间">
        <el-col :span="5">
          <el-select v-model="free_time_1_entry" placeholder="please select your zone">
            <el-option label="星期一" value="Mon"></el-option>
            <el-option label="星期二" value="Tue"></el-option>
            <el-option label="星期三" value="Wed"></el-option>
            <el-option label="星期四" value="Thu"></el-option>
            <el-option label="星期五" value="Fri"></el-option>
            <el-option label="星期六" value="Sat"></el-option>
            <el-option label="星期天" value="Sun"></el-option>
            <el-option label="无" value=NULL></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="text-align: center;">-</el-col>
        <el-col :span="5">
          <el-select v-model="free_time_2_entry" placeholder="please select your zone">
            <el-option label="上午" value="Morning"></el-option>
            <el-option label="下午" value="Afternoon"></el-option>
            <el-option label="晚上" value="Evening"></el-option>
            <el-option label="无" value=NULL></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
      </el-form-item>
    </el-form>      
  </div>
</template>

<script>
const validate = (value) => {
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

import { mapGetters } from 'vuex';
export default {
  methods: {
    onSubmit() {
      if (this.role === 'referee' && validate(this.price) === 'not a number') {
        this.$message.error('Price should be number!');
      } else {
        this.$store.dispatch('UpdateLoginInfo', {
          'name': this.name,
          'birthday': this.birthday,
          'sex': this.sex,
          'free_time_1': this.free_time_1,
          'free_time_2': this.free_time_2,
          'price': this.price,
          'motto': this.motto
        }).then((res) => {
          console.log(res);
          this.loading = false;
          if (res === 'error') {
            this.$message.error('修改失败!');
          } else {
            this.$message.success('成功修改信息!');
          }
        }).catch(() => {
          this.loading = false;
          this.$message.error('修改失败!');
        });
      }
    }
  },
  computed: {
    name_entry: {
      get() {
        return this.name;
      },
      set(value) {
        this.$store.commit('SET_NAME', value);
      }
    },
    birthday_entry: {
      get() {
        return this.birthday;
      },
      set(value) {
        this.$store.commit('SET_BIRTHDAY', value);
      }
    },
    sex_entry: {
      get() {
        return this.sex;
      },
      set(value) {
        this.$store.commit('SET_SEX', value);
      }
    },
    free_time_1_entry: {
      get() {
        return this.free_time_1;
      },
      set(value) {
        this.$store.commit('SET_FREE_TIME_1', value);
      }
    },
    free_time_2_entry: {
      get() {
        return this.free_time_2;
      },
      set(value) {
        this.$store.commit('SET_FREE_TIME_2', value);
      }
    },
    price_entry: {
      get() {
        return this.price;
      },
      set(value) {
        this.$store.commit('SET_PRICE', value);
      }
    },
    motto_entry: {
      get() {
        return this.motto;
      },
      set(value) {
        this.$store.commit('SET_MOTTO', value);
      }
    },
    ...mapGetters([
      'name',
      'birthday',
      'sex',
      'free_time_1',
      'free_time_2',
      'role',
      'price',
      'motto'
    ]),
    referee_seen: function() {
      return this.role === 'referee';
    },
    team_seen: function() {
      return this.role === 'team';
    },
    people_seen: function() {
      return this.role !== 'team';
    }
  }
};
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

