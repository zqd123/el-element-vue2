<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> ｜
      <router-link to="/bigTable">表格大数据</router-link> |
      <router-link to="/upDirectory">上传文件夹</router-link> |
      <router-link to="/zipFile">压缩文件</router-link> |
      <router-link to="/multiRequest">请求并发控制</router-link> |
      <router-link to="/backColor">背景动态条纹</router-link> |
      <router-link to="/downloadPdf">下载pdf</router-link> |
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
