interface IWaterMark {
  /**
   * 字体样式
   */
  textFont: string
  /**
   * 旋转角度
   */
  textRotate: number
  /**
   * 渲染元素列数
   */
  texts: string[]
  /**
   * 元素间行高
   */
  lineHeight: number
  /**
   * 字体颜色
   */
  textColor: string
  /**
   * 左右间距
   */
  offsetWidth: number
  /**
   * 间距
   */
  offsetHight: number
}

class WaterMark {
  el: any
  textFont: string
  textRotate: number
  texts: string[]
  ctx: any
  canvas: any
  lineHeight: number
  maxFontWidth: number
  textColor: string
  offsetWidth: number
  offsetHight: number
  constructor(el) {
    this.el = el
    this.textFont = 'bold 18px Microsoft YaHei'
    this.textRotate = -45
    this.lineHeight = 16
    this.maxFontWidth = 0
    this.textColor = 'red'
    this.offsetWidth = 80
    this.offsetHight = 30
  }
  init(params: Partial<IWaterMark>) {
    this.texts = params.texts
    this.textColor = params.textColor || this.textColor
    this.textFont = params.textFont || this.textFont
    this.offsetHight = params.offsetHight || this.offsetHight
    this.offsetWidth = params.offsetWidth || this.offsetWidth
    this.lineHeight = params.lineHeight || this.lineHeight
    this.textRotate = params.textRotate || this.textRotate
    this.createCanvas()
    this.measureText()
    this.drawImage()
  }
  createCanvas() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    this.canvas = canvas
    this.ctx = ctx
  }
  measureText() {
    let maxWidthArr = this.texts.map(item => {
      return this.ctx.measureText(item).width
    })
    this.maxFontWidth = Math.max(...maxWidthArr)
  }
  drawImage() {
    this.canvas.setAttribute('width', this.maxFontWidth * 2 + this.offsetWidth)
    this.canvas.setAttribute('height', this.maxFontWidth * 2 + this.offsetHight)
    this.canvas.style.display = 'none'
    const y = Math.sin(-this.textRotate) * this.maxFontWidth
    this.ctx.translate(0, this.maxFontWidth * 2 - y + this.lineHeight)
    this.ctx.rotate(-(Math.PI / 4))
    this.ctx.fillStyle = this.textColor
    this.ctx.font = this.textFont
    this.texts.forEach((item, i) => {
      this.ctx.fillText(item, i, (i + 1) * this.lineHeight)
    })
    const dataURL = this.canvas.toDataURL('image/png')
    this.el.style.backgroundImage = `url(${dataURL})`
    this.el.appendChild(this.canvas)
  }
}

const _Watermark = function ($el: HTMLElement, options: Partial<IWaterMark>) {
  $el && new WaterMark($el).init(options)
}

export default _Watermark
