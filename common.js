var ws = null,
  wo = null
var scan = null
// H5 plus事件处理
function plusReady() {
  // 获取窗口对象
  ws = plus.webview.currentWebview()
  wo = ws.opener()
  // 开始扫描
  ws.addEventListener(
    'show',
    function () {
      scan = new plus.barcode.Barcode('bcid')
      scan.onmarked = onmarked
      scan.start({})
      createSubview()
    },
    false
  )

  // 显示页面并关闭等待框
  ws.show('pop-in')
}
document.addEventListener('plusready', plusReady, false)

// 二维码扫描成功

function onmarked(type, result) {
  switch (type) {
    case plus.barcode.QR:
      type = 'QR'
      break
    case plus.barcode.EAN13:
      type = 'EAN13'
      break
    case plus.barcode.EAN8:
      type = 'EAN8'
      break
    default:
      type = '其它' + type
      break
  }
  result = result.replace(/\r\n/g, '')
  wo.evalJS("scaned('" + type + "','" + result + "')")// 里面的方法自己创建自己需要的功能
  back()
}

// 创建子窗口
function createSubview() {
  //
}
// 开关闪光灯
var bFlash = false
var AVCaptureDevice = null
var Camera = null

function switchFlash() {
  bFlash = !bFlash
  scan.setFlash(bFlash)
  ws.setStyle({
    titleNView: {
      buttons: [
        {
          fontSrc: '_www/helloh5.ttf',
          text: bFlash ? '\ue400' : '\ue401',
          fontSize: '18px',
          onclick: 'javascript:switchFlash()',
        },
      ],
    },
  })
}
