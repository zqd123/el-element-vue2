<template>
  <div>
    <input type="file" webkitdirectory @change="handleFileSelect" />
    <VueSimpleUploader></VueSimpleUploader>
  </div>
</template>

<script setup>
import VueSimpleUploader from "./VueSimpleUploader";
function handleFileSelect(event) {
  // 处理选择的文件夹
  const files = event.target.files;
  console.log(files);
  const paths = [...files].map((f) => {
    return f.webkitRelativePath;
  });
  console.log("🚀 ~ handleFileSelect ~ paths:", paths);
}
// function traverseFiles(files, formData) {
//   for (let i = 0, len = files.length; i < len; i++) {
//     const file = files[i];

//     if (file.isDirectory()) {
//       traverseFiles(file, formData);
//     } else {
//       formData.append("files[]", file);
//     }
//   }
// }

// function handleFileSelect(event) {
//   const formData = new FormData();
//   const files = event.target.files;

//   traverseFiles(files, formData);

//   // 把 formData 对象上传到服务器
// }
</script>
