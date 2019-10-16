<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="name" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email" required>
        <el-input v-model="ruleForm.email"></el-input>
        <el-button size="mini" round @click="sendcode">发送验证码</el-button>
        <div class="codetip">{{statusMsg}}</div>
      </el-form-item>
      <el-form-item label="验证码" prop="code" required>
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd" required>
        <el-input type="password" v-model="ruleForm.pwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="cpwd" required>
        <el-input type="password" v-model="ruleForm.cpwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
      <div class="codetip">{{error}}</div>
    </el-form>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  layout: "login",
  data() {
    var validateCpwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      statusMsg: "",
      error: "",
      ruleForm: {
        name: "abc",
        code: "",
        email: "274458208@qq.com",
        pwd: "",
        cpwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [{ type: "email", message: "请输入email", trigger: "blur" }],
        code: [{ message: "请输入验证码", trigger: "blur" }],
        pwd: [{ message: "请输入密码", trigger: "blur" }],
        cpwd: [{ validator: validateCpwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    sendcode() {
      let self = this;
      let namePass, emailPass;
      if (self.timerId) {
        return false;
      }

      self.$refs["ruleForm"].validateField("name", valid => {
        namePass = valid;
      });
      self.$refs["ruleForm"].validateField("email", valid => {
        emailPass = valid;
      });
      let { name: username, email } = this.ruleForm;
      if (!namePass && !emailPass) {
        self.$axios
          .post("/user/verify", {
            username: encodeURIComponent(username),
            email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60;
              self.statusMsg = `验证码已发送,剩余${count--}秒`;
              self.timerId = setInterval(() => {
                self.statusMsg = `验证码已发送,剩余${count--}秒`;
                if (count === 0) {
                  clearInterval(self.timerId);
                  self.statusMsg = "";
                }
              }, 1000);
            } else {
              self.statusMsg = data.msg;
            }
          });
      }
      console.log("send code");
    },
    register() {
      let self = this;
      let { name: username, pwd: password, email, code } = this.ruleForm;
      this.$refs["ruleForm"].validate(function(valid, object) {
        if (valid) {
          self.$axios
            .post("/user/signup", {
              username: encodeURIComponent(username),
              password: CryptoJS.MD5(password).toString(),
              email,
              code
            }).then(({ status, data }) => {
              if(status===200){
                if(data && data.code==0){
                  console.log(data)
                  location.href = '/login';
                }else{
                  self.error = `服务器出错,错误码:${status}`
                }
                setTimeout(() => {
                  self.error = '';
                }, 1500);
              }
            });
        }
      });
    }
  }
};
</script>

