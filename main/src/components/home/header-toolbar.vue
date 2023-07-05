<template>
  <div class="global-header">
    <header-item>
      <user-info />
    </header-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderItem from '@/components/product-header/header-toolbar-item.vue'
import UserInfo from '@/components/product-header/user-info.vue'

export default defineComponent({
  components: {
    HeaderItem,
    UserInfo
  }
})
</script>

<style lang="scss">
.global-header {
  display: flex;
  align-items: center;
  height: 100%;

  .header-item {
    line-height: 1;
    font-size: 12px;

    &--inner {
      padding-left: 8px;
      padding-right: 30px;
    }
  }
}
</style>
