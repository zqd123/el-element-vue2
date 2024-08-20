<template>
  <div>
    <el-button type="primary" @click="request">请求</el-button>
  </div>
</template>
<script setup>
import { LimitPromise } from "./multi";
function request() {
  let limitP = new LimitPromise(3);
  function sleep(sec) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("等待了" + sec + "秒");
        resolve();
      }, sec * 1000);
    });
  }

  limitP.call(sleep, 1); // 1秒后打印
  limitP.call(sleep, 2); // 2秒后打印
  limitP.call(sleep, 3); // 3秒后打印
  limitP.call(sleep, 4); // 5秒后打印 1 + 4
  limitP.call(sleep, 5); // 7秒后打印 2 + 5
  limitP.call(sleep, 6); // 9秒后打印 3 + 6
}
</script>
