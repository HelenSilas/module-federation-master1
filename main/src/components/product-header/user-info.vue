<template>
  <div class="user-info">
    <el-dropdown class="user-name">
      <span class="el-dropdown-link">
        <el-icon>
          <User />
        </el-icon>
        {{ userStore.userInfo.username }}
        <el-icon><CaretBottom /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { CaretBottom, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.setUserInfo({})
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.user-info {
  .el-dropdown-link {
    display: flex;
    align-items: center;
    font-size: 12px;

    & > i:first-child {
      margin-right: 8px;
    }

    & > i:last-child {
      margin-left: 4px;
    }
  }

  .user-name {
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
