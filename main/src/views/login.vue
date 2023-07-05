<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      :model="accountInfo"
      class="account-info"
      :rules="rules"
    >
      <h1>账号登录</h1>
      <el-form-item prop="username">
        <el-input v-model="accountInfo.username" placeholder="请输入账号">
          <template #prefix>
            <img src="@/assets/images/login/account.png" alt="" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="accountInfo.password" placeholder="请输入密码">
          <template #prefix>
            <img src="@/assets/images/login/password.png" alt="" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" @click="submit(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import request from '@/request'
import { useUserStore } from '@/store/user'

type loginAPIType = {
  username?: string;
  password?: string;
};

const router = useRouter()
const userStore = useUserStore()
// 登录API
const useLoginAPI = () => {
  // 登录信息
  const accountInfo = ref<loginAPIType>({
    username: '',
    password: ''
  })

  // 表单实例
  const ruleFormRef = ref<FormInstance>()
  // 表单规则验证
  const rules = reactive<FormRules>({
    username: [{ required: true, message: '请输入账号', trigger: 'change' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }]
  })

  // 登录提交
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        // const params = accountInfo.value
        // const res = await request.postForm('/user/login', params)
        // userStore.setUserInfo(res)
        // router.push('/assets')
      }
    })
  }

  return { accountInfo, ruleFormRef, rules, submit }
}
const { accountInfo, ruleFormRef, rules, submit } = useLoginAPI()
</script>

<style lang="scss" scoped>
@use "sass:math";
$designWidth: 1920;
$designHeight: 1080;

@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}

@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}

@function font($px) {
  @return math.div($px, $designWidth) * 100vw;
}

.login {
  width: vw(1920);
  height: vh(1080);
  background: url(@/assets/images/login/bg.jpg);
  background-size: 100% 100%;
  position: relative;

  // .logo {
  //   position: absolute;
  //   left: vw(40);
  //   top: vh(34);
  //   font-size: 0;

  //   img {
  //     width: vw(122);
  //   }
  // }

  .s-name {
    position: absolute;
    left: vw(442);
    top: vh(376);
    font-size: 0;

    img {
      width: vw(414);
    }
  }

  .o-name {
    position: absolute;
    left: vw(468);
    top: vh(472);
    width: vw(468);
    height: vh(48);
    font-size: font(18);
    color: #fff;
    padding-left: vw(18);
    display: flex;
    align-items: center;
    background: linear-gradient(
      90deg,
      rgba(32, 125, 238, 1) 0%,
      rgba(32, 125, 238, 0) 100%
    );
  }

  .account-info {
    position: absolute;
    right: vw(500);
    top: vh(304);
    padding: vh(30) vw(30);
    background: #fff;
    text-align: center;
    font-size: font(14);
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      color: #333333;
      padding-bottom: vh(30);
      font-size: font(18);
      line-height: 1;
      margin: 0;
    }

    :deep(.el-form-item) {
      margin-bottom: vh(20);
      width: 100%;

      .el-input__wrapper {
        height: vh(60);
        width: vw(320);
        padding: 0 vw(9);
      }

      &.captcha {
        .el-form-item__content {
          display: flex;
          flex-wrap: nowrap;

          .el-button {
            margin-left: vw(10);
            min-width: vw(90);
            height: vh(40);
            padding: 0;
          }
        }
      }

      &.submit {
        .el-form-item__content {
          display: flex;

          .el-button {
            flex: 1;
            background: linear-gradient(90deg, #34a0ff 0%, #207cee 100%);
            box-shadow: 0 6px 18px 0 rgba(41, 154, 246, 0.22);
            height: vh(60);
          }
        }
      }
    }

    .intranet {
      margin-bottom: vh(28);
      font-size: font(16);
      line-height: 1;
    }

    .contact {
      font-size: font(12);
      line-height: 1;
    }
  }

  .footer {
    width: 100%;
    font-size: font(16);
    color: #5979a6;
    margin: 0;
    line-height: 1;
    position: absolute;
    bottom: vh(66);
    text-align: center;
  }
}
</style>
