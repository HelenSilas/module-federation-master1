
<template>
  <div>
    <el-button @click="handleClick">我是exposes的按钮</el-button>
  </div>
</template>

<script>
import { ElButton } from 'element-plus';

export default {
  components: {
    ElButton,
  },
  methods: {
    handleClick() {
      this.$router.push('/about');
      // 处理点击事件的逻辑
    },
  },
};
</script>
