<template>
  <div class="body" v-loading="loading"
    element-loading-text="登录中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="kuang">
      <p class="biaoti">千禧蛋后台管理系统</p>
      <div class="loginkuang">
        <div class="ff">
          <p></p>
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item prop="email">
          <el-input
            type="text"
            placeholder="邮箱"
            v-model="loginForm.email"
            
          ></el-input>
          </el-form-item>
          <p></p>
          <el-form-item prop="pwd">
          <el-input
            type="password"
            placeholder="密码"
            v-model="loginForm.pwd"
          ></el-input>
          </el-form-item>
          </el-form>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../api/getData";
export default {
  data() {
    return {
      loginForm: {
        email: "",
        pwd: "",
      },
      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loading:false
    };
  },
  methods: {
    submitForm() {
      this.loading=true
      login(this.loginForm).then((res) => {
        if (res.data.code == "21") {
          this.loading=false
          this.$router.push({ path: "/main/home" });
          this.$message({
            message: "登录成功！",
            type: "success",
          });
          return;
        }
        this.loading=false
        this.$message.error("登录失败，请检查账号或密码是否正确");
      });
    },
  },
};
</script>

<style scoped>
.body {
  margin: 0px;
  background-color: rgb(30, 36, 87);
  height: 700px;
}
.ff {
  width: 50%;
  margin: auto;
  padding-top: 30px;
}
.ff button {
  width: 100%;
  margin-top: 20px;
}
.loginkuang {
  width: 600px;
  height: 300px;
  background-color: rgba(234, 247, 247, 0.418);
  border-radius: 20px;
  margin: auto;
}
.biaoti {
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-top: 120px;
}
.kuang {
  width: 1000px;
  overflow: hidden;
  margin: auto;
}
</style>