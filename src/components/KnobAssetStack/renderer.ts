import { TrackBehaviour } from './types'

async function loadSvgImage(svg?: string): Promise<HTMLImageElement | null> {
  if (!svg)
    return Promise.resolve(null)

  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = `data:image/svg+xml;base64,${window.btoa(svg)}`
    image.onload = () => {
      resolve(image)
    }
    image.onerror = (event) => {
      reject(event.toString())
    }
  })
}

export interface KnobAssetStackCanvasRendererOptions {
  backgroundSvg?: string
  trackSvg?: string
  handleSvg?: string
  minDegrees: number
  maxDegrees: number
  trackMode: TrackBehaviour
}

export class KnobAssetStackCanvasRenderer {
  private context: CanvasRenderingContext2D

  private readonly minRad: number
  private readonly maxRad: number

  private constructor(
    private readonly canvas: HTMLCanvasElement,
    minDegrees: number,
    maxDegrees: number,
    private readonly trackMode: TrackBehaviour,
    private readonly backgroundImage: CanvasImageSource | null,
    private readonly trackImage: CanvasImageSource | null,
    private readonly handleImage: CanvasImageSource | null,
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx)
      throw new Error('Canvas context not supported')

    this.context = ctx

    // We always start in bottom left corner (canvas starts on the positive x axis)
    this.minRad = (minDegrees - 90) * Math.PI / 180

    // And end in lower right corner (canvas starts on the positive x axis)
    this.maxRad = (maxDegrees - 90) * Math.PI / 180
  }

  static async create(
    canvas: HTMLCanvasElement,
    options: KnobAssetStackCanvasRendererOptions,
  ) {
    const [background, track, handle] = await Promise.all([
      loadSvgImage(options.backgroundSvg),
      loadSvgImage(options.trackSvg),
      loadSvgImage(options.handleSvg),
    ])
    return new KnobAssetStackCanvasRenderer(
      canvas,
      options.minDegrees,
      options.maxDegrees,
      options.trackMode,
      background,
      track,
      handle,
    )
  }

  destroy() {
  }

  update(percentage: number) {
    requestAnimationFrame(() => this.draw(percentage))
  }

  draw(percentage: number) {
    // The total range of rads between start and stop
    const range = this.maxRad - this.minRad

    // The current number of rads from start
    const delta = range * (50 - percentage) / 100

    this.context.setTransform(1, 0, 0, 1, 0, 0)
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2)

    if (this.backgroundImage)
      this.context.drawImage(this.backgroundImage, -this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height)

    if (this.trackImage) {
      this.context.save()
      this.context.beginPath()

      if (this.trackMode === TrackBehaviour.Clip) {
        this.context.arc(
          0,
          0,
          this.canvas.height * 2,
          -delta - Math.PI / 2,
          this.maxRad,
          false,
        )
      }
      else {
        this.context.arc(
          0,
          0,
          this.canvas.height * 2,
          this.minRad,
          -delta - Math.PI / 2,
          false,
        )
      }

      this.context.lineTo(0, 0)
      this.context.clip()
      this.context.drawImage(this.trackImage, -this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height)
      this.context.restore()
    }

    if (this.handleImage) {
      this.context.rotate(-delta)
      this.context.drawImage(this.handleImage, -this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height)
      this.context.rotate(delta)
    }
  }
}
