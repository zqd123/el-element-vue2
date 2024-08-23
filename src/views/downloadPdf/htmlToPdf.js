import JsPdf from "jspdf";
import html2canvas from "html2canvas";
export const getPdf = function (dom, fileName) {
  html2canvas(dom, {
    width: 980,
    height: 980 * 1.4142,
    background: "#fff",
    scale: 2.1,
    tainttest: true,
    logging: false,
    letterRendering: true,
    llowTaint: true,
  }).then(function (canvas) {
    var contentWidth = canvas.width;
    var contentHeight = canvas.height;
    // A4纸宽高
    var A4Width = 595.28;
    var A4Height = 841.89;
    // 一页pdf显示html页面生成的canvas高度
    var pageHeight = (contentWidth / A4Width) * A4Height;
    // 未生成pdf的html页面高度
    var leftHeight = contentHeight;
    // pdf页面偏移
    var position = 0;
    // pdf页面内边距
    var pdfPadding = 0;
    // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    var imgWidth = A4Width;
    var imgHeight = (A4Width / contentWidth) * contentHeight;
    var pageData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new JsPdf('', 'pt', 'a4');
    // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    // 当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, "JPEG", pdfPadding, 0, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        pdf.addImage(
          pageData,
          "JPEG",
          pdfPadding,
          position,
          imgWidth,
          imgHeight
        );
        leftHeight -= pageHeight;
        position -= A4Height;
        leftHeight > 0 && pdf.addPage();
      }
    }
    pdf.save(fileName + ".pdf");
  });
};
