export const getCroppedImg = async (
  imageSrc: string,
  crop: any
): Promise<string> => {
  const image = new Image()
  image.src = imageSrc

  await new Promise(resolve => {
    image.onload = resolve
  })

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  const WIDTH = 460
  const HEIGHT = 320

  canvas.width = WIDTH
  canvas.height = HEIGHT

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    WIDTH,
    HEIGHT
  )

  return canvas.toDataURL('image/jpeg', 0.8) // сжатие
}