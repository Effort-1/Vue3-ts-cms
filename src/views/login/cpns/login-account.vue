<template>
  <div class="login-account">
    <el-form label-width="80px" :model="account" :rules="rules" ref="formRef">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="account.name" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          placeholder="请输入密码"
          clearable
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { rules } from "../config/account-rule-config";
import type { FormInstance } from "element-plus";
import localCache from "@/utils/cache";

export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      name: localCache.getCache("name") ?? "",
      password: localCache.getCache("password") ?? "",
    });
    const formRef = ref<FormInstance>();

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 表单验证通过
          // 判断是否记住密码
          // 设置缓存
          if (isKeepPassword) {
            // 记住密码,设置缓存
            localCache.setCache("name", account.name);
            localCache.setCache("password", account.password);
          } else {
            // 不记住密码就删除缓存
            localCache.deleteCache("name");
            localCache.deleteCache("password");
          }

          // 开始进行登录验证\
          store.dispatch("login/accountLoginAction", { ...account });
        }
      });
    };
    return { account, rules, formRef, loginAction };
  },
});
</script>

<style scoped lang="less"></style>
