
<template>
  <div>
    <el-button @click="handleClick">Click me!</el-button>
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
