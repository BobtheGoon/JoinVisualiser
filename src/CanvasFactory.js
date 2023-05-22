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
  canvas.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`)

  const getCanvas = () => canvas

  const drawPlate = (e1, e2, p1, p2, boltCount) => {
    let plateHeight = e1*2 + p1
    let plateWidth = e2*2 + p2*boltCount

    console.log(plateHeight)
    console.log(plateWidth)

    const plate = document.createElementNS(svgns, 'rect')
    plate.setAttribute('x', canvasWidth/2 - plateWidth/2)
    plate.setAttribute('y', canvasHeight/2 - plateHeight/2)
    plate.setAttribute('height', plateHeight)
    plate.setAttribute('width', plateWidth)
    plate.setAttribute('fill', '#dddddd')

    return {plate, plateHeight, plateWidth}
  }

  const drawProfile = (height, width, thickness) => {
    const profile = document.createElementNS(svgns, 'rect')
    profile.setAttribute('x', canvasWidth/2 - width/2)
    profile.setAttribute('y', canvasHeight/2 - height/2)
    profile.setAttribute('width', width)
    profile.setAttribute('height', height)
    profile.setAttribute('stroke', 'black')
    profile.setAttribute('fill', 'transparent')
    profile.setAttribute('stroke-width', thickness)

    return profile    
  }
  
  const drawBolts = (e1, e2, p1, p2, boltCount, boltSize, plateHeight, plateWidth) => {
    const bolt = document.createElementNS(svgns, 'circle')
    bolt.setAttribute('cx', canvasWidth/2 - plateWidth/2 + e2)
    bolt.setAttribute('cy', canvasHeight/2 - plateHeight/2 + e1)
    bolt.setAttribute('r', boltSize/2)
    bolt.setAttribute('fill', '#000000')
    
    return bolt
  }
  
  const drawConnection = (e1, e2, p1, p2, profileHeight, profileWidth, profileThickness, boltCount, boltSize) => {
    const {plate, plateHeight, plateWidth} = drawPlate(e1, e2, p1, p2, boltCount)
    canvas.appendChild(plate)
    
    const profile = drawProfile(profileHeight, profileWidth, profileThickness)
    canvas.appendChild(profile)
    
    const bolts = drawBolts(e1, e2, p1, p2, boltCount, boltSize, plateHeight, plateWidth)
    canvas.appendChild(bolts)
  }

  return {getCanvas, drawConnection}
}

export {CanvasFactory}