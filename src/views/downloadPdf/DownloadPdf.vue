<template>
  <div>
    <div class="all-page" style="width: max-content">
      <div class="protocol-page">
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
      </div>
      <div class="protocol-page">
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
      </div>
      <div class="protocol-page">
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
      </div>
      <div class="protocol-page">
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
        <div>page-1</div>
      </div>
      <div class="protocol-page">page-2</div>
      <div class="protocol-page">page-3</div>
      <div class="protocol-page">page-4</div>
      <div class="protocol-page">page-5</div>
    </div>
    <el-button type="primary" @click="downloadPdf">下载pdf</el-button>
    <el-button type="primary" @click="downloadPdf2">下载pdf2</el-button>
  </div>
</template>
<script setup>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
import { getPdf} from './htmlToPdf'
/**
 * 创建canvas
 */
function createCanvas() {
  return new Promise((resolve) => {
    const ops = {
      allowTaint: true, // 允许跨域图像污染画布
      useCORS: true, // 允许图片跨域，因为图片会再次向服务器请求
      taintTest: false,
      scale: "2", // 渲染比例，调整清晰度
      dpi: "192", // 像素点
      background: "#fff",
    };
    let count = 0;
    const pageDataArr = [];
    const domArr = document.querySelectorAll(".protocol-page");
    for (let index in Array.from(domArr)) {
      html2Canvas(domArr[index], ops).then(function (canvas) {
        let pageData = canvas.toDataURL("image/jpeg", 1.0);
        pageDataArr[index] = pageData;
        if (++count == domArr.length) {
          resolve(pageDataArr);
        }
      });
    }
  });
}
/**
 * 下载pdf
 */
async function downloadPdf() {
  const pageDataArr = await createCanvas();
  let count = 0;
  const pdf = new JsPDF();
  for (let pageData of pageDataArr) {
    // 以A4纸大小添加图片，即转换一页
    pdf.addImage(pageData, "JPEG", 0, 0);
    if (++count === pageDataArr.length) {
      // 转换完毕，save保存名称后浏览器会自动下载
      pdf.save("test" + ".pdf");
    } else {
      // 未转换到最后一页时，pdf增加一页
      pdf.addPage();
    }
  }
}

function downloadPdf2() {
  const dom = document.querySelectorAll(".all-page")[0];
  getPdf(dom,'tt')
}
</script>
