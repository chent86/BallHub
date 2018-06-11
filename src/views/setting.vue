<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Username">
        <el-input v-bind:value="username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Age" v-if="age_seen">
        <el-input type="text" v-model="age_entry"></el-input>
      </el-form-item>
      <el-form-item label="Sex" v-if="sex_seen">
        <el-radio-group v-model="sex_entry" >
          <el-radio label="male"></el-radio>
          <el-radio label="female"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Price" v-if="price_seen" prop="price_entry">
        <el-input v-model="price_entry"></el-input>
      </el-form-item>
      <el-form-item label="Team name" v-if="team_name_seen" prop="team_name">
        <el-input v-model="team_name_entry"></el-input>
      </el-form-item>            
      <el-form-item label="Free Time">
        <el-select v-model="free_time_entry" placeholder="please select your zone">
          <el-option label="Monday" value="Mon"></el-option>
          <el-option label="Tuesday" value="Tue"></el-option>
          <el-option label="Wednesday" value="Wed"></el-option>
          <el-option label="Thursday" value="Thu"></el-option>
          <el-option label="Friday" value="Fri"></el-option>
          <el-option label="Saturday" value="Sat"></el-option>
          <el-option label="Sunday" value="Sun"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Update</el-button>
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
      if (this.role !== 'team' && validate(this.age) === 'not a number') {
        this.$message.error('Age should be number!');
      } if (this.role === 'referee' && validate(this.price) === 'not a number') {
        this.$message.error('Price should be number!');
      } else {
        this.$store.dispatch('UpdateLoginInfo', {
          'age': this.age,
          'sex': this.sex,
          'free_time': this.free_time,
          'price': this.price,
          'team_name': this.team_name
        }).then(() => {
          this.loading = false;
          this.$message.success('Update!');
        }).catch(() => {
          this.loading = false;
          this.$message.error('Update error!');
        });
      }
    }
  },
  computed: {
    age_entry: {
      get() {
        return this.age;
      },
      set(value) {
        this.$store.commit('SET_AGE', value);
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
    free_time_entry: {
      get() {
        return this.free_time;
      },
      set(value) {
        this.$store.commit('SET_FREE_TIME', value);
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
    team_name_entry: {
      get() {
        return this.team_name;
      },
      set(value) {
        this.$store.commit('SET_TEAM_NAME', value);
      }
    },
    ...mapGetters([
      'username',
      'age',
      'sex',
      'free_time',
      'role',
      'price',
      'team_name'
    ]),
    team_name_seen: function() {
      return this.role === 'team';
    },
    price_seen: function() {
      return this.role === 'referee';
    },
    age_seen: function() {
      return this.role !== 'team';
    },
    sex_seen: function() {
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

