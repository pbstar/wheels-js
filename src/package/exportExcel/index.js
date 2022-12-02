function toExcel(FileName, ShowLabel, JSONData, classObj) {
  //先转化json
  let classTypeText = ''
  if (classObj.jobCode == 1) {
    classTypeText = 'GYB'
  } else if (classObj.jobCode == 2) {
    classTypeText = 'SYB'
  }
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  var excel = '<table>';
  //设置表头
  var row = "<tr align='center'><th colspan='4'>" + classTypeText + "创业培训结业评分册</th>";//设置Excel的左居中
  //换行
  excel += row + "</tr>";
  row = "<tr align='center'><td colspan='4'>模块: " + classTypeText + " 班次：" + classObj.trainingShift + " 起止时间：" + classObj.startStudyDate.slice(0, 10) + "至" + classObj.endStudyDate.slice(0, 10) + "</td>";//设置Excel的左居中
  //换行
  excel += row + "</tr>";
  row = "<tr align='left'>";//设置Excel的左居中
  for (var i = 0, l = ShowLabel.length; i < l; i++) {
    for (var key in ShowLabel[i]) {
      row += "<td>" + ShowLabel[i][key] + '</td>';
    }
  }
  //换行
  excel += row + "</tr>";
  //设置数据
  for (var i = 0; i < arrData.length; i++) {
    var rowData = "<tr align='left'>";
    for (var y = 0; y < ShowLabel.length; y++) {
      for (var k in ShowLabel[y]) {
        if (ShowLabel[y].hasOwnProperty(k)) {
          rowData += "<td style='vnd.ms-excel.numberformat:@'>" + (arrData[i][k] === null ? "" : arrData[i][k]) + "</td>";
        }
      }
    }
    excel += rowData + "</tr>";
  }
  excel += "</table>";
  var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
  excelFile += '; charset=UTF-8">';
  excelFile += "<head>";
  excelFile += "<!--[if gte mso 9]>";
  excelFile += "<xml>";
  excelFile += "<x:ExcelWorkbook>";
  excelFile += "<x:ExcelWorksheets>";
  excelFile += "<x:ExcelWorksheet>";
  excelFile += "<x:Name>";
  excelFile += FileName;
  excelFile += "</x:Name>";
  excelFile += "<x:WorksheetOptions>";
  excelFile += "<x:DisplayGridlines/>";
  excelFile += "</x:WorksheetOptions>";
  excelFile += "</x:ExcelWorksheet>";
  excelFile += "</x:ExcelWorksheets>";
  excelFile += "</x:ExcelWorkbook>";
  excelFile += "</xml>";
  excelFile += "<![endif]-->";
  excelFile += "</head>";
  excelFile += "<body>";
  excelFile += excel;
  excelFile += "</body>";
  excelFile += "</html>";
  var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
  var link = document.createElement("a");
  link.href = uri;
  link.style = "visibility:hidden";
  link.download = FileName + '评分册' + ".xls";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
let obj = {
  toExcel
}
if (typeof window !== 'undefined') window.wjsExportExcel = obj
export default obj