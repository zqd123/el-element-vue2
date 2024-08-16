<template>
    <div>
        <input type="file" webkitdirectory @change="handleFileUpload" />
    </div>
</template>
<script setup>
import JSZip from 'jszip';
// import { saveAs } from 'file-saver';
async function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onloadend = () => {
      reject('FileReader failed')
    }
  })
}
async function zipFile(
  fileList,
  onProgress,
) {
  const zip = new JSZip()
  let i = 0
  for await (let f of fileList) {
    const fileData = await readAsArrayBuffer(f)
    zip.file(f.webkitRelativePath, fileData, { createFolders: true })
    i++
    onProgress && onProgress(i)
  }
  return zip.generateAsync({ type: 'blob' })
}

  async function handleFileUpload(event) {
    const files = event.target.files;
    console.log("🚀 ~ handleFileUpload ~ files:", files)
    if (files) {
    //   unzipAndReadFiles(file);
      let zipData = await zipFile(files, (added) => {console.log(added);
      })
    //   saveAs(zipData, 'example.zip');
console.log("🚀 ~ zipData:", zipData)
    }
  }
</script>