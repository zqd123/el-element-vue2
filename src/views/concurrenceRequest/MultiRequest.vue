<template>
  <div>
    <el-button type="primary" @click="request">请求(class)</el-button>
    <el-button type="primary" @click="requestHook">请求(hook)</el-button>
  </div>
</template>
<script setup>
import { LimitPromise } from "./limitClass";
import {useLimitRequest} from './limitRequest'
const {call} = useLimitRequest()
function sleep(sec) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("sleep" + sec + "秒");
        resolve();
      }, sec * 1000);
    });
  }
function requestHook() {
  call(sleep, 1); // 1秒后打印
  call(sleep, 2); // 2秒后打印
  call(sleep, 3); // 3秒后打印
  call(sleep, 4); // 5秒后打印 1 + 4
  call(sleep, 5); // 7秒后打印 2 + 5
  call(sleep, 6); // 9秒后打印 3 + 6
}
function request() {
  let limitP = new LimitPromise(3);
  limitP.call(sleep, 1); // 1秒后打印
  limitP.call(sleep, 2); // 2秒后打印
  limitP.call(sleep, 3); // 3秒后打印
  limitP.call(sleep, 4); // 5秒后打印 1 + 4
  limitP.call(sleep, 5); // 7秒后打印 2 + 5
  limitP.call(sleep, 6); // 9秒后打印 3 + 6
}
</script>