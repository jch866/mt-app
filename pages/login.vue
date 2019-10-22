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
      <el-form-item>
        <div>{{statusmsg}}</div>
      </el-form-item>
    </el-form>
    <el-dialog title='提示'  :visible.sync="showdialog">
        <nuxt-link to='/'>注册成功,前往首页</nuxt-link>
     </el-dialog>
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
      showdialog:false,
      statusmsg:'',
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
      this.statusmsg = '';
      self.$axios.post('/user/login',{
        username:window.decodeURIComponent(username),
        password:CryptoJS.MD5(password).toString()
      }).then(({status,data})=>{
        if(status===200){
          if(data&& data.code ==0){
            self.showdialog = true;
          }
        }else{
          this.statusmsg = data.msg
        }
      })
    }
  }
};
</script>

