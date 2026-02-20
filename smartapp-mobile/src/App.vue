<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { isLoggedIn, currentPage, setCurrentPage, setLoggedIn } from "@/utils/store";
import LoginPage from "@/pages/login/index.vue";
import IndexPage from "@/pages/index/index.vue";
import WorkspacePage from "@/pages/workspace/index.vue";
import MessagePage from "@/pages/message/index.vue";
import ProfilePage from "@/pages/profile/index.vue";

// 当前显示的页面组件
const currentComponent = ref(LoginPage);

// 页面映射
const pageMap: Record<string, any> = {
  login: LoginPage,
  index: IndexPage,
  workspace: WorkspacePage,
  message: MessagePage,
  profile: ProfilePage
};

// 监听页面变化
const watchPageChange = () => {
  currentComponent.value = pageMap[currentPage.value] || LoginPage;
};

onLaunch(() => {
  console.log("App Launch");
  // 检查登录状态
  const token = uni.getStorageSync('token');
  if (token) {
    setLoggedIn(true);
    setCurrentPage('index');
    watchPageChange();
  } else {
    setLoggedIn(false);
    setCurrentPage('login');
    watchPageChange();
  }
});

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});

// 提供页面切换方法
provide('changePage', (page: string) => {
  console.log('接收到页面切换事件，目标页面:', page);
  setCurrentPage(page);
  console.log('当前页面已设置为:', currentPage.value);
  watchPageChange();
  console.log('页面组件已切换为:', currentPage.value);
});
</script>

<template>
  <component :is="currentComponent" />
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
}
</style>
