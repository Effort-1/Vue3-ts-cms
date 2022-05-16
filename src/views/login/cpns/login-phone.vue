<template>
  <div class="login-phone">
    <el-form label-width="80px" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" placeholder="请输入手机号" clearable />
      </el-form-item>
      <el-form-item label="验证码" prop="password">
        <el-input
          v-model="phone.password"
          type="password"
          placeholder="请输入密码"
          clearable
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const phone = reactive({
      num: "",
      password: "",
    });
    return { phone };
  },
});
</script>

<style scoped lang="less"></style>
