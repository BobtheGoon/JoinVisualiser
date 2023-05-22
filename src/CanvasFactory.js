const CanvasFactory = () => {
  //Size of drawing canvas
  const canvasHeight = 400
  const canvasWidth = 400

  //Create an svg canvas
  const svgns = 'http://www.w3.org/2000/svg'
  const canvas = document.createElementNS(svgns, 'svg')
  canvas.id = 'canvas'
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)
  canvas.setAttribute('viewBox', '0 0 400 400')

  const getCanvas = () => canvas

  //Draw profile to canvas
  const drawProfile = (width, height, thickness) => {
    const profile = document.createElementNS(svgns, 'rect')
    profile.setAttribute("x", "150")
    profile.setAttribute("y", "150")
    profile.setAttribute("width", width)
    profile.setAttribute("height", height)
    profile.setAttribute("fill", "#5cceee")

    canvas.appendChild(profile)
  }

  const drawBolts = (diam, count, e1, e2) => {
    const bolt = document.createElementNS(svgns, 'circle')
    bolt.setAttribute('cx', '175')
    bolt.setAttribute('cy', '175')
    bolt.setAttribute('r', diam/2)
    bolt.setAttribute('fill', '#735702')

    canvas.appendChild(bolt)
  }

  return {getCanvas, drawProfile, drawBolts}
}

export {CanvasFactory}