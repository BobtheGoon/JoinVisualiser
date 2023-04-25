const CanvasFactory = () => {
  const canvasHeight = 400
  const canvasWidth = 800

  const canvas = document.createElement('div')
  canvas.id = 'canvas'
  canvas.style.width = canvasWidth.toString() + 'px'
  canvas.style.height = canvasHeight.toString() + 'px'
  canvas.style.backgroundColor = 'beige'

  const getCanvas = () => canvas

  const drawProfile = (width, height, thickness) => {
    const normalisedWidth = width / canvasWidth * 100
    const normalisedHeight = height / canvasHeight * 100

    const profile = document.createElement('div')
    profile.style.width = normalisedWidth.toString() + 'px'
    profile.style.height = normalisedHeight.toString() + 'px'
    profile.style.border = 'solid black ' + thickness.toString() + 'px'
    profile.style.position = 'relative'
    profile.style.top = (canvasHeight/2).toString() + 'px'
    profile.style.right = (-canvasWidth/2).toString() + 'px'

    canvas.append(profile)
  }

  const drawCanvas = () => {

  }

  return {getCanvas, drawProfile}
}

export {CanvasFactory}