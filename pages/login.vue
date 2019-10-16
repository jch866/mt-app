<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="name" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pwd" required>
        <el-input type="password" v-model="ruleForm.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginHandle">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  layout: "login",
  data() {
     
    return {
      ruleForm:{
        name:'', pwd:'' 
      },
      rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pwd: [
            {  message: '请输入密码', trigger: 'blur' }
          ]
        }
    };
  },
  methods:{
    loginHandle(){
      let self = this;
      this.$refs['ruleForm'].validate((valid,obj)=>{
        if(valid){
          self.postData();
        }
      })
    },
    postData(){
      let self = this;
      let {name:username,pwd:password} = this.ruleForm;
      self.$axios.post('/user/signin',{
        username:window.decodeURIComponent(username),
        password:CryptoJS.MD5(password).toString()
      }).then(({status,code})=>{

      })
    }
  }
};
</script>

