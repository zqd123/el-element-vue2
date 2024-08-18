<template>
  <div>
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>
<script setup>
import { nextTick, onMounted, ref } from "vue";

const uploadRef = ref(null);
function getFileFromEntryRecursively(entry) {
  if (entry.isFile) {
    entry.file(
      (file) => {
        console.log(file);
        let path = entry.fullPath.substring(1);
        console.log(path);
      },
      (e) => {
        console.log(e);
      }
    );
  } else {
    let reader = entry.createReader();
    reader.readEntries(
      (entries) => {
        entries.forEach((entry) => getFileFromEntryRecursively(entry));
      },
      (e) => {
        console.log(e);
      }
    );
  }
}
onMounted(() => {
  uploadRef.value.$children[0].$refs.input.webkitdirectory = true;
  nextTick(() => {
    document
      .querySelector(".el-upload-dragger")
      .addEventListener("drop", function (e) {
        let items = e.dataTransfer.items;
        // console.log("item",items);
        for (let i = 0; i <= items.length - 1; i++) {
          let item = items[i];
          console.log("item", item.webkitGetAsEntry());
          if (item.kind === "file") {
            let entry = item.webkitGetAsEntry();
            getFileFromEntryRecursively(entry);
          }
        }
        e.preventDefault();
      });
  });
});

</script>
