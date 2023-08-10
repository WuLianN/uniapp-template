export interface BasicOptions {
  x?: number
  y?: number
  width?: number
  height?: number
  type: string
}

export interface ImageOptions extends BasicOptions {
  url: string
}

export interface TextOptions extends BasicOptions {
  content: string // 文本内容
  color?: string // 字体颜色
  fontSize?: number // 字体大小
  textAlign?: 'left' | 'center' | 'right' // 文字对齐
  textDecoration?: 'none' | 'underline' | 'line-through' // 装饰线
  isWrap?: boolean // 换行
  maxLineNum?: number // 最多行数
  lineHeight?: number // 行高
}

export interface TextLineOptions {
  x: number
  y: number
  textDecoration?: 'none' | 'underline' | 'line-through'
  color: string
  fontSize: number
  content: string
}

export interface RectOptions {
  x: number
  y: number
  width: number
  height: number
  background: string
  radius?: number
}

// export type PosterOptions = ImageOptions | TextOptions | RectOptions
export type PosterOptions = any
